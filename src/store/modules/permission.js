import { baseRoute, asyncRoutes } from '@/router';
import { setCache } from '@/utils/session';
import router, { resetRouter } from '@/router';
import { getRoleRoute } from '@/api/route';
const state = {
  routes: []
};

const mutations = {
  SET_ROUTE(state, route) {
    state.routes = baseRoute.concat(route);
  }
};

const actions = {
  getRoute({ commit }, role) {
    return new Promise(async (resolve, reject) => {
      let accessedRoutes = [];
      if (role === 'admin') {
        accessedRoutes = asyncRoutes;
      }
      else {
        const res = await getRoleRoute({ role })
        const { data: permissions } = res;
        accessedRoutes = await filterAsyncRoute(asyncRoutes, permissions);
        console.log("access", accessedRoutes, accessedRoutes.length)
      }
      commit("SET_ROUTE", accessedRoutes)
      resolve(accessedRoutes)
    })

  },
  async changeRole({ commit, dispatch }, role) {
    const token = role + '20201013';
    commit('user/SET_TOKEN', token, { root: true });
    setCache('TOKEN', token);
    await dispatch('user/getInfo', token, { root: true });
    resetRouter();
    const accessedRoutes = await dispatch('getRoute', role);
    router.addRoutes(accessedRoutes);
    await dispatch('tagsView/clearTag', null, { root: true });
  }
};

export async function filterAsyncRoute(asyncRoutes, accessRoutes) {
  let arr = [];
  await Promise.all(asyncRoutes.map(async (item) => {
    const temp = { ...item };
    let flag=await isAccess(temp, accessRoutes)
    if (temp?.children) {
      temp.children = await filterAsyncRoute(temp.children, accessRoutes);
    }
    flag && arr.push(temp)
  }))
  return Promise.resolve(arr)
}
export async function isAccess(route, accessRoutes) {
  if (route?.children) {
    let arr = route.children.map(v => isAccess(v, accessRoutes))
    let res = await Promise.all(arr);
    return Promise.resolve(res.indexOf(true) !== -1)
  }
  return Promise.resolve(accessRoutes.some((v) => v === route.path));
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
