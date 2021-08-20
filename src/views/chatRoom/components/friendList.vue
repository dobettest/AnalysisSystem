<template>
  <div>
    <a-card :hoverable="true" :bordered="false">
      <div slot="title" class="title">
        <a-button type="primary" icon="plus">添加好友</a-button>
        <a-button type="primary" icon="import">关系导入</a-button>
        <a-button type="primary" icon="export">关系导出</a-button>
        <a-input-search enter-button :style="{ width: 300 + 'px' }" placeholder="请输入搜索条件"></a-input-search>
      </div>
      <a-table :columns="tableHead"> </a-table>
    </a-card>
  </div>
</template>

<script>
import tim from '@/lib/tim';
export default {
  data() {
    return {
      tableHead: [
        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar'
        },
        {
          title: 'ID',
          dataIndex: 'userID',
          key: 'userID'
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'userId'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    };
  },
  mounted() {
    this.getFriendList();
  },
  methods: {
    getFriendList() {
      tim
        .getFriendList()
        .then(res => {
          console.log('tim', res);
        })
        .catch(err => {
          this.$$message.error(err.message);
        });
    }
  }
};
</script>

<style></style>
