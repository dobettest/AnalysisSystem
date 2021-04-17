const getters = {
  token: state => state.user.token,
  roles: state => state.user.accountInfo.username,
  baseRoute: state => state.permission.routes,
  options: state => state.dashboard.option
};
export default getters;
