<template>
  <div>
    <a-card :hoverable="true" :bordered="false">
      <div slot="title" class="title">
        <a-button type="primary" icon="plus" @click="handleAdd">创建群组</a-button>
        <a-button type="primary" icon="import">关系导入</a-button>
        <a-button type="primary" icon="export">关系导出</a-button>
        <a-input-search enter-button :style="{ width: 300 + 'px' }" placeholder="请输入搜索条件"></a-input-search>
      </div>
      <a-table :columns="tableHead" :data-source="groupList">
        <div slot="action" slot-scope="text">
          <a-button @click="handleEdit(text)" type="danger" size="small"> 解散 </a-button>
        </div>
      </a-table>
    </a-card>
    <groupModal :visible="visible" :currentRow="currentRow" @cancel="visible = false" v-if="visible"></groupModal>
  </div>
</template>

<script>
import groupModal from './groupModal.vue';
//import tim from '@/lib/tim';
export default {
  data() {
    return {
      visible: false,
      tableHead: [
        {
          title: '群头像',
          dataIndex: 'avatar',
          key: 'avatar'
        },
        {
          title: 'groupID',
          dataIndex: 'groupID',
          key: 'groupID'
        },
        {
          title: '群名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      groupList: [],
      currentRow: null
    };
  },
  components: {
    groupModal
  },
  mounted() {
    this.getGroupList();
  },
  methods: {
    handleAdd() {
      this.currentRow = null;
      this.visible = true;
    },
    getGroupList() {
      // tim
      //   .getGroupList()
      //   .then(({ data: { groupList } }) => {
      //     console.log(groupList, typeof groupList);
      //     this.groupList = groupList;
      //     //this.$store.dispatch("updateGroupList", groupList);
      //   })
      //   .catch(error => {
      //     this.$message.error(error.message);
      //   });
    }
  }
};
</script>

<style></style>
