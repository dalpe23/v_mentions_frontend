<script>
import { useDataStore } from '@/stores/store'
import { mapActions } from 'pinia'

export default {
  name: 'ModificarAlerta',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      alerta: {},
      titulo: '',
      nombre: '',
      idioma: '',
      resuelta: false,
      idiomas: [
        { code: 'en-US', name: 'Inglés (EE.UU.)' },
        { code: 'en-GB', name: 'Inglés (Reino Unido)' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Francés' },
        { code: 'de', name: 'Alemán' },
        { code: 'pt', name: 'Portugués' },
        { code: 'it', name: 'Italiano' },
        { code: 'ru', name: 'Ruso' },
      ],
    }
  },
  created() {
    this.cargarAlerta()
  },
  methods: {
    ...mapActions(useDataStore, ['fetchAlerta', 'actualizarAlerta']),

    async cargarAlerta() {
      try {
        const alerta = await this.fetchAlerta(this.id)
        if (alerta) {
          this.alerta = alerta
          this.titulo = alerta.titulo
          this.nombre = alerta.nombre
          this.idioma = alerta.idioma
          this.resuelta = alerta.resuelta
        }
      } catch (error) {
        console.error('Error al cargar la alerta:', error)
      }
    },

    async guardarAlerta() {
      try {
        const datosActualizados = {
          titulo: this.titulo,
          nombre: this.nombre,
          idioma: this.idioma,
          resuelta: this.resuelta,
        }
        await this.actualizarAlerta(this.id, datosActualizados)
        this.$router.push('/alertas')
      } catch (error) {
        console.error('Error al guardar la alerta:', error)
      }
    },
  },
}
</script>

<template>
  <div class="modificar-alerta">
    <h1>Modificar Alerta</h1>

    <div v-if="alerta">
      <label for="titulo">Título:</label>
      <input v-model="titulo" id="titulo" type="text" />

      <label for="nombre">Nombre:</label>
      <input v-model="nombre" id="nombre" type="text" />

      <label for="idioma">Idioma:</label>
      <select v-model="idioma" id="idioma">
        <option v-for="idioma in idiomas" :key="idioma.code" :value="idioma.code">
          {{ idioma.name }}
        </option>
      </select>

      <label for="resuelta" style="display: flex; align-items: center; gap: 0.5rem">
      </label>

      <button @click="guardarAlerta">Guardar Cambios</button>
    </div>
    <div v-else>
      <p>Cargando alerta...</p>
    </div>
  </div>
</template>

<style scoped>
.modificar-alerta {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

label {
  margin-top: 1rem;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 18px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

label[for='resuelta'] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

input[type='checkbox'] {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  accent-color: #0084ff;
}

@media (max-width: 1024px) {
  .modificar-alerta {
    padding: 0.5rem;
    width: 100vw;
    border-radius: 0;
    box-shadow: none;
  }
  input,
  select,
  button {
    font-size: 0.95rem;
    padding: 0.6rem;
  }
  h1 {
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
  }
}
</style>
