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
      <h1 class="clientes-title">Listado de Clientes</h1>
      <ul class="clientes-list">
        <button class="btn-register" @click="$router.push('/anadir-cliente')">Dar de alta Usuario</button>
        <li v-for="cliente in clientes" :key="cliente.id" class="cliente-item">
          <div class="cliente-info">
            <p><strong>Nombre:</strong> {{ cliente.name }}</p>
            <p><strong>Email:</strong> {{ cliente.email }}</p>
            <p><strong>Rol:</strong> {{ cliente.rol }}</p>
          </div>
          <button class="delete-button" @click="eliminarCliente(cliente.id)">Eliminar Usuario</button>
        </li>
        <div>
        <p v-if="!clientes.length" style="text-align: center; font-size: 20px;">Cargando clientes...</p>
      </div>
      </ul>    
    </div>
  </div>
</template>

<style scoped>
.clientes-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
}

.btn-register {
  background-color: #28a745;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
    margin-bottom: 1rem;
}

.btn-register:hover {
  background-color: #218838;
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
  font-size: 1.2rem;
  transition: background-color 0.3s;

}

.delete-button:hover {
  background-color: #e60000;
}
</style>