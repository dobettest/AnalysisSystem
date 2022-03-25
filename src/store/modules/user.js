import { getCache, setCache, removeCache } from '@/utils/session';
import { login, logout, getUserInfo, loginByPhone, getWorkstations, createTimTicket } from '@/api/user';
const state = {
  accountInfo: null,
  token: getCache('TOKEN') || '',
  userSig: ''
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setUserInfo(state, userInfo) {
    state.accountInfo = userInfo;
  },
  setUserSig(state, userSig) {
    state.userSig = userSig;
  }
};

const actions = {
  async login({ commit }, userInfo) {
    try {
      let token = await login(userInfo)
      commit('setToken', token);
      setCache('TOKEN', token);
      return token;
    } catch (error) {
      return null;
    }
  },
  async createTimTicket({ commit, state }) {
    let userSig = await createTimTicket({ userID: state['accountInfo']['userID'] });
    commit('setUserSig', userSig)
  },
  async getWorkstations({ commit, state }) {
    let roles = await getWorkstations(state.accountInfo['roles']);
    commit('role/setRoles', roles, { root: true });
    commit('role/setCurrentRole', roles[0], { root: true })
  },
  async loginByPhone({ commit }, data) {
    try {
      let token = await loginByPhone(data);
      if (token) {
        commit('setToken', token);
        setCache('TOKEN', token);
      }
      return token;
    } catch (error) {
      return null;
    }
  },
  async logout({ commit, dispatch }) {
    commit('setToken', '');
    commit('setUserInfo', '');
    await removeCache('TOKEN');
    await dispatch("trtc/logout", null, { root: true });
    await dispatch("tim/logout", null, { root: true });
  },

  async getUserInfo({ commit }) {
    try {
      var user = await getUserInfo();
      commit('setUserInfo', user);
      return user;
    } catch (error) {
      console.log(error)
      return null;
    }
  },

  async updateInfo({ commit }, userInfo) {
    try {
      commit('setUserInfo', userInfo);
    } catch (error) {
      return null;
    }
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
