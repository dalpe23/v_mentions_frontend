<script>
import { useDataStore } from '@/stores/store';
import { mapActions, mapState } from 'pinia';

export default {
  name: "MencionesView",
  computed: {
    ...mapState(useDataStore, ["menciones"]),
  },

  methods: {
    ...mapActions(useDataStore, ["fetchMenciones", "marcarMencionComoLeida", "marcarMencioneComoNoLeida"]),

    formatFecha(fecha) {
      const date = new Date(fecha);
      const dia = date.getDate().toString().padStart(2, "0");
      const mes = (date.getMonth() + 1).toString().padStart(2, "0");
      const anio = date.getFullYear();
      const hora = date.getHours().toString().padStart(2, "0");
      const minutos = date.getMinutes().toString().padStart(2, "0");
      return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
    },
  },

  async mounted() {
    // await this.fetchMenciones();
  },
};
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <h2>Mis menciones</h2>
      <ul v-if="menciones.length > 0">
        <li v-for="mencion in menciones" :key="mencion.id" :class="['mencion-item', { 'leida': mencion.leida }]">
          <a :href="mencion.enlace" target="_blank" class="mencion-link" @click="marcarMencionComoLeida(mencion.id)">
            <h3>{{ mencion.titulo }}</h3>
            <p><strong>Descripción:</strong> {{ mencion.descripcion }}</p>
            <p><strong>Fecha:</strong> {{ formatFecha(mencion.fecha) }}</p>
            <p><strong>Fuente:</strong> {{ mencion.fuente }}</p>
          </a>
          <div class="sentimiento-icon">
            <span v-if="mencion.sentimiento === 'positivo'" title="Sentimiento positivo">👍</span>
            <span v-else-if="mencion.sentimiento === 'negativo'" title="Sentimiento negativo">👎</span>
            <span v-else title="Sentimiento neutral">😐</span>
          </div>
          <button class="mencion-btn" @click="marcarMencioneComoNoLeida(mencion.id) ">Marcar como no leída</button>
        </li>
      </ul>
      <h3 v-else style="color: red; text-align: center;">Para ver tus menciones añade una alerta</h3>
    </main>
  </div>
</template>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
}

.mencion-btn {
  background-color: #007bff;
  color: white;
  border: none;
  margin: 1rem;
  padding: 0.5rem 1rem;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  bottom: 1rem;
  left: 1rem;
}

.app-container {
  display: flex;
  width: 85vw;
  height: 100vh;
  overflow-x: hidden;
}

.main-content {
  flex-grow: 1;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

h2 {
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

.mencion-item {
  position: relative; 
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.mencion-item:hover {
  transform: scale(1.02); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mencion-link {
  display: block; 
  text-decoration: none;
  color: inherit; 
  padding: 1rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.mencion-link h3 {
  margin: 0 0 0.5rem;
}

.mencion-link p {
  margin: 0.5rem 0;
}

.sentimiento-icon {
  position: absolute;
  top: 4rem;
  right: 7rem;
  font-size: 2rem;
}

.mencion-item.leida {
  background-color: #e0ffe0;
}
</style>