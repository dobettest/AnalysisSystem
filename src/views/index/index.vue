<template>
  <div class="dashboard-container">
    <div class="chart-list">
      <chart
        v-for="(item, index) in dashList"
        :key="index"
        :option="item.option"
        :title="item.name"
        class="chart-item"
      ></chart>
    </div>
  </div>
</template>

<script>
import { getDashDetail } from '@/api/user';
import { mapGetters } from 'vuex';
import defaultList from './default';
import chart from './components/chart';
export default {
  name: 'pie',
  data() {
    return {
      offset: 0,
      limit: 15,
      dashboard: '',
      dashList: null
    };
  },
  components: {
    chart
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    async initData() {
      let { name } = this.$route.params;
      console.log(this.$route, 'name', name);
      this.dashboard = name;
      let { offset, limit } = this;
      let { username } = this.userInfo;
      if (name === 'default') {
        this.$set(this, 'dashList', defaultList);
        return;
      } else {
        await getDashDetail({ username, table: name, offset, limit })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.initData()
    })
  }
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  min-height:calc(100vh - 54px);
  padding: 24px;
  background: #f0f2f5;
  .chart-list {
    .chart-item {
      display: inline-block;
      width: calc(50% - 20px);
      margin: 10px;
      &:hover{
        /deep/ .extra-list{
        display:block;
        }
      }
    }
  }
}
</style>
