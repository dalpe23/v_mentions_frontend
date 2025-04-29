<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions } from 'pinia';
import { useDataStore } from '@/stores/store';
import AppMessages from "@/components/AppMessages.vue";

export default {
  name: "AnadirAlertaForm",
  components: {
    Form,
    Field,
    ErrorMessage,
    AppMessages,
  },
  data() {
    return {
      form: {
        nombre: "",
        url: "",
        user_id: "",
      },
      schema: yup.object({
        nombre: yup
          .string()
          .min(3, "El nombre debe tener al menos 3 caracteres")
          .max(50, "El nombre no puede exceder los 50 caracteres")
          .required("El nombre es obligatorio"),
        url: yup
          .string()
          .url("Debe ser una URL válida")
          .required("La URL es obligatoria"),
        user_id: yup
          .number()
          .typeError("El ID de cliente debe ser un número")
          .required("El cliente es obligatorio"),
      }),
    };
  },
  setup() {
    return {
      ...mapActions(useDataStore, ["AnadirAlertaForm"]),
    };
  },
  methods: {
    async handleSubmit(values) {
      try {
        const { nombre, url, user_id } = values;
        const resultado = await this.AnadirAlertaForm(nombre, url, user_id);
        if (resultado === true) {
          this.$router.push("/alertas");
        }
      } catch (error) {
        console.error("Error al añadir alerta:", error);
      }
    },
  },
};
</script>

<template>
  <div class="alerta-container">
    <h2>Añadir nueva Alerta</h2>
    <Form @submit="handleSubmit" :validation-schema="schema">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <Field name="nombre" type="text" v-model="form.nombre" class="form-input" />
        <ErrorMessage name="nombre" class="form-error" />
      </div>
      <div class="form-group">
        <label for="user_id">ID de Cliente</label>
        <Field name="user_id" type="number" v-model="form.user_id" class="form-input" />
        <ErrorMessage name="user_id" class="form-error" />
      </div>
      <div class="form-group">
        <label for="url">URL</label>
        <Field name="url" type="text" v-model="form.url" class="form-input" />
        <ErrorMessage name="url" class="form-error" />
      </div>
      <button type="submit" class="btn-submit">
        <i class="bi bi-send"></i> Añadir Alerta
      </button>
    </Form>
  </div>
</template>

<style scoped>
.alerta-container {
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

.alerta-container h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 600px; 
}

.form-input {
  width: 100%;
  padding: 1rem; 
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 1.2rem;
  color: #333;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

.form-error {
  color: #e74c3c;
  font-size: 1rem; 
  margin-top: 0.5rem;
}

.btn-submit {
  width: 100%;
  max-width: 600px;
  padding: 1rem; 
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem; 
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.3s;
  font-weight: 600;

}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
