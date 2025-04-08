import { defineStore } from 'pinia'
import axios from "axios";

const SERVER = "http://localhost/api";

export const useDataStore = defineStore("data", {
  state() {
    return {

    };
  },

  getters: {
    
  },

  actions: {
    async fetchMenciones() {
      try {
        const response = await axios.get(`${SERVER}/menciones`);
        return response.data;
      } catch (error) {
        console.error("Error fetching menciones:", error);
      }
    }
  },
})
