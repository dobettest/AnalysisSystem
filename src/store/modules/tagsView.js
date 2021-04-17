/*
 * @Author: your name
 * @Date: 2021-03-21 19:28:18
 * @LastEditTime: 2021-04-03 21:49:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-antd-admin\src\store\modules\tagsView.js
 */
const state = {
  tagList: [
    {
      path: '/dashboard',
      meta: {
        title: '仪表盘'
      }
    }
  ]
};

const mutations = {
  ADD_TAGS(state, route) {
    const index = state.tagList.findIndex(item => item.path == route.path);
    if (index == -1) {
      state.tagList.push({
        ...route
      });
    }
  },
  REMOVE_TAGS(state, path) {
    const index = state.tagList.findIndex(item => item.path == path);
    state.tagList.splice(index, 1);
  },
  CLEAR_TAGS(state) {
    state.tagList = [
      {
        path: '/dashboard',
        meta: {
          title: '仪表盘'
        }
      }
    ];
  }
};

const actions = {
  addTag({ commit }, route) {
    commit('ADD_TAGS', route);
  },
  removeTag({ state, commit }, path) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_TAGS', path);
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
