<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '@/stores/store';
import AppMessages from "@/components/AppMessages.vue";

export default {
  name: "AnadirCliente",

  components: {
    Form,
    Field,
    ErrorMessage,
    AppMessages,
  },

  data() {
    return {
      form: {
        name: "",
        email: "",
      },
      schema: yup.object({
        name: yup
          .string()
          .min(3, "El nombre debe tener al menos 3 caracteres")
          .max(50, "El nombre no puede exceder los 50 caracteres")
          .required("El nombre es obligatorio"),
        email: yup
          .string()
          .email("Debe ser un correo electrónico válido")
          .required("El correo electrónico es obligatorio"),
      }),
    };
  },

  setup() {
    const store = useDataStore();
    return {
      ...mapActions(useDataStore, ["AnadirCliente"]),
    };
  },

  methods: {
    async handleSubmit(values) {
      const { name, email } = values;
        await this.AnadirCliente(name, email);
        this.$router.push("/clientes");
    },
  },
};
</script>

<template>
  <div class="alerta-container">
    <h2>Añadir nuevo Cliente</h2>
    <Form @submit="handleSubmit" :validation-schema="schema">
      <div class="form-group">
        <label for="name">Nombre</label>
        <Field name="name" type="text" v-model="form.name" class="form-input" />
        <ErrorMessage name="name" class="form-error" />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <Field name="email" type="email" v-model="form.email" class="form-input" />
        <ErrorMessage name="email" class="form-error" />
      </div>

      <button type="submit" class="btn-submit">Añadir Cliente</button>
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
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
