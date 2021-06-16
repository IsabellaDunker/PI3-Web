import Vue from 'vue';
import Vuex from 'vuex';
import authService from '../services/auth';
import userService from '../services/user';
import environmentService from '../services/environment';
import productService from '../services/product';
import orderService from '../services/order';
import tabService from '../services/tab';

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
    orders: {
      orders: null,
      tabs: null,
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
    SET_ORDERS_ORDERS(state, orders) {
      state.orders.orders = orders;
    },
    SET_ORDERS_TABS(state, tabs) {
      state.orders.tabs = tabs;
    },
    SET_ORDERS_PRODUCTS(state, products) {
      state.orders.products = products;
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
    async orders_fetchOrder({ commit }) {
      const orders = await orderService.get();
      commit('SET_ORDERS_ORDERS', orders.data);
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
    async orders_deleteOrder({ commit }, order) {
      await orderService.remove(order);
      const orders = await orderService.get();
      commit('SET_ORDERS_ORDERS', orders.data);
    },
    // UPDATE
    async products_updateProduct({ commit }, product) {
      await productService.update(product);
      const products = await productService.get();
      commit('SET_PRODUCTS_PRODUCTS', products.data);
    },
    async environments_updateEnvironment({ commit }, environment) {
      await environmentService.update(environment);
      const environments = await environmentService.get();
      commit('SET_ENVIRONMENTS_ENVIRONMENTS', environments.data);
    },
    async orders_updateOrder({ commit }, order) {
      await orderService.update(order);
      const orders = await orderService.get();
      commit('SET_ORDERS_ORDERS', orders.data);
    },
    // CREATE
    async products_createProduct({ commit }, product) {
      await productService.create(product);
      const products = await productService.get();
      commit('SET_PRODUCTS_PRODUCTS', products.data);
    },
    async environments_createEnvironment({ commit }, environment) {
      await environmentService.create(environment);
      const environments = await environmentService.get();
      commit('SET_ENVIRONMENTS_ENVIRONMENTS', environments.data);
    },
    async orders_makeOrder({ commit }, order) {
      await orderService.create(order);
      const orders = await orderService.get();
      commit('SET_ORDERS_ORDERS', orders.data);
    },
    async orders_fetchTabs({ commit }) {
      const tabs = await tabService.get();
      commit('SET_ORDERS_TABS', tabs.data);
    },
    async orders_createTab(_, userId) {
      await tabService.create({ user_id: userId });
    },
    async orders_fetchProduct({ commit }) {
      const products = await productService.get();
      commit('SET_ORDERS_PRODUCTS', products.data);
    },
  },
  modules: {
  },
});
