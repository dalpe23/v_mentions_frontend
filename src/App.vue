<script>
import { RouterLink, RouterView } from 'vue-router';
import { mapActions } from 'pinia';
import { useDataStore } from '@/stores/store';
import AppMessages from './components/AppMessages.vue';

export default {
  name: 'App',

  components: {
    AppMessages,
    RouterLink,
    RouterView
  },

  computed: {
    route() {
      return this.$route;
    }
  },

  methods: {
    ...mapActions(useDataStore, ["fetchAlertas", "fetchMenciones"]),
  },

  async mounted() {
    await this.fetchAlertas();
    await this.fetchMenciones();
  }
};
</script>

<template>
  <div class="app-container" :class="{ 'no-sidebar': route.path === '/' }">
 

    <aside v-if="route.path !== '/'" class="sidebar">
      <RouterLink to="/welcome">
        <img src="/VMentions.png" alt="logo" class="logo" />
      </RouterLink>
      <RouterLink to="/menciones">
        <img src="/mencionar.png" alt="Menciones" class="sidebar-icon" /> Menciones
      </RouterLink>
      <RouterLink to="/alertas">
        <img src="/agregar-alerta.png" alt="Alertas" class="sidebar-icon" /> Alertas
      </RouterLink>
      <RouterLink to="/nueva-alerta">
        <img src="/anadir-alarma.png" alt="Nueva Alerta" class="sidebar-icon" /> Nueva Alerta
      </RouterLink>
      <RouterLink to="/usuario">
        <img src="/avatar.png" alt="Usuario" class="sidebar-icon" /> Usuario
      </RouterLink>
    </aside>

    <main class="main-content">  
       <app-messages />
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  background-color: #fff;
  color: black;
  padding: 2rem;
  overflow-y: auto;
  overflow-x: auto;
  height: 100%;
  width: 100%;
}

.sidebar {
  flex-shrink: 0;
  height: auto; 
  width: 300px; 
  background-color: #2d2f33;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.logo {
  width: 80%;
  height: auto;
  margin-bottom: 1rem;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 5px 0;
  padding: 5px 0;
  text-decoration: none;
  font-size: 20px;
  color: white;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.sidebar a:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.sidebar a.router-link-active {
  font-weight: bold;
  }

.sidebar-icon {
  margin-left: 15px;
  width: 20px;
  height: 20px;
}

.no-sidebar {
  display: block;
}

.no-sidebar .main-content {
  width: 100vw;
  height: 100vh;
}
</style>
