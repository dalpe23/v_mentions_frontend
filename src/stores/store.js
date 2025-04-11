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

       return response.data;
      } catch (error) {
        alert("Error al cargar las menciones");
        console.error("Error al cargar las menciones:", error);
      }
    },

  },
})
