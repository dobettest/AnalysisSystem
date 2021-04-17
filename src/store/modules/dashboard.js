const state = {
  option: {}
};
const mutations = {
  store: (state, option) => {
    state.option = option;
  }
};
const actions = {
  storeOption({ commit }, options) {
    commit('store', options);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
