const permissions = [{
  role: 'admin',
  routes: []
}, {
  role: 'editor',
  routes: ['/index', '/icon','/userSystem/setting'],
}]
module.exports = [{
  url: '/route/getRoleRoute',
  type: 'get',
  response: config => {
    let { role } = config.query;
    const accessedRoutes = permissions.find(v => v.role === role)['routes']
    return {
      code: 200,
      data: accessedRoutes,
      message: '路由获取成功'
    }
  }
}]