import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AnadirAlerta from '@/views/AnadirAlerta.vue'
import WelcomeView from '../views/WelcomeView.vue'
import DetallesAlerta from '@/views/MencionesView.vue'
import AlertasView from '@/views/AlertasView.vue'
import UsuarioView from '@/views/UsuarioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/alertas',
      name: 'alertas',
      component: AlertasView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/menciones',
      name: 'menciones',
      component: DetallesAlerta,
      //props: true,
    },
    {
      path: '/nueva-alerta',
      name: 'anadir-alerta',
      component: AnadirAlerta,
    },
    {
      path: '/usuario',
      name: 'usuario',
      name: 'home',
      component: UsuarioView,
    },
  ],
})

export default router
