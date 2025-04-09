<script>
export default {
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
          sentimiento: null,
        },
        {
          id: 2,
          titulo: "El Gobierno aprueba un nuevo deslinde de costas en la Comunidad Valenciana",
          fuente: "Google Alerts",
          enlace: "https://www.google.com/url?rct=j&sa=t&url=https://www.abc.es/espana/comunidad-valenciana/abci-gobierno-aprueba-nuevo-deslinde-costas-comunidad-valenciana-202304070553_noticia.html&ct=ga&cd=CAIyGThhNWE4NWU3NDY0MjFlZTc6ZXM6ZXM6RVM&usg=AOvVaw0DTzwDa1qZZGEdDf-2yN4I",
          fecha: "2025-04-07 05:53:55",
          descripcion: "El Gobierno ha aprobado un nuevo deslinde de costas en la Comunidad Valenciana que afecta a más de 61 kilómetros de litoral.",
          sentimiento: null,
        },
        {
          id: 3,
          titulo: "La nueva ley de Costas valenciana busca proteger el litoral",
          fuente: "Google Alerts",
          enlace: "https://www.google.com/url?rct=j&sa=t&url=https://www.elperiodico.com/es/sociedad/20230407/nueva-ley-costas-valenciana-busca-proteger-litoral-202304070553_noticia.html&ct=ga&cd=CAIyGThhNWE4NWU3NDY0MjFlZTc6ZXM6ZXM6RVM&usg=AOvVaw0DTzwDa1qZZGEdDf-2yN4I",
          fecha: "2025-04-07 05:53:55",
          descripcion: "La nueva ley de Costas valenciana busca proteger el litoral y frenar el impacto del cambio climático en las costas.",
          sentimiento: null,
        },
      ],
    };
  },
}
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <h2>Menciones</h2>
        <ul>
        <li v-for="mencion in menciones" :key="mencion.id" class="mencion-item">
          <h3>{{ mencion.titulo }}</h3>
          <p><strong>Fuente:</strong> {{ mencion.fuente }}</p>
          <p><strong>Fecha:</strong> {{ mencion.fecha }}</p>
          <p><strong>Descripción:</strong> {{ mencion.descripcion }}</p>
          <div class="buttons">
            <button title="Editar" @click="editar(mencion.id)">
              <i class="bi bi-pencil"></i> Editar
            </button>
            <button title="Ver" @click="ver(mencion.id)">
              <i class="bi bi-eye"></i> Ver Detalles
            </button>
          </div>
        </li>
      </ul>
    </main>
  </div>
  </template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

.mencion-item {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.mencion-item h3 {
  margin: 0 0 0.5rem;
}

.mencion-item p {
  margin: 0.5rem 0;
}

.ver-detalles {
  display: inline-block;
  margin-top: 0.5rem;
  color: #0ac4ef;
  text-decoration: none;
}

.ver-detalles:hover {
  text-decoration: underline;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[title="Editar"] {
  background-color: #44d3c8;
  color: white;
}

button[title="Eliminar"] {
  background-color: #e74c3c;
  color: white;
}
</style>