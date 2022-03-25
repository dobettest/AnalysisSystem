import { getCloudBaseAuth } from '@/api/user';
import cloudbaseService from '../../lib/cloudbase';
const state = {
    ready: false,
    currentPath: '',
    uploadList: []
}
const mutations = {
    setState(state, ready) {
        state.ready = ready;
    },
    setCurrentPath(state, path) {
        state.currentPath = path;
    },
    setUploadList(state, list) {
        state.uploadList = list;
    }
}

const actions = {
    setCurrentPath({ commit }, path) {
        commit('setCurrentPath', path);
    },
    async login({ commit, rootGetters }) {
        let { currentRole } = rootGetters;
        let { envID } = currentRole;
        console.log('currentRole',currentRole)
        await cloudbaseService.init(envID, "ap-guangzhou");
        let ticket = await getCloudBaseAuth({ envID });
        await cloudbaseService.login(ticket);
        commit('setState', true)
    },
    /**
     * 
     * @param {name} 数据库 
     * @param {*} 查询参数 
     * @returns 查询结果
     */
    async access(context, { name, params, skip, limit, orderBy: { field, orderType } }) {
        let { data } = await db.collection(name).where({ ...params }).orderBy(field, orderType).skip(skip).limit(limit).get();
        console.log(data, { name, params, skip, limit, orderBy: { field, orderType } })
        return data;
    },
    async remove(context, { name, params }) {
        let data = await db.collection(name).where({ ...params }).remove();
        return data;
    },
    async create(context, { name, params }) {
        let data = await db.collection(name).add(params);
        return data;
    },
    async update(context, { name, where, newVal }) {
        console.log('up', name, where, newVal)
        let data = await db.collection(name).where(where).update(newVal);
        return data;
    },
    async logout({ commit }) {
        await authorized.signOut();
        commit('setState', false);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}