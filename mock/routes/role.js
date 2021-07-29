const router = require("express").Router()
const roleData = [{
    id: parseInt(Math.random() * 1000000000000),
    text: '系统管理员，拥有所有权限',
    role: 'admin',
    routes: []
}, {
    id: parseInt(Math.random() * 1000000000000),
    role: 'custom',
    text: '自定义权限，权限由管理员去定义',
    routes: ['/index', '/echarts/bar', '/icon', '/userSystem/setting', '/userSystem/userInfo'],
}]
router.post('/roleList', (req, res, next) => {
    res.json({
        data: roleData,
        code: 200,
        message: '角色table获取成功！'
    })
})
router.post('/roleDel', (req, res, next) => {

})
router.post('/roleUpdate', (req, res, next) => {
    const { body: nl } = req;
    roleData.forEach(item => {
        if (item.id == nl['id']) {
            Object.assign(item, nl);
        }
    });
    res.json({
        code: 200,
        data: null,
        message: '修改成功！'
    });
})
router.post('/roleAdd', (req, res, next) => {
    let { body: nl } = req;
    nl["id"] = parseInt(Math.random() * 1000000000000);
    roleData.push(nl);
    res.json({
        code: 200,
        data: null,
        message: "角色添加成功"
    })
})
router.post('/roleReset', (req, res, next) => {

})
router.get("/roleAccess", (req, res, next) => {
    let { query: { role } } = req;
    role = roleData.find(v => v.role === role);
    const accessedRoutes = role['routes']
    res.json({
        code: 200,
        data: accessedRoutes,
        message: '路由获取成功'
    })
})
module.exports = router