<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores/store'
import AppMessages from '@/components/AppMessages.vue'

export default {
  name: 'AnadirAlertaForm',
  components: {
    Form,
    Field,
    ErrorMessage,
    AppMessages,
  },
  data() {
    return {
      form: {
        keywords: '',
        idioma: 'es',
      },
      schema: yup.object({
        keywords: yup
          .string()
          .min(3, 'La palabra clave debe tener al menos 3 caracteres')
          .max(100, 'Máximo 100 caracteres')
          .required('Las keywords son obligatorias'),
      }),
    }
  },
  setup() {
    return {
      ...mapActions(useDataStore, ['crearAlerta']),
    }
  },
  methods: {
    async handleSubmit(values) {
      try {
        let { keywords, idioma } = values
        idioma = idioma || 'es' 
        const resultado = await this.crearAlerta({ keywords, idioma })
        this.router.push("/alertas")
        
      } catch (error) {
        console.error('Error al añadir alerta:', error)
      }
    },
  },
}
</script>

<template>
  <div class="alerta-container">
    <h2>Añadir nueva Alerta</h2>
    <Form @submit="handleSubmit" :validation-schema="schema">
      <div class="form-group">
        <label for="keywords"><b>Keywords</b></label>
        <Field name="keywords" type="text" v-model="form.keywords" class="form-input" />
        <div class="ejemplo-label">Ejemplo:</div>
        <div class="keywords-ejemplo">
          <span class="ejemplos">casa</span>
          <span class="ejemplos">papa de roma</span>
          <span class="ejemplos">elecciones</span>
        </div>
        <ErrorMessage name="keywords" class="form-error" />
      </div>
      <button type="submit" class="btn-submit"><i class="bi bi-send"></i> Crear Alerta</button>
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

.keywords-ejemplo {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.ejemplos {
  display: inline-block;
  background: #e3e8f0;
  color: #333;
  border-radius: 12px;
  padding: 0.2em 0.8em;
  font-size: 1rem;
  margin-right: 0.5em;
  margin-bottom: 0.2em;
  border: 1px solid #bfc9d9;
}

.ejemplo-label {
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
  font-style: italic;
}
</style>
