import { baseRoute } from '@/router';
const state = {
  routes: baseRoute
};

const mutations = {
  SET_ROUTE(state, route) {
    state.routes = route;
  }
};

const actions = {
  setRoute({ commit }, routes) {
    return new Promise((resolve, reject) => {
      commit('SET_ROUTE', routes);
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
