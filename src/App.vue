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
      <RouterLink to="/alertas">Alertas</RouterLink>
      <RouterLink to="/menciones">Menciones</RouterLink>
      <RouterLink to="/nueva-alerta">Nueva Alerta</RouterLink>
      <RouterLink to="/usuario">Usuario</RouterLink>
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

.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.main-content {
  background-color: #fff;
  color: black;
  padding: 2rem;
  overflow-y: auto;
  overflow-x: auto;
}

.sidebar {
  width: 250px;
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
  margin: 0;
  padding: 0.5rem 0;
  text-decoration: none;
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

.no-sidebar {
  display: block;
}

.no-sidebar .main-content {
  width: 100vw;
  height: 100vh;
}
</style>
