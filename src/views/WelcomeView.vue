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
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%); 
    opacity: 0; 
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.playa-image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  animation: slideInFromLeft 1.5s ease-out; 
}
h1 {
  font-size: 4rem;
  color: #333;
  text-align: center;
  margin-top: 1rem;
  }
</style>