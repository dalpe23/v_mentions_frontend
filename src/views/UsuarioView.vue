<script>
import { mapState, mapActions } from 'pinia'
import { useDataStore } from '@/stores/store'

export default {
  name: 'UsuarioView',
  data() {
    return {
      usuario: {
        nombre: '',
        email: '',
        rol: '',
      },
    };
  },
  computed: {
    ...mapState(useDataStore, ['usuario']),
  },
  methods: {
    logout() {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      this.$router.push({ name: 'login' });
    },
  },
  
  mounted() {
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      this.usuario = {
        nombre: usuarioData.name,
        email: usuarioData.email,
        rol: usuarioData.rol,
      };
    }
  },
}
</script>

<template>
  <div class="usuario-container">
    <div class="usuario-info">
      <h2>Mis datos</h2>
      <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
      <p><strong>Email:</strong> {{ usuario.email }}</p>
      <p><strong>Rol:</strong> {{ usuario.rol }}</p>
      <p></p>
    </div>
    <div class="usuario-actions">
     <!-- <button v-if="usuario.rol === 'admin'" class="btn-register" @click="$router.push('/anadir-cliente')">Dar de alta Usuario</button> -->
      <button v-if="usuario.rol === 'admin'" class="btn-ver" @click="$router.push('/clientes')">Panel de Usuarios</button>
      <button class="btn-logout" @click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.usuario-container {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  height: 90vh;
  width: 80vw;
  background-color: #ffffff;
  box-sizing: border-box;
  margin: 0 auto;
}

.usuario-info {
  text-align: left;
  margin-bottom: 2rem;
}

.usuario-info h2 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 2rem;
  text-align: center;
}

.usuario-info p {
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}

.usuario-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
}

button {
  padding: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.btn-register {
  background-color: #28a745;
  color: white;
}

.btn-register:hover {
  background-color: #218838;
}

.btn-logout {
  background-color: #dc3545;
  color: white;
}

.btn-logout:hover {
  background-color: #c82333;
}

.btn-ver {
  background-color: #2878a7;
  color: white;
}

.btn-ver:hover {
  background-color: #0049bf;
}
</style>
