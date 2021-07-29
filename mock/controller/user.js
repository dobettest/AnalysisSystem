const userInfo = [
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
const resetUserInfo = function () {
  let u = [...userInfo];
  return function () {
    userInfo = u;
  }
}
exports.resetUserInfo = resetUserInfo;
exports.userInfo = userInfo
const tokens = [];

const Mock = require('mockjs');
const TLSSigAPIv2 = require('tls-sig-api-v2');

const phoneCode = Mock.mock('@natural(147895,995425)');

module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { userID, password } = config.body;
      const user = userInfo.find(v => v.userID === userID && v.password === password);
      if (!user) {
        return {
          code: 403,
          message: '账号不存在！'
        };
      }
      let token = user.username + Date.now().valueOf()
      tokens.push(token);
      return {
        data: { token },
        code: 200,
        message: '登录成功'
      };
    }
  },
  {
    url: '/user/logout',
    type: 'post',
    response: config => {
      let { token } = config.body;
      tokens.splice(tokens.indexOf(token), 1);
      return {
        code: 200,
        message: '退出成功！'
      };
    }
  },
  {
    url: '/user/testCode',
    type: 'post',
    response: config => {
      const { phone, code } = config.body;
      let user = userInfo.find((v => v.phone === phone));
      let token = user['username'] + Date.now().valueOf()
      tokens.push(token)
      if (phoneCode == code) {
        return {
          data: token,
          code: 200,
          message: '验证码输入正确'
        };
      } else {
        return {
          code: 403,
          message: '验证码输入错误'
        };
      }
    }
  },
  {
    url: '/user/code',
    type: 'post',
    response: config => {
      return {
        data: phoneCode,
        code: 200,
        message: '获取验证码成功'
      };
    }
  },
  {
    url: '/user/userInfo',
    type: 'post',
    response: config => {
      const { token } = config.body;
      const username = token.replace(/([a-zA-Z]+)(\d+)/, '$1');
      const info = { ...userInfo.find((v) => v.username === username) };//深拷贝
      delete info['password'];//删除密码
      if (!token || !info) {
        return {
          code: 403,
          message: '用户信息不存在！'
        };
      }
      var api = new TLSSigAPIv2.Api(1400337794, "8b598f808b9794681326670c700704de52db8117d7cf3f0401dcbfe19440a0b0");
      var userSig = api.genSig(info.userID, 86400 * 180);
      return {
        data: { info, userSig },
        code: 200,
        message: '获取用户信息成功！'
      };
    }
  },
  {
    url: '/user/uploadAvatar',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: '上传头像成功'
      };
    }
  }
];
