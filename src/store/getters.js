const getters = {
  token: state => state.user.token,
  asyncRoutes: state => state.role.asyncRoutes,
  userInfo: state => state.user.accountInfo,
  currentRole:state=>state.role.currentRole,
  userSig:state=>state.user.userSig
};
export default getters;