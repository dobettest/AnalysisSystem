import router, { commonRoutes, asyncRoutes, resetRouter } from '@/router';
const state = {
  asyncRoutes: [],
  roles: [],
  currentRole:null
};
const mutations = {
  setRoles(state, roles) {
    // console.log('roles',roles)
    state.roles = roles;
  },
  setCurrentRole(state, role) {
    state.currentRole = role;
  },
  setRoutes(state, routes) {
    resetRouter();
    state.asyncRoutes = routes;
  },
  addRoutes(state, routes) {
    state.routes.push(routes)
  }
};

const actions = {
  getServices({ commit }) {
      commit("setRoutes", commonRoutes);
  },
  addRoutes({ commit }, routes) {
    commit('addRoutes', routes)
  }
};
export async function filterAsyncRoute(asyncRoutes, accessRoutes) {
  let arr = [];
  await Promise.all(
    asyncRoutes.map(async item => {
      const temp = { ...item };
      let flag = await isAccess(temp, accessRoutes);
      if (temp?.children) {
        temp.children = await filterAsyncRoute(temp.children, accessRoutes);
      }
      flag && arr.push(temp);
    })
  );
  return arr;
}
export async function isAccess(route, accessRoutes) {
  if (route?.children) {
    let arr = route.children.map(v => isAccess(v, accessRoutes));
    let res = await Promise.all(arr);
    return res.indexOf(true) !== -1;
  }
  return accessRoutes.some(v => route.path === v || route.path === '*');
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
