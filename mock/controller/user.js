const Mock = require('mockjs');
const { default: dbList } = require('../database/modules/zhangsan/dbList');
const phoneCode = Mock.mock('@natural(147895,995425)');
const users = require("../database/users");
const load_table = (db, table) => {
  try {
    return require(`../database/modules/${db}/${table}`)
  } catch (error) {
    return {
      errstr: "数据表未找到"
    }
  }
}
module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body;
      var index = users.findIndex(v => v.username === username);
      if (index !== -1) {
        if (users[index].password === password) {
          return {
            data: users[index],
            code: 200,
            message: '登录成功'
          }
        } else {
          return {
            code: 200,
            message: '密码错误',
            data: null
          }
        }
      } else {
        return {
          code: 200,
          message: '账户不存在',
          data: null
        }
      }
    }
  },
  {
    url: '/user/logout',
    type: 'post',
    response: config => {
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
      if (phoneCode == code) {
        return {
          data: tokens['admin'],
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
    url: '/user/dbList',
    type: 'post',
    response: config => {
      let { username } = config.body;
      if (!username) {
        return {
          code: 200,
          message: '缺少必要参数'
        }
      } else {
        const dbList = load_table(username, "dbList");
        if (dbList["errstr"]) {
          return {
            code: 1003,
            message: dbList["errstr"]
          }
        }
        return {
          code: 200,
          data: dbList,
          message: '数据库获取成功'
        }
      }
    }
  },
  {
    url: '/user/dbDetail',
    type: 'post',
    response: config => {
      let { username, table, offset, limit } = config.body;
      offset = offset ? offset : 0
      limit = limit ? limit : 15
      if (!username || !table) {
        return {
          code: 200,
          message: '缺少必要参数'
        }
      } else {
        let dbList = load_table(username, table);
        dbList = dbList.slice(offset, offset + limit);
        return {
          code: 200,
          data: dbList,
          message: '数据库获取成功'
        }
      }
    }
  },
  {
    url: '/user/dashList',
    type: 'post',
    response: config => {
      let { username } = config.body;
      if (!username) {
        return {
          code: 200,
          message: '缺少必要参数'
        }
      } else {
        const dashList = load_table(username, "dashList");
        if (dashList["errstr"]) {
          return {
            code: 1003,
            message: dashList["errstr"]
          }
        }
        return {
          code: 200,
          data: dashList,
          message: '仪表盘获取成功'
        }
      }
    }
  },
  {
    url: '/user/dashDetail',
    type: 'post',
    response: config => {
      let { username, table, offset, limit } = config.body;
      offset = offset ? offset : 0
      limit = limit ? limit : 15
      if (!username || !table) {
        return {
          code: 200,
          message: '缺少必要参数'
        }
      } else {
        let dashList = load_table(username, table);
        dashList = dashList.slice(offset, offset + limit);
        return {
          code: 200,
          data: dbList,
          message: '仪表盘获取成功'
        }
      }
    }
  }
];
