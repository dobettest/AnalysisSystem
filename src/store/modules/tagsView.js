import { getCache, setCache } from '@/utils/session'
import { objEqual } from '@/utils';
const state = {
  tagList: getCache('tagList') || [
    {
      name: 'dashboard',
      meta: {
        title: '仪表盘',
      },
      params: {
        name: 'default'
      }
    }
  ]
};

const mutations = {
  ADD_TAGS(state, route) {
    const index = state.tagList.findIndex(item => objEqual(item, route));
    if (index == -1) {
      state.tagList.push(route);
      setCache('tagList', state.tagList);
    }
  },
  REMOVE_TAGS(state, route) {
    const index = state.tagList.findIndex(item => objEqual(item, route));
    state.tagList.splice(index, 1);
    setCache('tagList', state.tagList);
  },
  CLEAR_TAGS(state) {
    state.tagList = [
      {
        name: 'dashboard',
        meta: {
          title: '仪表盘'
        },
        params: {
          name: 'default'
        }
      }
    ];
    setCache('tagList', state.tagList);
  }
};

const actions = {
  addTag({ commit }, route) {
    commit('ADD_TAGS', route);
  },
  removeTag({ state, commit }, route) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_TAGS', route);
      resolve(state.tagList);
    });
  },
  clearTag({ commit }) {
    commit('CLEAR_TAGS');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
