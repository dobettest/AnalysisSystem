const tokens = {
  admin: {
    token: 'admin20201013'
  },
  test: {
    token: 'test20201013'
  },
  editor: {
    token: 'editor20201013'
  }
};

const userInfo = {
  admin20201013: {
    username: 'admin',
    location: 'Wuhan',
    position: '混元太极门掌门人',
    role: '超级管理员',
    label: '年轻人不讲武德',
    skill: '闪电五连鞭'
  },
  test20201013: {
    username: 'test',
    location: 'Wuhan',
    position: '四皇',
    role: '普通用户',
    label: '给我一个面子',
    skill: '面子果实'
  },
  editor20201013: {
    username: 'editor',
    location: 'Wuhan',
    position: '金牌作者',
    role: '作家',
    label: '暂无',
    skill: '暂无'
  }
};
const chartlists = {
  admin: {
    chartlist: [
      {
        taobao: {
          alia: 'taobao',
          title: '淘宝',
          children: [
            {
              alia: 'clothes',
              title: '服装'
            }
          ]
        }
      }
    ]
  }
};
const Mock = require('mockjs');
const fs = require('fs');
const Random = Mock.Random;
const phoneCode = Mock.mock('@natural(147895,995425)');
function genUserList() {
  let result = [];
  let k = 0;
  for (var i = 0; i < 100; i++) {
    result.push({
      id: Random.id(), // 身份证号
      guid: Random.guid(),
      name: Random.cname(),
      gender: ['男', '女'][Random.integer(0, 1)],
      age: Random.integer(20, 50),
      married: Random.boolean(),
      birth: Random.datetime('yyyy-MM-dd HH:mm:ss'), // 值是指定格式的日期字符串
      // birth2: new Date(Random.datetime("yyyy-MM-dd HH:mm:ss")),  // 值是 Date 类型
      addr: `${Random.province()}-${Random.city()}-${Random.county()}`,
      email: Random.email('qq.com')
    });
  }
  return result;
}
function genSchoolUser() {
  let result = [];
  let y = new Date().getFullYear();
  for (var i = 0; i < 100; i++) {
    let year = Random.integer(1997, 2002);
    let classID = Random.integer(16, 19);
    let num = Random.integer(10, 30);
    let age = y - year;
    result.push({
      id: `20172018${classID}${num}`, // 身份证号
      name: Random.cname(),
      classID: `17218${classID}${num}`,
      gender: ['男', '女'][Random.integer(0, 1)],
      age,
      birth: {
        year,
        month: Random.integer(1, 12),
        day: Random.integer(1, 31)
      }, // 值是指定格式的日期字符串
      addr: {
        province: Random.province(),
        city: Random.city(),
        country: '中国'
      },
      email: `${Random.integer(1364525216, 1999999999)}qq.com`
    });
  }
  result = result.sort((a, b) => a.id - b.id);
  return result;
}
module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body;
      const token = tokens[username];
      if (!token) {
        return {
          code: 403,
          message: '账号不存在！'
        };
      }
      return {
        data: token,
        code: 200,
        message: '登录成功'
      };
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
    url: '/user/chartlist',
    type: 'post',
    response: config => {
      const { username } = config.body;
      const chartlist = chartlists[username] || [];
      return {
        data: chartlist,
        code: 200,
        message: 'success'
      };
    }
  },
  {
    url: '/user/userInfo',
    type: 'post',
    response: config => {
      const { token } = config.body;

      const info = userInfo[token];

      if (!token || !info) {
        return {
          code: 403,
          message: '用户信息不存在！'
        };
      }
      return {
        data: info,
        code: 200,
        message: '获取用户信息成功！'
      };
    }
  },
  {
    url: '/user/list',
    type: 'post',
    response: config => {
      //fs.writeFileSync('users.js', JSON.stringify(data), { encoding: 'utf8' });
      return {
        data: genSchoolUser(),
        code: 200,
        message: '数据获取成功'
      };
    }
  }
];
