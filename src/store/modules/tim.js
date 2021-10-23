import tim from '@/lib/tim.js';
const state = {
    ready: false,
    userInfo: null,
    conversationList: [],
    friendList: [],
    unread: 100,
    status: 'error'
}
const mutations = {
    setState(state, ready) {
        state.ready = ready;
    },
    setStatus(state, status) {
        state.status = status;
    },
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    }
}

const actions = {
    setState({ commit }, ready) {
        return new Promise((resolve, reject) => {
            commit("setState", ready);
            resolve();
        })
    },
    async setStatus({ commit }, status) {
        await commit('setStatus', status)
    },
    async login({ commit, dispatch }, { userID }) {
        let { userSign } = await dispatch('cloudbase/callFunction', {
            name: "tim-login",
            data: {
                userID
            }
        }, {
            root: true
        })
        await tim.login(({ userID, userSig: userSign }));
    },
    async logout({ commit }) {
        await tim.logout();
        commit('setStatus', 'error');
        commit('setState', false);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}