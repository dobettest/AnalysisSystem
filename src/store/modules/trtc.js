import trtc from '@/lib/trtc-calling.js';
const state = {
    visible: false,
    userInfo: null,
    conversationList: [],
    conversationID: '',
    friendList: [],
    unread: 0,
    status: 'error'
}
const mutations = {
    setVisible(state, visible) {
        state.visible = visible;
    },
    setState(state, ready) {
        state.ready = ready;
    },
    setConversationID(state, conversationID) {
        state.conversationID = conversationID;
    },
    setStatus(state, status) {
        state.status = status;
    },
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    setConversationList(state, conversationList) {
        state.conversationList = conversationList;
    },
    setFriendList(state, friendList) {
        state.friendList = friendList;
    },
    setUnread(state, unread) {
        state.unread = unread;
    }
}

const actions = {
    setState({ commit }, ready) {
        return new Promise((resolve, reject) => {
            commit("setState", ready);
            resolve();
        })
    },
    setConversationID({ commit }, conversationID) {
        commit('setConversationID', conversationID)
    },
    setStatus({ commit }, status) {
        commit('setStatus', status)
    },
    login(context, { userID, userSig }) {
        trtc.login({ userID, userSig })
    },
    async logout({ commit }) {
        await trtc.logout();
        commit('setStatus', 'error');
        commit('setState', false);
    },
    setConversationList({ commit }, data) {
        let unread = data.reduce((a, b) => {
            return a + b['unreadCount']
        }, 0);
        commit('setUnread', unread);
        console.log('unread', unread)
        commit("setConversationList", data);
    },
    setFriendList({ commit }, data) {
        commit("setFriendList", data)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}