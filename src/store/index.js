import Vue from 'vue';
import Vuex from 'vuex';
import authService from '../services/auth';
import userService from '../services/user';
import environmentService from '../services/environment';

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
    async users_fetchUsers({ commit }) {
      const users = await userService.get();
      commit('SET_USERS_USERS', users.data);
    },
    async environments_fetchEnvironments({ commit }) {
      const environments = await environmentService.get();
      commit('SET_ENVIRONMENTS_ENVIRONMENTS', environments.data);
    },
    async users_deleteUser({ commit }, user) {
      await userService.remove(user);
      const users = await userService.get();
      commit('SET_USERS_USERS', users.data);
    },
    async environments_deleteEnvironment({ commit }, environment) {
      await environmentService.remove(environment);
      const environments = await environmentService.get();
      commit('SET_ENVIRONMENTS_ENVIRONMENTS', environments.data);
    },
  },
  modules: {
  },
});
