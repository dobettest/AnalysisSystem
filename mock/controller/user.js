const Mock = require('mockjs');
const fs = require('fs');
const path = require('path');
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
const add_table = (db, table, item) => {
  try {
    var data = require(`../database/modules/${db}/${table}`)
    data.push(item);
    fs.writeFileSync(path.resolve(__dirname, `../database/modules/${db}/${table}.js`), "module.exports=" + JSON.stringify(data), { encoding: 'utf-8' });
    return {
      code: 200,
      message: '添加成功'
    }
  } catch (error) {
    return {
      code: 1101,
      message: "添加失败"
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
      let { username, group, offset, limit } = config.body;
      offset = offset ? offset : 0
      limit = limit ? limit : 15
      if (!username || !group) {
        return {
          code: 200,
          message: '缺少必要参数'
        }
      } else {
        let dashList = load_table(username, "dashboard");
        dashList = dashList.slice(offset, offset + limit).filter(v => v.group === group)
        return {
          code: 200,
          data: dashList,
          message: '仪表盘获取成功'
        }
      }
    }
  },
  {
    url: '/table/add',
    type: 'post',
    response: config => {
      let { username, table, item } = config.body;
      let res = add_table(username, table, item);
      return res;

    }
  },
  {
    url: '/table/delete',
    type: 'post',
    response: config => {
      try {
        let { username, table, filter } = config.body;
        let keys = Object.keys(filter);
        let data = load_table(username, table);
        let index = data.findIndex(v => {
          return keys.every(key => {
            return v[key] == filter[key];
          })
        })
        console.log(index, filter, keys)
        if (index == -1) {
          throw new Error('不存在此数据');
        }
        data.splice(index, 1);
        fs.writeFileSync(path.resolve(__dirname, `../database/modules/${username}/${table}.js`), "module.exports=" + JSON.stringify(data), { encoding: 'utf-8' });
        return {
          code: 200,
          message: '删除成功'
        }
      } catch (err) {
        return {
          code: 1001,
          message: '删除失败'
        }
      }

    }
  }
];
