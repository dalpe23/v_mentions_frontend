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
    this.fetchMenciones();
    this.fetchAlertas();
  },
};
</script>

<template>
  <div class="admin-panel">
    <div class="welcome-vertical">
      <img src="/VMentionsBlack.png" alt="Playa de Valencia" class="playa-image" />
      <h1>¡Bienvenido al portal de alertas!</h1>
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
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 2rem;
  text-align: center;
  background-image: url('/fondo.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.content-container {
  display: none;
}

.welcome-vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}

.playa-image {
  width: 100%;
  max-width: 800px;
  height: auto;
  animation: slideInFromTop 1.5s ease-out;
  margin-bottom: 1rem;
  border-radius: 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-top: 0.5rem;
  color: #222;
  text-align: center;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  width: 100%;
}

.card {
  background-color: #fff;
  width: 250px;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
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

.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 80vw;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  padding: 2rem;
}

.welcome-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.welcome-text {
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .admin-panel {
    background-image: url('/fondo-movil.png');

  }
  .welcome-vertical {
    gap: 0.7rem;
  }
  .cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.7rem;
    width: 100%;
    max-width: 100vw;
    justify-items: center;
    align-items: center;
  }
  .card {
    width: 44vw;
    max-width: 180px;
    min-width: 120px;
    padding: 0.7rem;
    margin: 0;
  }
  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>