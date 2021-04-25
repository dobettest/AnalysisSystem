import { getCache, setCache, removeCache } from '@/utils/session';
import { login, logout, getCodeTest, getInfo, getDbList, getDashList } from '@/api/user';
import { resetRouter, baseRoute } from '@/router';
const state = {
  accountInfo: getCache('USER_INFO') || null,
  token: getCache('TOKEN') || '',
  dbList: getCache('DB_LIST') || null,
  dashList: getCache('DASH_LIST') || null,
  baseRoute
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER_INFO(state, userInfo) {
    state.accountInfo = userInfo;
  },
  SET_DB_LIST(state, dbList) {
    state.dbList = dbList;
  },
  SET_DASH_LIST(state, dashList) {
    state.dashList = dashList;
  }
};

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(res => {
          const { data } = res;
          if (data) {
            commit('SET_USER_INFO', data);
            resolve(data);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  initDb({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      getDbList(userInfo)
        .then(res => {
          const { data } = res;
          if (data) {
            commit('SET_DB_LIST', data);
            setCache("DB_LIST", data)
          }
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  initDash({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      getDashList(userInfo)
        .then(res => {
          const { data } = res;
          if (data) {
            commit('SET_DASH_LIST', data);
            setCache("DASH_LIST", data)
          }
          resolve(res);
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
          const { data } = res;
          if (data) {
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

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_USERINFO', '');
          removeCache('USER_INFO');
          resetRouter();
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token })
        .then(res => {
          const { data } = res;
          if (data) {
            commit('SET_USERINFO', data);
          }
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  updateInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      commit('SET_USER_INFO', userInfo);
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
