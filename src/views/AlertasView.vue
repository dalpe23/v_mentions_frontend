<script>
import { useDataStore } from '@/stores/store'
import { mapActions, mapState } from 'pinia'
export default {
  name: 'AlertasView',

  computed: {
    ...mapState(useDataStore, ['alertas', 'getAlertaNombreById']),
  },

  methods: {
    ...mapActions(useDataStore, [
      'fetchAlertas',
      'marcarAlertaComoResuelta',
      'marcarAlertaComoNoResuelta',
      'cambiarEstadoAlerta',
      'deleteAlerta',
      'anadirMensaje',
    ]),
    async eliminar(id) {
      if (
        confirm(
          '¿Estás seguro de que quieres eliminar la alerta "' +
            this.getAlertaNombreById(id) +
            '" ?',
        )
      ) {
        await this.deleteAlerta(id)
        this.anadirMensaje('Alerta eliminada correctamente')
      }
      return
    },
    async marcarResuelta(id) {
      await this.cambiarEstadoAlerta(id, true)
      this.anadirMensaje(
        'Alerta "' + this.getAlertaNombreById(id) + '" marcada como resuelta',
        'success',
      )
    },
    async marcarNoResuelta(id) {
      await this.cambiarEstadoAlerta(id, false)
      this.anadirMensaje(
        'Alerta "' + this.getAlertaNombreById(id) + '" marcada como no resuelta',
        'success',
      )
    },
  },

  async mounted() {
    await this.fetchAlertas()
  },
}
</script>

<template>
  <div class="alertas-container">
    <main class="alertas-content">
      <h2>Mis Alertas</h2>
      <ul v-if="alertas.length > 0">
        <li v-for="alerta in alertas" :key="alerta.id" class="alerta-item">
          <div v-if="alerta.nombre"></div>
          <div class="alerta-info">
            <h3>{{ alerta.titulo }}</h3>
            <strong>Keywords: "</strong> {{ alerta.nombre }}"
            <br />
            <strong>Idioma: </strong>"{{ alerta.idioma }}"
            <p class="letrasAlerta" style="font-size: 15px">
              <strong>Resuelta:</strong>
              <span
                :style="{ color: alerta.resuelta === '1' ? 'green' : 'red', fontWeight: 'bold' }"
                >{{ alerta.resuelta === '1' ? 'Sí' : 'No' }}</span
              >
            </p>
          </div>
          <div class="alerta-buttons">
            <button
              v-if="alerta.resuelta == '1'"
              class="btn-view btn-unresolve"
              @click="marcarNoResuelta(alerta.id)"
            >
              <i class="bi bi-x-circle"></i> Marcar como no resuelta
            </button>
            <button v-else class="btn-view" @click="marcarResuelta(alerta.id)">
              <i class="bi bi-check2-circle"></i> Marcar como resuelta
            </button>
            <button
              class="btn-edit"
              @click="$router.push({ name: 'ModificarAlerta', params: { id: alerta.id } })"
            >
              <i class="bi bi-pencil"></i> Editar Alerta
            </button>
            <button class="btn-remove" @click="eliminar(alerta.id)">
              <i class="bi bi-trash"></i> Borrar Alerta
            </button>
          </div>
        </li>
      </ul>
      <h3 v-else style="color: red; text-align: center; font-size: 20px">
        No tienes alertas activas
      </h3>
      <div v-else>
        <p v-if="!alertas.length" style="text-align: center; font-size: 20px">
          Cargando alertas...
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
html,
body,
#app {
  margin: 0;
  padding: 0;
}

.alertas-container {
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
  min-height: 90vh;
}

.alertas-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 8000px;
}

.alertas-content h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 3rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.alerta-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #f9f9f9;
  margin-bottom: 1rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.alerta-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.alerta-info p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.alerta-buttons {
  margin-top: 1rem;
  font-size: 20px;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 600;
}

.btn-remove {
  background-color: #f44336;
  font-size: 20px;
  color: white;
}

.btn-remove:hover {
  background-color: #d32f2f;
}

.btn-view {
  background-color: #007bff;
  font-size: 20px;
  color: white;
}

.btn-view:hover {
  background-color: #0056b3;
}

.btn-unresolve {
  background-color: #ffc107;
  color: #000;
}

.btn-unresolve:hover {
  background-color: #e0a800;
}

.btn-edit {
  background-color: #28a745;
  color: white;
  font-size: 20px;
}

.btn-edit:hover {
  background-color: #218838;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.letrasAlerta {
  font-size: 3rem;
  color: #555;
}

@media (max-width: 1024px) {
  .alertas-content {
    border-right: 2rem;
  }

  .alertas-content h2 {
    font-size: 2rem;
  }

  .alerta-info h3 {
    font-size: 1rem;
  }

  .alerta-info p {
    font-size: 0.9rem;
  }

  .alerta-buttons {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  .btn-view,
  .btn-remove {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
  }

  .letrasAlerta {
    font-size: 1.4rem;
  }
}
</style>
