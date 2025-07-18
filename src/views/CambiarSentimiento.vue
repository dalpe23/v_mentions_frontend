<script>
  import { useDataStore } from "@/stores/store";
  import { mapActions } from "pinia";
  
  export default {
    name: "CambiarSentimiento",
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        mencion: [],
        sentimientoSeleccionado: "neutro",
      };
    },
    created() {
      this.cargarMencion();
    },
    methods: {
      ...mapActions(useDataStore, ["fetchMencion", "cambiarSentimiento", "marcarMencionComoLeida"]),
  
      async cargarMencion() {
        try {
          const mencion = await this.fetchMencion(this.id);
          if (mencion) {
            this.mencion = mencion;
            this.sentimientoSeleccionado = mencion.sentimiento || "neutro";
          }
        } catch (error) {
          console.error("Error al cargar la mención:", error);
        }
      },
  
      async guardarSentimiento() {
        try {
          await this.cambiarSentimiento(this.id, this.sentimientoSeleccionado);
          await this.marcarMencionComoLeida(this.id);
          this.$router.push("/menciones");
        } catch (error) {
          console.error("Error al guardar el sentimiento:", error);
        }
      },
  
      formatFecha(fecha) {
        const date = new Date(fecha);
        const dia = date.getDate().toString().padStart(2, "0");
        const mes = (date.getMonth() + 1).toString().padStart(2, "0");
        const anio = date.getFullYear();
        const hora = date.getHours().toString().padStart(2, "0");
        const minutos = date.getMinutes().toString().padStart(2, "0");
        return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
      },
    },
  };
  </script>

<template>
    <div class="cambiar-sentimiento">
      <h1>Detalles de la Mención</h1>
  
      <div v-if="mencion.titulo">
        <p><strong>Título:</strong> {{ mencion.titulo }}</p>
        <p><strong>Fuente:</strong> {{ mencion.fuente }}</p>
        <p><strong>Fecha:</strong> {{ formatFecha(mencion.fecha) }}</p>
        <p><strong>Sentimiento actual:</strong> {{ mencion.sentimiento }}</p>
      </div>
      <div v-else>
        <p>Cargando mención...</p>
      </div>
  
      <h2>Modificar Sentimiento</h2>
      <select v-model="sentimientoSeleccionado">
        <option value="positivo">Positivo👍</option>
        <option value="neutro">Neutro😐</option>
        <option value="negativo">Negativo👎</option>
      </select>
  
      <button @click="guardarSentimiento">Guardar Sentimiento</button>
    </div>
  </template>
  
  <style scoped>
  .cambiar-sentimiento {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
  
  h1, h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 16px;
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    font-size: 18px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

@media (max-width: 1024px) {
  .cambiar-sentimiento {
    padding: 0.5rem;
    width: 100vw;
    border-radius: 0;
    box-shadow: none;
  }
  select, button {
    font-size: 0.95rem;
    padding: 0.6rem;
  }
  h1, h2 {
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
  }
}
  </style>
