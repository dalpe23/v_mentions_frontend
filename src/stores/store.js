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
    async fetchMenciones() {
      try {
        const response = await axios.get(`${SERVER}/menciones`);
       this.menciones = response.data;
      } catch (error) {
        console.error("Error fetching menciones:", error);
      }
    },
    async fetchAlertas() {
      try {
        const response = await axios.get(`${SERVER}/alertas`);
        this.alertas = response.data;
      } catch (error) {
        console.error("Error fetching alertas:", error);
      }
    },
  },
})
