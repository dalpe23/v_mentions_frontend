import { defineStore } from 'pinia'
import axios from "axios";

 const SERVER = "http://localhost/api";
// const SERVER = "https://v-mentions.myp.com.es/Laravel/public/api";

export const useDataStore = defineStore("data", {
  state() {
    return {
      menciones: [],
      alertas: [],
      messages: [],
    };
  },

  getters: {
    totalMenciones(state) {
      return state.menciones.length;
    },
    totalAlertas(state) {
      return state.alertas.length;
    },
    mencionesPositivas(state) {
      return state.menciones.filter(m => m.sentimiento === "positivo").length;
    }
    ,
    mencionesNegativas(state) {
      return state.menciones.filter(m => m.sentimiento === "negativo").length;
    },
    getAlertaNombreById(state) {
      return (id) => {
        const alerta = state.alertas.find(a => a.id === id);
        return alerta ? alerta.nombre : null;
      };
    }
    ,
  },

  actions: {
    getAuthHeaders() {
      let token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      if (!token) {
        return null;
      }
      return { headers: { Authorization: `Bearer ${token}` } };
    },

    async login(email, contrasena) {
      try {
        const response = await axios.post(`${SERVER}/login`, {
          email: email,
          password: contrasena,
        });

        if (response.data) {
          localStorage.setItem("usuario", JSON.stringify(response.data.data));
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
          return response.data.data;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    },

    async fetchMenciones() {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.get(`${SERVER}/mis-menciones`, headers);

        this.menciones = response.data;
      } catch (error) {
        this.anadirMensaje("Error al cargar las menciones");
        console.error("Error al cargar las menciones:", error);
      }
    },

    async fetchMencion(id) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;
        const response = await axios.get(`${SERVER}/menciones/${id}`, headers);
        return response.data;
      } catch (error) {
        this.anadirMensaje("Error al cargar la mención");
        console.error("Error al cargar la mención:", error);
      }
    }
    ,

    async marcarMencionComoLeida(id) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        await axios.patch(`${SERVER}/menciones/${id}/leida`, {}, headers);

        const mencion = this.menciones.find(m => m.id === id);
        if (mencion) {
          mencion.leida = true;
        }
      } catch (error) {
        this.anadirMensaje("Error al marcar la mención como leída");
        console.error("Error al marcar la mención como leída:", error);
      }
    },

    async marcarMencioneComoNoLeida(id) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        await axios.patch(`${SERVER}/menciones/${id}/ponerComoNoLeida`, {}, headers);
        await this.fetchMenciones();
        this.anadirMensaje("Mención marcada como no leída");
        const mencion = this.menciones.find(m => m.id === id);
        if (mencion) {
          mencion.leida = false;
        }
      } catch (error) {
        this.anadirMensaje("Error al marcar la mención como no leída");
        console.error("Error al marcar la mención como no leída:", error);
      }
    },

    async fetchAlertas() {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.get(`${SERVER}/mis-alertas`, headers);

        this.alertas = response.data;
      } catch (error) {
        this.anadirMensaje("Error al cargar las alertas");
        console.error("Error al cargar las alertas:", error);
      }
    },

    async crearAlerta(alertaData) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;
        const response = await axios.post(`${SERVER}/alertas`, alertaData, headers);
        await this.fetchAlertas();
        this.anadirMensaje("Alerta enviada correctamente.");
        return response.data;
      } catch (error) {
        this.anadirMensaje("Error al crear la alerta.");
        console.error("Error al crear alerta:", error);
        return null;
      }
    },

    async deleteAlerta(id) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.delete(`${SERVER}/alertas/${id}`, headers);
        await this.fetchAlertas();
        console.log(response);

      } catch (error) {
        this.anadirMensaje("Error al eliminar la alerta");
        console.error("Error al eliminar la alerta:", error);
      }
    },

    async marcarAlertaComoResuelta(id) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        await axios.patch(`${SERVER}/alertas/${id}`, { resuelta: true }, headers);

        const alerta = this.alertas.find(a => a.id === id);
        if (alerta) {
          alerta.resuelta = true;
        }
      } catch (error) {
        this.anadirMensaje("Error al marcar la alerta como resuelta");
        console.error("Error al marcar la alerta como resuelta:", error);
      }
    },

    async fetchClientes(){
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.get(`${SERVER}/clientes`, headers);
        return response.data;
      } catch (error) {
        this.anadirMensaje("Error al cargar los clientes");
        console.error("Error al cargar los clientes:", error);
      }
    },

    async deleteCliente(id) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.delete(`${SERVER}/clientes/${id}`, headers);
        this.anadirMensaje("Cliente eliminado correctamente");
        console.log(response);

      } catch (error) {
        this.anadirMensaje("Error al eliminar el cliente");
        console.error("Error al eliminar el cliente:", error);
      }
    },

    async AnadirCliente(nombre, correo, contrasena) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return false;

        const response = await axios.post(`${SERVER}/clientes`, {
          name: nombre,
          email: correo,
          password: contrasena,
        }, headers);

        if (response.status === 201) {
          this.anadirMensaje("Cliente añadido correctamente");
          await this.fetchClientes();
          return true;
        }
        return false;
      } catch (error) {
        this.anadirMensaje("Error al añadir el cliente");
        console.error("Error al añadir el cliente:", error);
        return false;
      }
    },

    async cambiarSentimiento(id, sentimiento) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.patch(`${SERVER}/menciones/${id}/cambiarSentimiento`, {
          sentimiento: sentimiento,
        }, headers);

        if (response.status === 200) {
          this.anadirMensaje("Sentimiento cambiado correctamente");
          this.fetchMenciones();
        } 
      } catch (error) {
        this.anadirMensaje("Error al cambiar el sentimiento");
        console.error("Error al cambiar el sentimiento:", error);
      }
    },

    async anadirMensaje(mensaje) {
      try {
        this.messages.push(mensaje);
        setTimeout(() => {
          this.borrarMensaje(this.messages.length - 1);
        }
        , 4000);
      } catch (error) {
        console.error("Error al añadir mensaje:", error);
      }
    },
    async borrarMensaje(indice) {
      try {
        this.messages.splice(indice, 1);
      } catch (error) {
        this.anadirMensaje(error.message);
      }
    },

    async guardarAlertEmail(id, email) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.patch(`${SERVER}/alertas/${id}`, {
          email: email,
        }, headers);

        if (response.status === 200) {
          this.anadirMensaje("Email guardado correctamente");
          this.fetchAlertas();
        } 
      } catch (error) {
        this.anadirMensaje("Error al guardar el email");
        console.error("Error al guardar el email:", error);
      }
    }
    ,

    async addAlertEmail(email) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.post(`${SERVER}/alert-emails`, { email }, headers);
        if (response.status === 201) {
          this.anadirMensaje("Email añadido correctamente");
        }
        return response.data;
      } catch (error) {
        this.anadirMensaje("Error al añadir el email");
        throw error;
      }
    },

    async fetchAlertEmails() {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return [];
        const response = await axios.get(`${SERVER}/alert-emails`, headers);
        return response.data;
      } catch (error) {
        this.anadirMensaje("Error al cargar los correos de alerta");
        return [];
      }
    },
    async deleteAlertEmail(id) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;
        await axios.delete(`${SERVER}/alert-emails/${id}`, headers);
        this.anadirMensaje("Correo eliminado correctamente");
      } catch (error) {
        this.anadirMensaje("Error al eliminar el correo");
      }
    },
  },
})
