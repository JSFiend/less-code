
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './route-config';

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

