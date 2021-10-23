const getters = {
  token: state => state.user.token,
  roles: state => state.user.accountInfo.username,
  baseRoute: state => state.permission.routes,
  userInfo: state => state.user.accountInfo
};
export default getters;
