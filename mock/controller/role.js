const roleData = [
  {
    id: parseInt(Math.random() * 1000000000000),
    role: 'admin',
    text: '系统管理员，拥有所有权限'
  },
  {
    id: parseInt(Math.random() * 1000000000000),
    role: 'test',
    text: '普通用户，拥有大部分权限'
  },
  {
    id: parseInt(Math.random() * 1000000000000),
    role: 'editor',
    text: '文档管理人员，只能看富文本页面'
  },
  {
    id: parseInt(Math.random() * 1000000000000),
    role: 'custom',
    text: '自定义权限，权限由管理员去定义'
  }
];

module.exports = [
  {
    url: '/roleManage/roleTableData',
    type: 'post',
    response: config => {
      return {
        data: roleData,
        code: 200,
        message: '角色table获取成功！'
      };
    }
  },
  {
    url: '/roleManage/deleteRole',
    type: 'post',
    response: config => {
      const { id } = config.body;
      let index = roleData.findIndex(item => item.id == id);
      roleData.splice(index, 1);

      return {
        code: 200,
        message: '删除成功！'
      };
    }
  },
  {
    url: '/roleManage/editRole',
    type: 'post',
    response: config => {
      const { id, role, text } = config.body;
      roleData.forEach(item => {
        if (item.id == id) {
          Object.assign(item, {
            role,
            text
          });
        }
      });
      return {
        code: 200,
        message: '修改成功！'
      };
    }
  },
  {
    url: '/roleManage/addRole',
    type: 'post',
    response: config => {
      const { role, text } = config.body;
      const id = parseInt(Math.random() * 1000000000000);

      roleData.push({
        id,
        role,
        text
      });

      return {
        code: 200,
        message: '添加成功！'
      };
    }
  }
];
