import Vue from 'vue';
import Vuex from 'vuex';
import authService from '../services/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    auth: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTH(state, auth) {
      state.auth = auth;
    },
  },
  actions: {
    async login({ commit }, { cpf, password }) {
      const { auth, user } = await authService.login(cpf, password);
      commit('SET_AUTH', auth);
      commit('SET_USER', user);
    },
  },
  modules: {
  },
});
