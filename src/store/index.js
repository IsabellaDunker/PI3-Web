import Vue from 'vue';
import Vuex from 'vuex';
import authService from '../services/auth';
import userService from '../services/user';
import environmentService from '../services/environment';
import productService from '../services/product';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    auth: null,
    drawer: true,
    users: {
      users: null,
    },
    environments: {
      environments: null,
    },
    products: {
      products: null,
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTH(state, auth) {
      state.auth = auth;
    },
    SET_DRAWER(state, drawer) {
      state.drawer = drawer;
    },
    SET_USERS_USERS(state, users) {
      state.users.users = users;
    },
    SET_ENVIRONMENTS_ENVIRONMENTS(state, environments) {
      state.environments.environments = environments;
    },
    SET_PRODUCTS_PRODUCTS(state, products) {
      state.products.products = products;
    },
  },
  actions: {
    async login({ commit }, { cpf, password }) {
      const { auth, user } = await authService.login(cpf, password);
      commit('SET_AUTH', auth);
      commit('SET_USER', user);
    },
    setDrawer({ commit }, value) {
      commit('SET_DRAWER', value);
    },
    // FETCH
    async users_fetchUsers({ commit }) {
      const users = await userService.get();
      commit('SET_USERS_USERS', users.data);
    },
    async environments_fetchEnvironments({ commit }) {
      const environments = await environmentService.get();
      commit('SET_ENVIRONMENTS_ENVIRONMENTS', environments.data);
    },
    async products_fetchProduct({ commit }) {
      const products = await productService.get();
      commit('SET_PRODUCTS_PRODUCTS', products.data);
    },
    // DELETE
    async users_deleteUser({ commit }, user) {
      await userService.remove(user);
      const users = await userService.get();
      commit('SET_USERS_USERS', users.data);
    },
    async products_deleteProduct({ commit }, product) {
      await productService.remove(product);
      const products = await productService.get();
      commit('SET_PRODUCTS_PRODUCTS', products.data);
    },
    async environments_deleteEnvironment({ commit }, environment) {
      await environmentService.remove(environment);
      const environments = await environmentService.get();
      commit('SET_ENVIRONMENTS_ENVIRONMENTS', environments.data);
    },
    // UPDATE
    async products_updateProduct({ commit }, product) {
      await productService.update(product);
      const products = await productService.get();
      commit('SET_PRODUCTS_PRODUCTS', products.data);
    },
    // CREATE
    async products_createProduct({ commit }, product) {
      await productService.create(product);
      const products = await productService.get();
      commit('SET_PRODUCTS_PRODUCTS', products.data);
    },
  },
  modules: {
  },
});
