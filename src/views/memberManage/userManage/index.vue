<template>
  <div class="userManage-wrapper">
    <a-card :hoverable="true" :bordered="false">
      <div slot="title" class="flex flex-wrap">
        <a-button type="primary" icon="plus" class="select-bottom" @click="handleAdd"> 新增用户 </a-button>
        <a-button
          type="danger"
          icon="delete"
          style="margin: 0 16px 10px"
          :loading="deleteLoading"
          @click="handleBatchDelete"
        >
          批量删除
        </a-button>
        <a-input
          placeholder="过滤器"
          class="select-width"
          @pressEnter="handleSearch"
          allowClear
          v-model="tableQuery.custom"
        />
        <a-range-picker
          class="select-width"
          style="width: 210px"
          :placeholder="['开始日期', '结束日期']"
          allowClear
          @change="changeTime"
        />
        <a-button type="primary" icon="search" class="select-bottom" style="margin-right: 16px" @click="handleSearch">
          查询
        </a-button>
        <a-button type="primary" icon="export" class="select-bottom" @click="handleExport" :loading="exportLoading">
          导出
        </a-button>
      </div>
      <standard-table
        :tableData="tableData"
        :tableHead="tableHead"
        :loading="loading"
        :pagination="false"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: handleSelect, getCheckboxProps: getCheckboxProps }"
      >
        <div slot="index" slot-scope="{ index }">
          {{ index + 1 }}
        </div>
        <div slot="avatar" slot-scope="{ text }">
          <a-avatar :src="text" shape="square" :size="60"></a-avatar>
        </div>
        <div slot="role" slot-scope="{ text }">
          <a-tag :color="text | statusFilter">
            {{ text }}
          </a-tag>
        </div>
        <div slot="action" slot-scope="{ text }">
          <a-button type="primary" size="small" @click="handleEdit(text)" :disabled="text.role && text.role == 'admin'">
            {{ $t('common.edit') }}
          </a-button>
          <a-popconfirm
            title="你确定要删除当前列吗?"
            ok-text="是"
            cancel-text="否"
            :disabled="text.role && text.role == 'admin'"
            @confirm="handleDelete(text)"
          >
            <a-button type="danger" size="small" style="margin-left: 8px" :disabled="text.role && text.role == 'admin'">
              {{ $t('common.del') }}
            </a-button>
          </a-popconfirm>
        </div>
      </standard-table>
    </a-card>
    <user-model
      :currentRow="currentRow"
      :dialogVisible="dialogVisible"
      @cancel="dialogVisible = false"
      @ok="handleOk"
      v-if="dialogVisible"
    />
  </div>
</template>

<script>
import { getUserTable, deleteTable, batchDeleteTable } from '@/api/userManage';
import { formatJson } from '@/utils';
import userModel from './userModel';
import standardTable from '@/components/standardTable/index';
import remoteLoad from '@/utils/remoteLoad';
import { xlsx } from '@/plugins/cdn';

const tableHead = [
  {
    title: '序号',
    dataIndex: 'index',
    scopedSlots: { customRender: 'index' },
    align: 'center',
    width: 80
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    scopedSlots: { customRender: 'avatar' },
    align: 'center',
    width: 120
  },
  {
    title: '用户名',
    dataIndex: 'username',
    align:'center',
  },
  {
    title: '职位',
    dataIndex: 'job',
    scopedSlots: { customRender: 'job' },
    align: 'center',
    width: 160
  },
  {
    title: '创建日期',
    dataIndex: 'date',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.date > b.date,
    ellipsis: true,
    align: 'center',
    width: 240
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    align:'center',
    width: 140
  }
];
export default {
  name: 'userManage',
  components: { standardTable, userModel },
  filters: {
    statusFilter(status) {
      const statusList = {
        admin: '#2db7f5',
        test: '#f50',
        custom: '#87d068'
      };
      return statusList[status];
    }
  },
  data() {
    return {
      tableQuery: {
        role: null,
        custom: '',
        startTime: '',
        endTime: '',
        page: 1,
        size: 10
      },
      loading: false,
      deleteLoading: false,
      exportLoading: false,
      tableData: [],
      selectedRowKeys: [],
      selectValue: [],
      dialogVisible: false,
      currentRow: null,
      tableHead
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    changeTime(str, time) {
      Object.assign(this.tableQuery, {
        startTime: time[0],
        endTime: time[1]
      });
    },
    getCheckboxProps: record => ({
      props: {
        disabled: record.role === 'admin',
        name: record.name
      }
    }),
    handleSelect(key, value) {
      this.selectedRowKeys = key;
      this.selectValue = value;
    },
    //查询
    handleSearch() {
      this.getTableList();
    },
    //删除
    handleDelete(val) {
      deleteTable({ id: val.id }).then(() => {
        this.$message.success('删除成功!');
        this.getTableList();
      });
    },
    //批量删除
    handleBatchDelete() {
      if (this.selectValue.length == 0) {
        this.$message.warning('请至少勾选一项');
        return;
      }
      this.deleteLoading = true;
      const batchId = this.selectValue.map(item => item.id).join(',');
      batchDeleteTable({ batchId }).then(() => {
        this.$message.success('删除成功!');
        this.getTableList();
        this.deleteLoading = false;
      });
    },
    //编辑
    handleEdit(row) {
      //这里还需要通过id获取用户对应的菜单，这里就不写了。
      this.currentRow = { ...row };
      this.dialogVisible = true;
    },
    //新增
    handleAdd() {
      this.currentRow = null;
      this.dialogVisible = true;
    },
    handleOk() {
      this.dialogVisible = false;
      this.currentRow = null;
      this.getTableList();
    },
    //导出
    handleExport() {
      this.exportLoading = true;
      remoteLoad(xlsx)
        .then(() => {
          import('@/vendor/Export2Excel').then(excel => {
            const header = [],
              filterVal = [];
            this.tableHead.forEach(item => {
              if (item.title != '操作' && item.title != '序号') {
                header.push(item.title);
                filterVal.push(item.dataIndex);
              }
            });
            const data = formatJson(this.tableData, filterVal);

            excel.export_json_to_excel({
              header,
              data,
              filename: '用户列表'
            });
            this.exportLoading = false;
          });
        })
        .catch(() => {
          this.exportLoading = false;
        });
    },
    //获取table数据
    getTableList() {
      this.loading = true;
      getUserTable(this.tableQuery).then(res => {
        const data = res.data || [];
        Object.assign(this, {
          tableData: data,
          loading: false
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.select-width {
  width: 150px;
  margin-right: 16px;
  margin-bottom: 10px;
}
.select-bottom {
  margin-bottom: 10px;
}
</style>
