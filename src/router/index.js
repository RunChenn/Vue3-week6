import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../pages/index.vue'),
    meta: {
      layout: 'index',
    },
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/login.vue'),
    meta: {
      layout: 'Login',
    },
  },
  {
    path: '/',
    name: 'Products',
    component: () => import('../pages/Products.vue'),
    meta: {
      layout: 'products',
    },
  },
];

const router = createRouter({
  history: createWebHistory('/Vue3-week5/'),
  routes,
});

export default router;
