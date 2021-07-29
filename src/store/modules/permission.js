import router, { baseRoute, asyncRoutes,resetRouter } from '@/router';
import { setCache } from '@/utils/session';
import { getRoleRoute } from '@/api/roleManage';
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
        console.log("getRoute",res)
        const { data: permissions } = res;
        accessedRoutes = await filterAsyncRoute(asyncRoutes, permissions);
      }
      commit("SET_ROUTE", accessedRoutes)
      resolve(accessedRoutes)
    })

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
  return arr
}
export async function isAccess(route, accessRoutes) {
  if (route?.children) {
    let arr = route.children.map(v => isAccess(v, accessRoutes))
    let res = await Promise.all(arr);
    return res.indexOf(true) !== -1
  }
  return accessRoutes.some((v) =>route.path===v||route.path==='*');
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
