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

  data() {
    return {
      mostrarSidebar: false,
      windowWidth: window.innerWidth
    };
  },

  computed: {
    route() {
      return this.$route;
    },
    screenIsWide() {
      return this.windowWidth > 768;
    }
  },

  methods: {
    ...mapActions(useDataStore, ["fetchAlertas", "fetchMenciones"]),
    toggleSidebar() {
      this.mostrarSidebar = !this.mostrarSidebar;
    },
    updateWidth() {
      this.windowWidth = window.innerWidth;
      if (this.screenIsWide) this.mostrarSidebar = false;
    }
  },

  async mounted() {
    await this.fetchAlertas();
    await this.fetchMenciones();
    window.addEventListener('resize', this.updateWidth);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }
};
</script>


<template>
  <div class="app-container" :class="{ 'no-sidebar': route.path === '/' }">
    
    <button class="hamburger" @click="toggleSidebar" v-if="route.path !== '/' && !screenIsWide && !mostrarSidebar">
      <i class="bi bi-list"></i>
    </button>

    <!-- Overlay para cerrar el sidebar en móvil -->
    <div class="sidebar-overlay" v-if="mostrarSidebar && !screenIsWide" @click="toggleSidebar"></div>

    <aside :class="{ sidebar: true, 'sidebar-visible': mostrarSidebar || screenIsWide }" v-if="route.path !== '/'">
      <RouterLink to="/welcome" @click="screenIsWide ? null : mostrarSidebar = false">
        <img src="/VMentions.png" alt="logo" class="logo" />
      </RouterLink>
      <RouterLink to="/menciones" @click="screenIsWide ? null : mostrarSidebar = false">
        <img src="/mencionar.png" alt="Menciones" class="sidebar-icon" /> Menciones
      </RouterLink>
      <RouterLink to="/alertas" @click="screenIsWide ? null : mostrarSidebar = false">
        <img src="/agregar-alerta.png" alt="Alertas" class="sidebar-icon" /> Alertas
      </RouterLink>
      <RouterLink to="/nueva-alerta" @click="screenIsWide ? null : mostrarSidebar = false">
        <img src="/anadir-alarma.png" alt="Nueva Alerta" class="sidebar-icon" /> Nueva Alerta
      </RouterLink>
      <RouterLink to="/usuario" @click="screenIsWide ? null : mostrarSidebar = false">
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

html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.sidebar {
  flex-shrink: 0;
  height: 100vh;
  width: 300px;
  background-color: #2d2f33;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
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
  height: 100vh;
  width: 100%;
  margin-left: 300px;
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
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
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

.hamburger {
  display: block;
  position: absolute;
  top: 30px; 
  left: 24px; 
  font-size: 2rem;
  background: none;
  border: none;
  color: #333;
  z-index: 1001;
}

@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    width: 180px;
    font-size: 16px;
    padding: 2.5rem 0.5rem 1.2rem 0.7rem; 
    margin-top: env(safe-area-inset-top, 20px); 
    box-sizing: border-box;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1);
    opacity: 0;
    pointer-events: none;
  }
  .sidebar.sidebar-visible {
    display: flex;
    transform: translateX(0) !important;
    opacity: 1;
    pointer-events: auto;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .main-content {
    padding: 1rem;
    padding-top: 3rem;
    margin-left: 0;
  }

  .sidebar .logo {
    width: 95%;
    max-width: 150px;
    margin-left: 0.2rem;
    margin-bottom: 1.5rem;
  }
  .sidebar a {
    font-size: 15px;
    gap: 8px;
    padding: 5px 0;
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  z-index: 999;
}
</style>
