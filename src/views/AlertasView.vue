<script>
import { useDataStore } from '@/stores/store';
import { mapActions, mapState } from 'pinia';
export default {
  name: "AlertasView",

  computed: {
    ...mapState(useDataStore, ["alertas", "getAlertaNombreById"]),
  },

  methods: {
    ...mapActions(useDataStore, ["fetchAlertas", "marcarAlertaComoResuelta", "deleteAlerta"]),
    async eliminar(id) {
      await this.deleteAlerta(id);
      alert('Alerta "'+ this.getAlertaNombreById(id) + '" eliminada');
    },
    async marcarResuelta(id) {
      await this.marcarAlertaComoResuelta(id);
      alert('Alerta "'+ this.getAlertaNombreById(id) + '" marcada como resuelta');
    },
  },

  async mounted() {
    //await this.fetchAlertas();
  },
};
</script>

<template>
  <div class="alertas-container">
    <main class="alertas-content">
      <h2>Alertas</h2>
      <ul v-if="alertas.length > 0">
        <li v-for="alerta in alertas" :key="alerta.id" class="alerta-item">
          <div class="alerta-info">
            <h3>{{ alerta.nombre }}</h3>
            <p class="letrasAlerta" style="font-size: 15px;"><strong>Resuelta:</strong> <span :style="{ color: alerta.resuelta ? 'green' : 'red', fontWeight: 'bold' }">{{ alerta.resuelta ? 'Sí' : 'No' }}</span></p>
          </div>
          <div class="alerta-buttons">
            <button :disabled="alerta.resuelta" class="btn-view" @click="marcarResuelta(alerta.id)">Marcar como resuelta</button>
            <button class="btn-remove" @click="eliminar(alerta.id)">Borrar Alerta</button>
          </div>
        </li>
      </ul>
      <p v-else><h3 style="color: red; text-align: center;">No tienes alertas activas</h3></p>
    </main>
  </div>
</template>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
}

.alertas-container {
  display: flex;
  width: 80vw;
  box-sizing: border-box;
  background-color: #f5f5f5;
  min-height: 90vh;
}

.app-container {
  display: flex;
  width: 85vw;
  height: 100vh;
  overflow-x: hidden;
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
  transition: transform 0.2s, box-shadow 0.2s;
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
}

.btn-remove {
  background-color: #c20000;
  color: white;
}

.btn-remove:hover {
  background-color: #9b0000;
}

.btn-view {
  background-color: #007bff;
  color: white;
}

.btn-view:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #cccccc; /* Color más tenue */
  cursor: not-allowed; /* Cursor indicando que no es clicable */
  opacity: 0.6; /* Hacerlo más translúcido */
}

.letrasAlerta {
  font-size: 3rem; /* Aumentar el tamaño de la fuente */
  color: #555;
}
</style>
