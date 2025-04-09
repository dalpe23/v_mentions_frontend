<script>
export default {
  name: "AlertasView",
  data() {
    return {
      alertas: [
        {
          id: 1,
          nombre: "Playas Valencia",
          nivel: "bajo",
          resuelta: false,
        },
        {
          id: 2,
          nombre: "Turismo Valencia",
          nivel: "medio",
          resuelta: false,
        },
      ],
    };
  },
  methods: {
    editar(id) {
      console.log("Editar alerta", id);
      this.$router.push({ name: "editarAlerta", params: { id }});
    },
  },
};
</script>

<template>
  <div class="alertas-container">
    <main class="alertas-content">
      <h2>Alertas</h2>
      <ul>
        <li v-for="alerta in alertas" :key="alerta.id" class="alerta-item">
          <div class="alerta-info">
            <h3>{{ alerta.nombre }}</h3>
            <p><strong>Resuelta:</strong> {{ alerta.resuelta ? 'Sí' : 'No' }}</p>
          </div>
          <div class="alerta-buttons">
            <button class="btn-remove" @click="eliminar(alerta.id)">Borrar</button>
            <button class="btn-view" @click="$router.push({ path: '/menciones', query: { alertaId: alerta.id } })">Ver Menciones</button>
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
</style>
