<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions } from "pinia";
import { useDataStore } from "@/stores/store";

export default {
  name: "AnadirAlerta",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      form: {
        keywords: "",
        idioma: "",
      },
      schema: yup.object({
        keywords: yup
          .string()
          .matches(/^[a-zA-Z0-9,\s]+$/, "No se permiten caracteres especiales")
          .min(3, "Las keywords deben tener al menos 3 caracteres")
          .max(100, "Las keywords no pueden exceder los 100 caracteres")
          .required("Las keywords son obligatorias"),
        idioma: yup.string().required("El idioma es obligatorio"),
      }),
    };
  },
  methods: {
    ...mapActions(useDataStore, ["crearAlerta"]),
    async handleSubmit(values) {
      const resultado = await this.crearAlerta(values);
      if (resultado) {
        this.$router.push('/alertas');
      }
    },
  },
};
</script>

<template>
  <div class="alerta-container">
    <h2>Crear una Alerta</h2>
    <Form @submit="handleSubmit" :validation-schema="schema">
      <div class="form-group">
        <label for="keywords">Keywords</label>
        <Field name="keywords" type="text" v-model="form.keywords" class="form-input" />
        <ErrorMessage name="keywords" class="form-error" />
      </div>
      <div class="form-group">
        <label for="idioma">Idioma</label>
        <Field as="select" name="idioma" v-model="form.idioma" class="form-input">
          <option value="" disabled>Selecciona un idioma</option>
          <option value="es">Español</option>
          <option value="vc">Valencià</option>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
          <option value="de">Alemán</option>
          <option value="it">Italiano</option>
          <option value="pt">Portugués</option>
          <option value="zh">Chino</option>
          <option value="ja">Japonés</option>
          <option value="ru">Ruso</option>
        </Field>
        <ErrorMessage name="idioma" class="form-error" />
      </div>
      <button type="submit" class="btn-submit">
        <i class="bi bi-send"></i> Enviar Alerta
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
