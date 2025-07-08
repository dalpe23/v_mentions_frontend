<template>
  <transition-group name="msg-fade" tag="div" class="messages-container">
    <div v-for="(message, index) in messages" :key="message + index" class="alert-message">
      <span>{{ message }}</span>
      <button type="button" class="btn-close" @click="borrarMensajes(index)">×</button>
    </div>
  </transition-group>
</template>

<style scoped>
.messages-container {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

.alert-message {
  min-width: 280px;
  max-width: 90vw;
  background: linear-gradient(90deg, #00a0c0 60%, #00c0a0 100%);
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.18);
  padding: 1rem 2.5rem 1rem 1.2rem;
  margin-bottom: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  position: relative;
  opacity: 0.97;
  pointer-events: auto;
  animation: msg-pop-in 0.4s cubic-bezier(.68,-0.55,.27,1.55);
}

@keyframes msg-pop-in {
  0% { transform: scale(0.8) translateY(-30px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 0.97; }
}

.msg-fade-enter-active, .msg-fade-leave-active {
  transition: all 0.5s cubic-bezier(.68,-0.55,.27,1.55);
}
.msg-fade-enter-from, .msg-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

.btn-close {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  pointer-events: auto;
}
.btn-close:hover {
  opacity: 1;
}
</style>

<script>
import { useDataStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    name: 'AppMessages',
    computed: {
        ...mapState(useDataStore, ['messages']),
    },
    methods: {
        ...mapActions(useDataStore, ['borrarMensaje']),
        borrarMensajes(indice) {
            return this.borrarMensaje(indice)
        }
    },
    watch: {
      messages(newVal, oldVal) {
        if (newVal.length > 0) {
          setTimeout(() => {
            if (this.messages.length > 0) this.borrarMensaje(0)
          }, 3500)
        }
      }
    }
}
</script>