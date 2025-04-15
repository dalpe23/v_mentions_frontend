<script>
import { useDataStore } from '@/stores/store';
import { mapActions, mapState } from 'pinia';
export default {
  name: "WelcomeView",
  methods: {
    ...mapActions(useDataStore, ["fetchAlertas", "fetchMenciones"]),
  },
  computed: {
    ...mapState(useDataStore, ["totalAlertas", "totalMenciones", "mencionesPositivas", "mencionesNegativas"]),
  },
  async mounted() {
    //this.fetchMenciones();
  },
};
</script>

<template>
  <div class="admin-panel">
    <div class="content-container">
      <div class="image-container">
        <img src="/playa.jpg" alt="Playa de Valencia" class="playa-image" />
        <h1>¡Bienvenido al portal de alertas!</h1>
      </div>

      <div class="cards-container">
        <div class="card">
          <span class="icon">🚨</span>
          <p>Número de alertas</p>
          <h2>{{ totalAlertas }}</h2>
        </div>
        <div class="card">
          <span class="icon">🗒️</span>
          <p>Número de menciones</p>
          <h2>{{ totalMenciones }}</h2>
        </div>
        <div class="card">
          <span class="icon">👍</span>
          <p>Menciones positivas</p>
          <h2>{{ mencionesPositivas }}</h2>
        </div>
        <div class="card">
          <span class="icon">👎</span>
          <p>Menciones negativas</p>
          <h2>{{ mencionesNegativas }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

@keyframes slideInFromTop {
  from {
    transform: translateY(-100%); 
    opacity: 0; 
  }
  to {
    transform: translateY(0);
    opacity: 1; 
  }
}

.admin-panel {
  width: 90%;
  height: 100%;
  margin: auto;
  padding: 2rem;
  text-align: center;
  
}

.content-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  height: 100%;
  width: 100%;
}

.image-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.playa-image {
  width: 100%;
  max-width: 800px; 
  height: auto;
  animation: slideInFromTop 1.5s ease-out; 
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-top: 1rem;
  color: #222;
}

.cards-container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: flex-start;
}

.card {
  background-color: #fff;
  width: 250px;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: block;
}

.card p {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 0.2rem;
}

.card h2 {
  font-size: 2rem;
  color: #111;
}
</style>