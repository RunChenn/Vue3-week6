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
  history: createWebHistory(),
  routes,
});

export default router;
