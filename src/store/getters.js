const getters = {
  userInfo: state => state.user.accountInfo,
  dbList: state => state.user.dbList,
  baseRoute: state => state.permission.routes,
  dashList: state => state.user.dashList
};
export default getters;
