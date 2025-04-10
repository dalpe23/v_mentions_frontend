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

.app-container {
  display: flex;
  width: 85vw;
  height: 100vh;
  overflow-x: hidden;
}

.main-content {
  flex-grow: 1;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.playa-image {
  width: 60%;
  height: auto;
  margin-bottom: 1rem;
  animation: slideInFromLeft 1.5s ease-out; 
}
h1 {
  font-size: 4rem;
  color: #333;
  text-align: left;
  margin-top: 1rem;
  }
</style>