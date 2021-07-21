const permissions = [{
  role: 'admin',
  routes: []
}, {
  role: 'custom',
  routes: ['/index', '/icon','/userSystem/setting','/userSystem/userInfo','/components/webSocket'],
}]
module.exports = [{
  url: '/route/getRoleRoute',
  type: 'get',
  response: config => {
    console.log(config.query,config.body)
    let { role } = config.query;
    const accessedRoutes = permissions.find(v => v.role === role)['routes']
    return {
      code: 200,
      data: accessedRoutes,
      message: '路由获取成功'
    }
  }
}]