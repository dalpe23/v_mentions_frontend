<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions } from "pinia";
import { useDataStore } from "@/stores/store";

export default {
  name: "Login",

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      form: {
        email: "",
        paswd: "",
      },
      mySchema: yup.object({
        email: yup
          .string()
          .email("Introduce un correo válido")
          .required("El correo es obligatorio"),
        paswd: yup.string().required("La contraseña es obligatoria"),
      }),
    };
  },

  methods: {
    ...mapActions(useDataStore, ["login", "fetchAlertas", "fetchMenciones"]),

    async handleSubmit() {
      const { email, paswd } = this.form;
      const user = await this.login(email, paswd);
      if (user) {
        await this.fetchAlertas();
        await this.fetchMenciones();
        this.$router.push({ name: "welcome" });
      } else {
        alert("email o contraseña incorrectos");
      }
    },  
  },
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/VMentionsBlack.png" alt="" srcset="" class="logo" />
      <Form id="loginForm" :validation-schema="mySchema" @submit="handleSubmit">
        <div class="form-group">
          <label for="email" class="form-label">Correo electrónico</label>
          <Field v-model="form.email" name="email" type="email" class="form-input" />
          <ErrorMessage name="email" class="form-error" />
        </div>

        <div class="form-group">
          <label for="paswd" class="form-label">Contraseña</label>
          <Field v-model="form.paswd" name="paswd" type="password" class="form-input" />
          <ErrorMessage name="paswd" class="form-error" />
        </div>

        <button type="submit" class="btn-submit">Acceder</button>
      </Form>
    </div>
  </div>
</template>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  margin: 0;
}

.login-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.login-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333333;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555555;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
  outline: none;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #007bff;
}

.form-error {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #0056b3;
}
.logo {
  width: 60%;
  height: auto;
  margin-bottom: 1rem;
}
</style>