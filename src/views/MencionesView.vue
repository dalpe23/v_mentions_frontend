<script>
export default {
  name: "MencionesView",
  data() {
    return {
      menciones: [
        {
          id: 1,
          titulo: "Los nuevos deslindes del Gobierno afectan 61 km de costa en la Comunidad Valenciana",
          fuente: "Google Alerts",
          enlace: "https://www.google.com/url?rct=j&sa=t&url=https://noticiasciudadanas.com/los-nuevos-deslindes-del-gobierno-afectan-61-km-de-costa-en-la-comunidad-valenciana-el-consell-prepara-su-respuesta-legal/&ct=ga&cd=CAIyGThhNWE4NWU3NDY0MjFlZTc6ZXM6ZXM6RVM&usg=AOvVaw0DTzwDa1qZZGEdDf-2yN4I",
          fecha: "2025-04-07 05:53:55",
          descripcion: "La futura ley de Costas valenciana busca frenar el impacto en propiedades y proteger el patrimonio litoral. En un contexto de creciente tensión ...",
          sentimiento: "positivo",
        },
        {
          id: 2,
          titulo: "El Gobierno aprueba un nuevo deslinde de costas en la Comunidad Valenciana",
          fuente: "Google Alerts",
          enlace: "https://www.google.com/url?rct=j&sa=t&url=https://www.abc.es/espana/comunidad-valenciana/abci-gobierno-aprueba-nuevo-deslinde-costas-comunidad-valenciana-202304070553_noticia.html&ct=ga&cd=CAIyGThhNWE4NWU3NDY0MjFlZTc6ZXM6ZXM6RVM&usg=AOvVaw0DTzwDa1qZZGEdDf-2yN4I",
          fecha: "2025-04-07 05:53:55",
          descripcion: "El Gobierno ha aprobado un nuevo deslinde de costas en la Comunidad Valenciana que afecta a más de 61 kilómetros de litoral.",
          sentimiento: "negativo",
        },
        {
          id: 3,
          titulo: "La nueva ley de Costas valenciana busca proteger el litoral",
          fuente: "Google Alerts",
          enlace: "https://www.google.com/url?rct=j&sa=t&url=https://www.elperiodico.com/es/sociedad/20230407/nueva-ley-costas-valenciana-busca-proteger-litoral-202304070553_noticia.html&ct=ga&cd=CAIyGThhNWE4NWU3NDY0MjFlZTc6ZXM6ZXM6RVM&usg=AOvVaw0DTzwDa1qZZGEdDf-2yN4I",
          fecha: "2025-04-07 05:53:55",
          descripcion: "La nueva ley de Costas valenciana busca proteger el litoral y frenar el impacto del cambio climático en las costas.",
          sentimiento: "neutral",
        },
      ],      // const response = await axios.get(`http://localhost/api/alertas/${alertaId}/menciones`);
              // menciones.value = response.data;
    };
  },
  methods: {
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
};
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <h2>Menciones para la alerta {{ alertaId }}</h2>
      <ul>
        <li v-for="mencion in menciones" :key="mencion.id" class="mencion-item">
          <a :href="mencion.enlace" target="_blank" class="mencion-link">
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
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
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
</style>