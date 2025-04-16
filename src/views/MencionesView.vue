<script>
import { useDataStore } from '@/stores/store';
import { mapActions, mapState } from 'pinia';

export default {
  name: "MencionesView",
  data() {
    return {
      filtro: {
        fechaDesde: '',
        fechaHasta: '',
        alerta: '',
        valoracion: '',
        estado: '',
      }
    };
  },
  computed: {
    ...mapState(useDataStore, ["menciones", "alertas"]),
    mencionesFiltradas() {
      return this.menciones.filter(mencion => {
        const fechaValida = (!this.filtro.fechaDesde || new Date(mencion.fecha) >= new Date(this.filtro.fechaDesde)) &&
                            (!this.filtro.fechaHasta || new Date(mencion.fecha) <= new Date(this.filtro.fechaHasta + 'T23:59:59'));
        const alertaValida = (!this.filtro.alerta || mencion.alerta_id == this.filtro.alerta);
        const valoracionValida = (!this.filtro.valoracion || mencion.sentimiento === this.filtro.valoracion);
        const estadoValido = (!this.filtro.estado || (this.filtro.estado === 'leida' && mencion.leida) || (this.filtro.estado === 'no_leida' && !mencion.leida));

        return fechaValida && alertaValida && valoracionValida && estadoValido;
      });
    },
  },

  methods: {
    ...mapActions(useDataStore, ["fetchMenciones", "fetchAlertas", "marcarMencionComoLeida", "marcarMencioneComoNoLeida"]),

    formatFecha(fecha) {
      const date = new Date(fecha);
      const dia = date.getDate().toString().padStart(2, "0");
      const mes = (date.getMonth() + 1).toString().padStart(2, "0");
      const anio = date.getFullYear();
      const hora = date.getHours().toString().padStart(2, "0");
      const minutos = date.getMinutes().toString().padStart(2, "0");
      return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
    },

    aplicarFiltros() {
      this.fetchMenciones();
    },

    limpiarFiltros() {
      this.filtro = {
        fechaDesde: '',
        fechaHasta: '',
        alerta: '',
        valoracion: '',
        estado: '',
      };
      this.aplicarFiltros();
    }
  },

  async mounted() {
    await this.fetchAlertas();
    await this.fetchMenciones();
  },
};
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <h2>Mis Menciones</h2>

      <section class="filtros">
        <p>Fecha desde:</p>
        <input type="date" v-model="filtro.fechaDesde" />
        <p>Fecha hasta:</p>
        <input type="date" v-model="filtro.fechaHasta" />

        <select v-model="filtro.alerta">
          <option value="">Todas mis alertas</option>
          <option v-for="alerta in alertas" :key="alerta.id" :value="alerta.id">{{ alerta.nombre }}</option>
        </select>

        <select v-model="filtro.valoracion">
          <option value="">Todas las valoraciones</option>
          <option value="positivo">Positivas</option>
          <option value="negativo">Negativas</option>
          <option value="neutro">Neutras</option>
        </select>

        <select v-model="filtro.estado">
          <option value="">Todos los estados</option>
          <option value="no_leida">Nuevas</option>
          <option value="leida">Revisadas</option>
        </select>

        <button class="limpiarFiltro" @click="limpiarFiltros">Limpiar filtros</button>
      </section>

      <ul v-if="mencionesFiltradas.length > 0">
        <li v-for="mencion in mencionesFiltradas" :key="mencion.id" :class="['mencion-item', { 'leida': mencion.leida }]">
          <a :href="mencion.enlace" target="_blank" class="mencion-link" @click="marcarMencionComoLeida(mencion.id)">
            <h3>{{ mencion.titulo }}</h3>
            <p><strong>Descripción:</strong> {{ mencion.descripcion }}</p>
            <p><strong>Temáticas:</strong> {{ mencion.tematica }}</p>
            <p><strong>Fecha:</strong> {{ formatFecha(mencion.fecha) }}</p>
            <p><strong>Fuente:</strong> {{ mencion.fuente }}</p>
          </a>
          <div class="sentimiento-icon">
            <span v-if="mencion.sentimiento === 'positivo'" title="Sentimiento positivo">👍</span>
            <span v-else-if="mencion.sentimiento === 'negativo'" title="Sentimiento negativo">👎</span>
            <span v-else title="Sentimiento neutral">😐</span>
          </div>
          <button class="mencion-btn" @click="marcarMencioneComoNoLeida(mencion.id)">Marcar como no leída</button>
          <button class="mencion-btn-cambiar" @click="$router.push('/menciones/'+ mencion.id)">Cambiar Valoración Manualmente</button>
        </li>
      </ul>
      <div v-else>
        <h3 style="color: red; text-align: center;">No se han encontrado menciones</h3>
        <p v-if="!menciones.length">Cargando menciones...</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
}

.limpiarFiltro{
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.limpiarFiltro:hover{
  background-color: #d32f2f;
}

.filtros {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
}

.filtros p {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
}

.filtros input[type="date"],
.filtros select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.filtros input[type="date"] {
  width: 12rem;
}

.filtros select {
  width: 15rem;
}

.mencion-btn, .mencion-btn-cambiar {
  background-color: #007bff;
  color: white;
  border: none;
  margin: 1rem;
  padding: 0.5rem 1rem;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.mencion-btn-cambiar {
  background-color: #f0ad4e;
}

.mencion-btn:hover {
  background-color: #0056b3;
}

.mencion-btn-cambiar:hover {
  background-color: #ec971f;
}

.app-container {
  display: flex;
  width: 100%;
  height: 100%;
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
  padding: 1rem;
  text-decoration: none;
  color: inherit;
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
