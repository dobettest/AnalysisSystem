import { getCache, setCache, removeCache } from '@/utils/session';
import { login, logout, getCodeTest, getInfo } from '@/api/user';
import router, { resetRouter } from '@/router';
const state = {
  accountInfo: null,
  token: getCache('TOKEN') || ''
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USERINFO(state, userInfo) {
    state.accountInfo = userInfo;
  }
};

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(res => {
          const { data, code } = res;
          if (code === 200) {
            commit('SET_TOKEN', data.token);
            setCache('TOKEN', data.token);
          }
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  codeTest({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      getCodeTest(userInfo)
        .then(res => {
          const {
            data: { token }
          } = res;
          //console.log("codeTest",res,token)
          if (token) {
            // console.log("codeTest")
            commit('SET_TOKEN', token);
            setCache('TOKEN', token);
          }
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async logout({ commit, dispatch }) {
    await logout()
    commit('SET_TOKEN', '');
    commit('SET_USERINFO', '');
    await removeCache('TOKEN');
    await dispatch("cloudbase/logout", null, { root: true });
    await dispatch("tim/logout", null, { root: true });
    await resetRouter();
  },

  async getUserInfo({ commit }) {
    try {
      var res = await getInfo();
      const {
        data: { info },
        message
      } = res;
      if (info) {
        commit('SET_USERINFO', info);
        return info;
      }
      return message;
    } catch (error) {
      return error;
    }
  },

  updateInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      commit('SET_USERINFO', userInfo);
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
