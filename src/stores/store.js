import { defineStore } from 'pinia'
import axios from "axios";

 const SERVER = "http://localhost/api";
// const SERVER = "https://v-mentions.myp.com.es/Laravel/public/api";
// https://v-mentions.myp.com.es/Laravel/public/api/menciones

export const useDataStore = defineStore("data", {
  state() {
    return {
      menciones: [],
      alertas: [],
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
        alert("Error al cargar las menciones");
        console.error("Error al cargar las menciones:", error);
      }
    },

    async fetchAlertas() {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.get(`${SERVER}/mis-alertas`, headers);

        this.alertas = response.data;
      } catch (error) {
        alert("Error al cargar las alertas");
        console.error("Error al cargar las alertas:", error);
      }
    },

    async fetchClientes(){
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.get(`${SERVER}/clientes`, headers);
        return response.data;
      } catch (error) {
        alert("Error al cargar los clientes");
        console.error("Error al cargar los clientes:", error);
      }
    },

    async deleteCliente(id) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.delete(`${SERVER}/clientes/${id}`, headers);
        alert("Cliente eliminado correctamente");
        console.log(response);

      } catch (error) {
        alert("Error al eliminar el cliente");
        console.error("Error al eliminar el cliente:", error);
      }
    },

    async AnadirCliente(nombre, correo) {
      try {
        const headers = this.getAuthHeaders();
        if (!headers) return;

        const response = await axios.post(`${SERVER}/clientes`, {
          name: nombre,
          email: correo,
        }, headers);
        console.log(response);

        if (response.status === 200) {
          alert("Cliente añadido correctamente");
          this.fetchMenciones();
        } 
      } catch (error) {
        alert("Error al añadir el cliente");
        console.error("Error al añadir el cliente:", error);
      }
    }

  },
})
