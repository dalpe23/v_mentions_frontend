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
    
  },

  actions: {
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
        const response = await axios.get(`${SERVER}/menciones`);
       this.menciones = response.data;
      } catch (error) {
        console.error("Error fetching menciones:", error);
      }
    },
    async cargarAlertas() {
      this.loading = true;
      this.error = null;
      try {
        // Si utilizas autenticación via token, asegúrate de incluir la cabecera Authorization.
        // Por ejemplo, si el token está en localStorage:
        // const token = localStorage.getItem('token');
        // const config = { headers: { Authorization: `Bearer ${token}` } };

        // En este ejemplo, se hace la petición a la ruta protegida que devuelve solo las alertas del usuario
        const response = await axios.get('http://localhost/api/mis-alertas' /*, config*/);
        this.alertas = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
})
