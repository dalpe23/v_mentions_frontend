<script>
export default {
  name: "WelcomeView",
};
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <img src="/playa.jpg" alt="Playa de Valencia" class="playa-image" />
      <h1>¡Bienvenido al portal de alertas!</h1>
    </main>
  </div>
</template>

<style scoped>
/* Animación para la imagen */
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%); /* Comienza fuera de la pantalla por la izquierda */
    opacity: 0; /* Comienza completamente transparente */
  }
  to {
    transform: translateX(0); /* Termina en su posición original */
    opacity: 1; /* Termina completamente visible */
  }
}

.playa-image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  animation: slideInFromLeft 1.5s ease-out; /* Aplica la animación */
}
h1 {
  font-size: 4rem;
  color: #333;
  text-align: center;
  margin-top: 1rem;
  }
</style>