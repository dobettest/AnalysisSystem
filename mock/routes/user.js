const router = require("express").Router()
const TLSSigAPIv2 = require('tls-sig-api-v2');
const userInfo = [
    {
        id: parseInt(Math.random() * 1000000000000),
        userID: 'mym17770831435',
        username: 'mym17770831435',
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
        userID: 'mym18720787170',
        username: 'mym18720787170',
        password: '123456',
        phone: "18720787170",
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
const { redisStore } = require("../utils");
const codeStore = new redisStore(300000);
const tokens = new Map();
router.post("/userList", (req, res, next) => {
    const { body: { role, username, startTime, endTime } } = req;
    let list = userInfo;
    if (role) {
        list = filterTable(list, 'role', role);
    }
    if (username) {
        list = filterTable(list, 'username', username);
    }
    if (startTime && endTime) {
        list = filterTable(list, 'date', [startTime, endTime]);
    }

    res.json({
        data: list,
        code: 200,
        message: '用户table获取成功！'
    })
})
router.post("/userAdd", (req, res, next) => {

})
router.post("/userDel", (req, res, next) => {

})
router.post("/userUpdate", (req, res, next) => {
    const { body: nl } = req;
    userInfo.forEach(item => {
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
router.post("/query", (req, res, next) => {
    try {
        let q = req.body;
        let u = userInfo.find(v => {
            return Object.keys(q).every(k => {
                return q[k] === v[k]
            })
        })
        res.json({
            code: 200,
            data: u,
            message: "用户查询成功"
        })
    } catch (error) {
        res.json({
            code: 500,
            data: null,
            message: "用户未找到"
        })
    }
})
router.post("/login", (req, res, next) => {
    let { body: { userID: account, password } } = req;
    let u = userInfo.find((v) => {
        return [v.userID, v.phone].some(data => data == account) && v.password == password
    })
    if (u) {
        let token = u["userID"] + Math.random().toString().slice(-8);
        tokens.set(token, {
            userID: u["userID"]
        })
        res.json({
            code: 200,
            data: { token },
            message: "登录成功"
        })
    } else {
        res.json({
            code: 500,
            data: null,
            message: "登录失败"
        })
    }
});
router.post("/logout", (req, res, next) => {
    let { header: { authorization } } = req;
    tokens.delete(authorization);
    res.json({
        code: 200,
        data: null,
        message: "用户注销成功"
    })
})
router.post("/userInfo", (req, res, next) => {
    let { headers: { authorization } } = req;
    let result = tokens.get(authorization);
    //console.log("result", result, authorization)
    if (result) {
        let { userID } = result;
        let info = userInfo.find(v => v.userID === userID)
        info = { ...info };
        delete info['password'];//删除密码
        var api = new TLSSigAPIv2.Api(1400337794, "8b598f808b9794681326670c700704de52db8117d7cf3f0401dcbfe19440a0b0");
        var userSig = api.genSig(info.userID, 86400 * 180);
        res.json({
            code: 200,
            data: { info, userSig },
            message: "获取用户信息成功"
        })
    } else {
        res.json({
            code: 500,
            data: null,
            message: "获取用户信息失败"
        })
    }
})
router.post("/uploadAvatar", (req, res, next) => {

})
router.post("/sendCode", async (req, res, next) => {
    let { body: { phone } } = req;
    let code = Math.random().toString().slice(-6);
    const { SendStatusSet: [{ Message }] } = await req.tencentSMS.get("s1").SendSms({
        SmsSdkAppId: "1400277599",
        /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
        SignName: "云督系统",
        /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
         * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
        PhoneNumberSet: ["+86" + phone],
        /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
        TemplateId: "748383",
        /* 模板参数: 若无模板参数，则设置为空*/
        TemplateParamSet: [code],
    })
    if (Message === 'send success') {
        codeStore.add("login_" + phone, {
            code,
            times: 0,
            used: false
        })
        res.json({
            code: 200,
            data: null,
            message: "发送短信成功"
        })
    } else {
        res.json({
            code: 500,
            data: null,
            message: Message
        })
    }

})
router.post("/verifyCode", (req, res, next) => {
    let { body: { phone, code } } = req;
    let key = "login_" + phone;
    let result = codeStore.get(key);
    let { code: c, used, times } = result;
    if (times > 3 || used) {
        res.json({
            code: 500,
            data: null,
            message: "验证码已失效"
        })
    }
    if (code === c) {
        codeStore.update(key, { code: c, used: true, times });
        let user = userInfo.find(v => {
            v.phone == phone
        })
        if (!user) {
            res.json({
                code: 404,
                data: null,
                message: "手机号未绑定"
            })
        }
        let token = user["userID"] + Math.random().toString().slice(-8);
        tokens.set(token, {
            userID: user["userID"]
        })
        res.json({
            code: 200,
            data: { token },
            message: "验证码校验成功"
        })
    } else {
        codeStore.update(key, { code: c, used: true, times: ++times });
        res.json({
            code: 500,
            data: null,
            message: "验证码校验失败"
        })
    }
})
module.exports = router;
