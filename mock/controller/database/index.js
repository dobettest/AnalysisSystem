const db_load = (db, table) => require(`./modules/${db}/${table}`);
module.exports = [
  {
    url: '/getlist',
    type: 'post',
    response: config => {
      let { db, table } = config.body;
      let data = db_load(db, table);
      return {
        data,
        code: 200,
        message: '请求成功'
      };
    }
  },
  {
    url: '/dashbord/list',
    type: 'post',
    response: config => {
      let { company, group } = config.body;
      let data = db_load('dashboard', company).filter(v => v.group === group);
      return {
        data,
        code: 200,
        message: '请求成功'
      };
    }
  }
];
