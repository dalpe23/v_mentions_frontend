<script>
import router from '@/router';

export default {
  name: "AlertasView",
  methods: {
    ver(id) {
      console.log("Ver mencion con ID:", id);
      this.$router.push(`/ver-detalles/${id}`);
    },
    editar(id) {
      console.log("Editar mención con ID:", id);
      this.$router.push(`/editar-llamada/${id}`);
    },
  },
};
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <h2>Alertas</h2>
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
