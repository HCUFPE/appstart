import { createRouter, createWebHistory, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';

import Exemplos from '../views/Exemplos.vue';
import Pacientes from '../views/Pacientes.vue';
import Solicitacoes from '../views/Solicitacoes.vue';
import Altas from '../views/Altas.vue';

const routes = [
  {
    path: '/',
    name: 'Leitos',
    component: Home,
    meta: { title: 'Gestao de Leitos da UTI' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'LoginLayout' },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true },
  },

  {
    path: '/exemplos',
    name: 'Exemplos',
    component: Exemplos,
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: Pacientes,
    meta: { requiresAuth: true },
  },
  {
    path: '/solicitacoes',
    name: 'Solicitacoes',
    component: Solicitacoes,
    meta: { title: 'Solicitacoes de Vaga' },
  },
  {
    path: '/altas',
    name: 'Altas',
    component: Altas,
    meta: { title: 'Solicitacoes de Alta' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'bg-paper-active-link',
  linkExactActiveClass: 'bg-paper-active-link',
});

router.beforeEach((to, _from, next: NavigationGuardNext) => {
  // Pinia store must be used inside a function to ensure it's initialized
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
