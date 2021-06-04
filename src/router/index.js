import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import UsersList from '../views/Users/List.vue';
import EnvironmentsList from '../views/Environments/Environment.vue';
import ProductsList from '../views/Products/Product.vue';
import authService from '../services/auth';
import api from '../services/api';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users',
    name: 'UsersList',
    component: UsersList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/environments',
    name: 'EnvironmentsList',
    component: EnvironmentsList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/products',
    name: 'ProductsList',
    component: ProductsList,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const token = localStorage.getItem('token');
      try {
        api.defaults.headers['x-access-token'] = token;
        await authService.renew();
        next();
      } catch {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath },
        });
      }
    }
  } else {
    next();
  }
});

export default router;
