import { getCloudBaseAuth } from '@/api/user';
import { app, auth, db } from '@/lib/cloudbase.js';
const state = {
    ready: false
}
const mutations = {
    setState(state, ready) {
        state.ready = ready;
    }
}

const actions = {
    async login({ commit }, { userID }) {
        let { data: ticket } = await getCloudBaseAuth(userID);
        if (ticket) {
            await auth.customAuthProvider().signIn(ticket)
            commit("setState", true);
        }
    },
    callFunction(context, { name, data }) {
        return new Promise((resolve, reject) => {
            app.callFunction({
                name,
                data
            }).then(({ result }) => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    },
    async access(context, { name, params }) {
        let data = await db.collection(name).where({ ...params }).get();
        return data;
    },
    async logout({ commit }) {
        await auth.signOut();
        commit('setState', false);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}