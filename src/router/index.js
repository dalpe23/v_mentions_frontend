import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AnadirAlerta from '@/views/AnadirAlerta.vue'
import WelcomeView from '../views/WelcomeView.vue'
import MencionesView from '@/views/MencionesView.vue'
import AlertasView from '@/views/AlertasView.vue'
import UsuarioView from '@/views/UsuarioView.vue'
import AnadirCliente from '@/views/AnadirCliente.vue'
import ClientesView from '@/views/ClientesView.vue'
import CambiarSentimiento from '@/views/CambiarSentimiento.vue'

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
      path: '/alertas/:id/menciones',
      name: 'menciones-alerta',
      component: MencionesView,
      props: true,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/menciones',
      name: 'menciones',
      component: MencionesView,
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
    {
      path: '/anadir-cliente',
      name: 'anadir-cliente',
      component: AnadirCliente,
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClientesView,
    },
    {
      path: '/menciones/:id',
      name: 'menciones-id',
      component: CambiarSentimiento,
      props: true,
    }
  ],
})
// Si hay usuario en localStorage y la ruta es login, redirigir a welcome
router.beforeEach((to, from, next) => {
  const usuarioData = localStorage.getItem('usuario');
  if (usuarioData && to.name === 'login') {
    next({ name: 'welcome' });
  } else {
    next();
  }
});

// Si no hay usuario en localStorage y la ruta es diferente de login, redirigir a login
router.beforeEach((to, from, next) => {
  const usuarioData = localStorage.getItem('usuario');
  if (!usuarioData && to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
