import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../pages/Index.vue'),
        meta: {
          layout: 'index',
        },
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../pages/Products.vue'),
      },
      // {
      //   path: '/product/:id',
      //   name: '產品頁面',
      //   component: () => import('../pages/Product.vue'),
      // },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../pages/Cart.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: {
      layout: 'Login',
    },
  },
  // 後台
  {
    path: '/admin',
    component: () => import('../pages/admin/index.vue'),
    children: [
      {
        path: 'products',
        name: 'admin-Products',
        component: () => import('../pages/admin/Products.vue'),
      },
      {
        path: 'orders',
        name: 'admin-Orders',
        component: () => import('../pages/admin/Orders.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/Vue3-week6/'),
  // history: createWebHistory(),
  routes,
});

export default router;
