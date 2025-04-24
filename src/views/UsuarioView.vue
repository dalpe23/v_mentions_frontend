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
      nuevoEmail: '',
      alertEmails: [],
    }
  },
  onBeforeMount() {
    this.inicializarVista()
  },
  watch: {
    $route() {
      this.inicializarVista()
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.inicializarVista()
    })
  },
  methods: {
    ...mapActions(useDataStore, [
      'addAlertEmail',
      'fetchAlertEmails',
      'deleteAlertEmail',
      'anadirMensaje',
    ]),
    logout() {
      localStorage.removeItem('usuario')
      localStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    },
    async guardarEmail() {
      if (!this.nuevoEmail) {
        this.anadirMensaje('Por favor, introduce un email.')
        return
      }
      await this.addAlertEmail(this.nuevoEmail)
      this.nuevoEmail = ''
      await this.cargarAlertEmails()
    },
    async cargarAlertEmails() {
      this.alertEmails = await this.fetchAlertEmails()
    },
    async eliminarAlertEmail(id) {
        await this.deleteAlertEmail(id)
        await this.cargarAlertEmails()
    },
    async inicializarVista() {
      const usuarioData = JSON.parse(localStorage.getItem('usuario'))
      if (usuarioData) {
        this.usuario = {
          nombre: usuarioData.name,
          email: usuarioData.email,
          rol: usuarioData.rol,
        }
      }
      await this.cargarAlertEmails()
    },
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
      <div class="alert-emails-list">
        <div class="alert-email-form">
          <h3>Correos de alerta</h3>
          <ul v-if="alertEmails.length">
            <li v-for="email in alertEmails" :key="email.id">
              {{ email.email }}
              <button class="btn-eliminar" @click="eliminarAlertEmail(email.id)">
                <i class="bi bi-trash"></i>
              </button>
            </li>
          </ul>
          <div v-else class="no-alert-emails">No hay correos de alerta</div>
          <br />
          <h3>Añadir correo para alertas</h3>
          <input type="email" v-model="nuevoEmail" placeholder="Correo electrónico" />
          <button class="btn-alert" @click="guardarEmail">
            <i class="bi bi-save"></i> Guardar
          </button>
        </div>
      </div>
      <p></p>
    </div>
    <div class="usuario-info usuario-actions">
      <!-- <button v-if="usuario.rol === 'admin'" class="btn-register" @click="$router.push('/anadir-cliente')">Dar de alta Usuario</button> -->
      <button v-if="usuario.rol === 'admin'" class="btn-ver" @click="$router.push('/clientes')">
        <i class="bi bi-people"></i> Admin User Panel
      </button>
      <button class="btn-logout" @click="logout">
        <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
      </button>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
}

.usuario-actions button {
  width: auto;
  min-width: 160px;
}

button {
  padding: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  font-weight: 600;
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
  background-color: #390071;
  color: white;
}

.btn-ver:hover {
  background-color: #0f0038;
}

.alert-email-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f6f8fa;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(60, 60, 120, 0.07);
  max-width: 500px;
  margin: 2rem auto 1.5rem auto;
  border: 1px solid #e0e0e0;
}

.alert-email-form h3 {
  margin-bottom: 1.2rem;
  color: #2d2d3a;
  font-size: 1.3rem;
  font-weight: 600;
}

.alert-email-form input[type='email'] {
  padding: 0.7rem 1rem;
  border: 1px solid #bfc4d1;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 350px;
  background: #fff;
  transition: border 0.2s;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.alert-email-form input[type='email']:focus {
  border: 1.5px solid #390071;
  outline: none;
}

.alert-email-form .btn-alert {
  display: block;
  margin: 0 auto;
  background: linear-gradient(90deg, #009688 60%, #009688 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(60, 0, 120, 0.08);
  transition:
    background 0.2s,
    box-shadow 0.2s;
}

.alert-email-form .btn-alert:hover {
  background: linear-gradient(90deg, #00645a 60%, #007569 100%);
  box-shadow: 0 2px 8px rgba(60, 0, 120, 0.13);
}

.alert-emails-list {
  margin-top: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.alert-emails-list h3 {
  color: #2d2d3a;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.alert-emails-list ul {
  list-style: none;
  padding: 0;
}

.alert-emails-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.2rem;
  margin-bottom: 0.7rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60, 60, 120, 0.07);
  font-size: 1.13rem;
  color: #2d2d3a;
  transition: box-shadow 0.2s;
  border: 1px solid #e0e0e0;
}

.alert-emails-list li:last-child {
  margin-bottom: 0;
}

.alert-emails-list .email-text {
  font-weight: 500;
  letter-spacing: 0.01em;
  word-break: break-all;
}

.alert-emails-list button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 0.5em;
  font-size: 1rem;
  height: 2em;
  min-width: 2.5em;
  width: auto;
  cursor: pointer;
  margin-left: 1rem;
  box-shadow: 0 1px 4px rgba(255, 77, 79, 0.08);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.alert-emails-list button:hover {
  background-color: #c82333;
  box-shadow: 0 2px 8px rgba(255, 77, 79, 0.18);
}

@media (max-width: 1024px) {
  .usuario-container {
    margin: 4vw auto;
    width: 92vw;
    max-width: 400px;
    min-width: 0;
    padding: 1rem 0.5rem;
    border-radius: 12px;
    background: #fff;
    align-items: center;
    justify-content: flex-start;
  }
  .alert-emails-list,
  .alert-email-form {
    max-width: 100%;
    width: 100%;
    min-width: 0;
    margin: 1rem 0 0 0;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(60, 60, 120, 0.07);
  }
  .alert-emails-list li {
    max-width: 100%;
    min-width: 0;
    word-break: break-all;
    overflow-wrap: break-word;
    font-size: 1rem;
    padding: 0.7rem 0.5rem;
    margin-left: auto;
    margin-right: auto;
    width: 98%;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(60, 60, 120, 0.07);
  }
  .btn-alert {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .btn-submit {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .btn-register,
  .btn-logout,
  .btn-ver {
    padding: 1.2rem 0;
    font-size: 1.3rem;
    font-weight: 700;
    width: 100%;
    min-width: unset;
    margin-bottom: 1rem;
  }
  .usuario-actions {
    flex-direction: column;
    gap: 0;
    align-items: stretch;
  }
  .usuario-actions button:last-child {
    margin-bottom: 0;
  }
}
</style>
