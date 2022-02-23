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
];

const router = createRouter({
  history: createWebHistory('/Vue3-week5/'),
  routes,
});

export default router;
