import { getCache, setCache, removeCache } from '@/utils/session';
import { login, logout, getCodeTest, getInfo } from '@/api/user';
import { resetRouter } from '@/router';
import tim from '@/lib/tim';
const state = {
  accountInfo: null,
  token: getCache('TOKEN') || '',
  userSign: getCache('SIGN') || ''
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USERINFO(state, userInfo) {
    state.accountInfo = userInfo;
  },
  SET_USERSIGN(state, userSign) {
    state.userSign = userSign;
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
          const { data: { token } } = res;
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

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_USERINFO', '');
          removeCache('TOKEN');
          resetRouter();
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  async getInfo({ commit, state }) {
    try {
      var res = await getInfo({ token: state.token });
      const { data: { info, userSig }, message } = res;
      if (info && userSig) {
        commit('SET_USERINFO', info);
        commit('SET_USERSIGN', userSig);
        await tim.login({
          userID: info.userID,
          userSig
        }).then((res) => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
        return Promise.resolve(info);
      }
      return Promise.reject(message);
    } catch (error) {
      return Promise.reject(error);
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
