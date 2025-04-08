<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <aside class="sidebar">
      <RouterLink to="/welcome">
        <img src="/nologo.png" alt="logo" class="logo" />
      </RouterLink>
        <RouterLink to="/alertas">Alertas</RouterLink>
        <RouterLink to="/nueva-alerta">Nueva Alerta</RouterLink>
        <RouterLink to="/usuario">Usuario</RouterLink>
    </aside>

  <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; 
}


.logo {
  width: 80%;
  height: auto;
  margin-bottom: 1rem;
}

.sidebar {
  background-color: #2d2f33;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin: 0; 
  flex: 0 0 20%; 
}


.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden; 
  width: 100vw; 
  max-width: 100vw; 
  max-height: 100vh;
}

.sidebar a {
  margin: 0; 
  padding: 0.5rem 0;
  text-decoration: none;
  color: white;
}

.main-content {
  width: 100vw;
  background-color: #fff;
  padding: 2rem;
  overflow-y: auto;
}
.main-content h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.sidebar a.router-link-active {
  font-weight: bold;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #fff;
  color: black; 
}




</style>
