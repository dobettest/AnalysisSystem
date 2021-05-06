<template>
  <div class="database-container">
    <a-card :hoverable="true" :bordered="false">
      <a-table :columns="columns" :data-source="List">
        <div slot="operation" slot-scope="text, record">
          <a-button type="primary" size="small" @click="handleEdit(text)">编辑</a-button>
          <a-popconfirm
            ok-text="是"
            cancel-text="否"
            style="margin-left:8px"
            v-if="List.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record)"
          >
            <a-button type="danger" size="small">删除</a-button>
          </a-popconfirm>
        </div>
      </a-table>
      <template slot="title">
        <a-button type="primary" class="mr8" @click="handleAdd">
          <svg-icon icon="add" class="mr8"></svg-icon>
          新增
        </a-button>
        <a-button type="danger" class="mr8">
          <svg-icon icon="clear" class="mr8"></svg-icon>
          批量删除
        </a-button>
        <a-input-search
          placeholder="输入查询条件"
          style="width:180px"
          enter-button
          @search="onSearch"
          v-model="filterStr"
        />
      </template>
      <template slot="extra">
        <a-button type="primary" class="mr8" @click="handleExport">
          <svg-icon icon="export" class="mr8"></svg-icon>
          导出
        </a-button>
      </template>
    </a-card>
    <data-model
      :model="model"
      :visible="showModel"
      @ok="handleOk"
      @cancel="showModel = false"
      v-if="showModel"
      :table="table"
    ></data-model>
  </div>
</template>

<script>
import { getDbDetail, deleteTable } from '@/api/user';
import { getCache } from '@/utils/session';
import { mapGetters } from 'vuex';
import defaultList from './default';
import { formatJson } from '@/utils';
import dataModel from './components/dataModel';
export default {
  components: {
    dataModel
  },
  data() {
    return {
      offset: 0,
      limit: 15,
      table: '',
      List: null,
      model: null,
      columns: null,
      filterStr: null,
      showModel: false
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    List(newVal, oldVal) {
      if (newVal == null) return;
      let model = newVal[0];
      this.model = Object.assign({}, model);
      let columns = Object.keys(model).map(v => {
        var obj = {
          title: v,
          dataIndex: v
        };
        if (typeof model[v] === 'number') obj['sorter'] = (a, b) => a[v] - b[v];
        return obj;
      });
      columns.push({ title: 'Action', key: 'operation', scopedSlots: { customRender: 'operation' } });
      this.columns = columns;
    },
    async filterStr(newVal, oldVal) {
      if (newVal === '') {
        let { offset, limit, table } = this;
        let { username } = this.userInfo;
        await getDbDetail({ username, table, offset, limit })
          .then(res => {
            let { data } = res;
            this.List = data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  methods: {
    async initData() {
      let { name } = this.$route.params;
      this.table = name;
      let { offset, limit } = this;
      let { username } = this.userInfo;
      if (name === 'default') {
        this.$set(this, 'List', defaultList);
        return;
      } else {
        await getDbDetail({ username, table: name, offset, limit })
          .then(res => {
            let { data } = res;
            this.List = data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleAdd() {
      Object.keys(this.model).forEach(key => {
        this.model[key] = '';
      });
      this.showModel = true;
    },
    onSearch(value) {
      try {
        if (!value) {
          this.$message.error('查询条件不能为空');
          return;
        }
        let filterArr = value.split(',');
        this.List = this.List.filter(v => {
          return filterArr.every(f => {
            let [key, value] = f.split(':');
            return v[key] == value; //数字和字符串不相等
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
    onDelete(record) {
      //const dataSource = [...this.List];
      //this.List = dataSource.filter(item => item.id !== id);
      let { username } = this.userInfo;
      let { table} = this;
      deleteTable({ username, table, filter: record }).then(() => {
        this.$message.success('删除成功');
        getDbDetail({ username, table })
          .then(res => {
            let { data } = res;
            this.List = data;
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    handleExport() {
      try {
        if (!this.List) {
          this.$message.error('数据表为空');
          return;
        }
        import('@/vendor/Export2Excel').then(excel => {
          const header = this.columns.map(v => v.title);
          header.pop();
          const data = this.List.map(v => Object.values(v));
          excel.export_json_to_excel({
            header,
            data,
            filename: `${this.table}`
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
    handleEdit(model) {
      this.model = { ...model };
      this.showModel = true;
    },
    handleOk() {
      this.showModel = false;
      this.initData();
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.List = null;
      this.model = null;
      this.columns = null;
      this.filterStr = null;
      next();
      this.initData();
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initData();
    });
  }
};
</script>

<style scoped lang="scss">
.database-container {
  min-height: calc(100vh - 46px);
  background-color: #f0f2f5;
  padding: 24px;
}
.mr8 {
  margin-right: 8px;
}
</style>
