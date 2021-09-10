const state = {
    token: '',
    userInfo: ''
}

const mutation = {
    setToken(state, token) {
        state.token = token;
    },
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    }
}

const actions = {
    setToken(commit, token) {
        commit("setToken", token)
    },
    setUserInfo(commit, userInfo) {
        commit("setUserInfo", userInfo)
    }
}

export default {
    namespaced: true,
    state,
    mutation,
    actions
}