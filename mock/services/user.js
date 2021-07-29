class userService {
    constructor() {
        this.userInfo = [
            {
                id: parseInt(Math.random() * 1000000000000),
                userID: '1364525216',
                username: 'admin',
                password: '123456',
                role: 'admin',
                date: '2020-10-13',
                phone: '17770831435',
                text: '系统管理员，拥有所有权限',
                location: 'Wuhan',
                job: '前端工程师',
                label: '暂无',
                skill: '暂无',
                avatar: 'one.jpg'
            },
            {
                id: parseInt(Math.random() * 1000000000000),
                userID: '1974793690',
                username: 'custom',
                password: '123456',
                role: 'custom',
                date: '2020-10-13',
                text: '测试工程师',
                location: 'Wuhan',
                job: '测试工程师',
                label: '暂无',
                skill: '暂无',
                avatar: 'two.jpg'
            }
        ];
    }
    query(q) {
        try {
            let u=this.userInfo.find(v=>{
                Object.keys(q).every(k=>{
                    return q[k]===v[k]
                })
            })
        } catch (error) {
            
        }
    }
}
module.exports = userService