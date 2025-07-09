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
          .min(3, 'Las keywords deben tener al menos 3 carácteres')
          .max(100, 'Las keywords deben tener máximo 100 carácteres')
          .required('El campo es obligatorio'),
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
        if (keywords.includes(';')) {
          const keywordsArray = keywords.split(';').map(k => k.trim()).filter(k => k.length > 0)
          for (const kw of keywordsArray) {
            await this.crearAlerta({ keywords: kw, idioma })
          }
        } else {
          await this.crearAlerta({ keywords, idioma })
        }
        this.$router.push("/alertas")
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
        <ErrorMessage name="keywords" class="form-error" />
        <div class="ejemplo-label"><b>Ejemplo de uso:</b></div>
        <div class="info-separadores">
          <div class="ejemplo-tarjeta">
            <div class="ejemplo-titulo"><i class="bi bi-layers"></i> Añadir varias alertas a la vez</div>
            <div class="ejemplo-cuerpo">
              <span class="ejemplo-separador">casa; coche; papa de roma</span>
              <span class="ejemplo-flecha">→</span>
              <span class="ejemplo-resultado">Se crean <b>3 alertas diferentes</b></span>
            </div>
            <div class="ejemplo-descripcion">Usa <b>punto y coma</b> (<span class="ejemplo-sep">;</span>) para separar varias alertas.</div>
          </div>
          <div class="ejemplo-tarjeta">
            <div class="ejemplo-titulo"><i class="bi bi-collection"></i> Añadir una alerta con varias palabras</div>
            <div class="ejemplo-cuerpo">
              <span class="ejemplo-separador">casa, coche</span>
              <span class="ejemplo-flecha">→</span>
              <span class="ejemplo-resultado">Se crea <b>1 alerta</b> con "casa, coche"</span>
            </div>
            <div class="ejemplo-descripcion">Usa <b>coma</b> (<span class="ejemplo-sep">,</span>) para una sola alerta con varias palabras.</div>
          </div>
        </div>
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
  text-align: center;
}

.info-separadores {
  font-size: 1rem;
  color: #444;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
}

.ejemplo-tarjeta {
  background: #f5f8ff;
  border: 1.5px solid #bfc9d9;
  border-radius: 12px;
  padding: 1em 1.2em;
  box-shadow: 0 2px 8px 0 #e3e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  min-width: 400px;
  max-width: 500px;
  flex: 1 1 0;
}

.ejemplo-titulo {
  font-weight: 600;
  color: #2a4d8f;
  font-size: 1.08em;
  margin-bottom: 0.2em;
  display: flex;
  align-items: center;
  gap: 0.4em;
}

.ejemplo-cuerpo {
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-size: 1.05em;
  margin-bottom: 0.1em;
}

.ejemplo-separador {
  background: #e3e8f0;
  color: #2a4d8f;
  border-radius: 8px;
  padding: 0.15em 0.7em;
  font-size: 1em;
  border: 1px solid #bfc9d9;
  font-family: 'Fira Mono', 'Consolas', monospace;
}

.ejemplo-flecha {
  font-size: 1.2em;
  color: #888;
  margin: 0 0.2em;
}

.ejemplo-resultado {
  color: #007bff;
  font-weight: 500;
}

.ejemplo-descripcion {
  font-size: 0.97em;
  color: #666;
  margin-top: 0.1em;
}

.ejemplo-sep {
  color: #007bff;
  font-weight: bold;
}
</style>
