<script>
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '@/stores/store';

export default{
    name: "Ver Clientes",

    data() {
        return {
            clientes: []
        }
    },

    methods: {
        ...mapActions(useDataStore, ["fetchClientes", "deleteCliente"]),
        async eliminarCliente(id) {
            await this.deleteCliente(id);
            this.clientes = await this.fetchClientes();
        }
    },

    async mounted() {
        this.clientes = await this.fetchClientes();
    },

    computed: {
        
    }
}
</script>

<template>
  <div class="clientes-container">
    <div class="clientes-card">
      <h1 class="clientes-title">Lista de Clientes</h1>
      <ul class="clientes-list">
        <li v-for="cliente in clientes" :key="cliente.id" class="cliente-item">
          <div class="cliente-info">
            <p><strong>Nombre:</strong> {{ cliente.name }}</p>
            <p><strong>Email:</strong> {{ cliente.email }}</p>
            <p><strong>Rol:</strong> {{ cliente.rol }}</p>
          </div>
          <button class="delete-button" @click="eliminarCliente(cliente.id)">Borrar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.clientes-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 84vw;
  background-color: #f5f5f5;
  margin: 0;
}

.clientes-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.clientes-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333333;
}

.clientes-list {
  list-style-type: none;
  padding: 0;
}

.cliente-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #cccccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 1.2rem;
}

.cliente-info p {
  margin: 0.5rem 0;
  text-align: left;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #e60000;
}
</style>