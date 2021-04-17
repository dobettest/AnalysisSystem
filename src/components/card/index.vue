<template>
  <div ref="card" class="card-container">
    <a-card :title="name" :hoverable="true" :bordered="false" :loading="loading">
      <ul slot="extra" class="extra">
        <li class="item">
          <svg-icon :icon="isFull ? 'collpase' : 'expand'" @click.native="screenfy()"></svg-icon>
        </li>
        <li class="item"><svg-icon icon="edit" @click.native="editChart()"></svg-icon></li>
        <li class="item morelist">
          <svg-icon icon="more"></svg-icon>
          <div class="menu-list">
            <div class="menu-item">删除图表</div>
            <div class="menu-item" @click="screencut()">导出图片</div>
            <div class="menu-item" @click="handleExport()">导出数据</div>
          </div>
        </li>
      </ul>
      <chart v-if="options" :option="options"></chart>
      <div v-else class="add-box">
        <svg-icon icon="add" class="add-content" @click.native="editChart()"></svg-icon>
      </div>
    </a-card>
    <chartModel
      :dialogVisible="dialogVisible"
      v-if="dialogVisible"
      @cancel="dialogVisible = false"
      :option="cardInfo"
      :model="model"
    ></chartModel>
  </div>
</template>

<script>
import chart from '../echart';
import emitter from '@/mixins/emitter';
import chartModel from './chartModel';
import { lazyload } from '@/utils/lazyload';
import remoteLoad from '@/utils/remoteLoad';
const { html2canvasCDN } = require('@/plugins/cdn');
import request from '@/utils/request';
import resolveData from '@/mixins/resolveData';
export default {
  components: {
    chart,
    chartModel
  },
  data() {
    return {
      showMore: false,
      loading: false,
      dialogVisible: false,
    };
  },
  mixins: [emitter, resolveData],
  props: {
    cardInfo: {
      type: Object
    },
    isFull: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  console.log("1")
    this.$nextTick(() => this.init());
    let lazyhandler = lazyload(this.$refs.card, this.getData);
    window.addEventListener('scroll', lazyhandler);
  },
  methods: {
    async init() {
      try {
        await remoteLoad(html2canvasCDN);
        if (!window.html2canvas) {
        }
      } catch (error) {
        console.log(error);
      }
    },
    More() {
      this.showMore = !this.showMore;
    },
    screenfy: function(e) {
      let { title, config, isFull } = this;
      this.$bus.$emit('screenfy', { title, config, isFull: !isFull });
    },
    screencut() {
      this.loading = true;
      const boxDom = this.$refs.card;
      window.html2canvas(boxDom).then(res => {
        var dataUrl = res.toDataURL('image/jpeg', 1.0);
        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${this.title}.png`;
        a.click();
        this.loading = false;
      });
    },
    handleExport() {
      /*this.loading = true;
      let { source, dimensions } = this.option.dataset;
      import('@/vendor/Export2Excel').then(excel => {
        const header = dimensions;
        const data = source;
        excel.export_json_to_excel({
          header,
          data,
          filename: '用户列表'
        });
        this.loading = false;
      });*/
    },
    editChart() {
      this.dialogVisible = !this.dialogVisible;
    },
    async getData() {
      let { db, table } = this.cardInfo;
      const { data } = await request.post('/getlist', { db, table });
      this.model = data[0];
      Object.assign(this, {
        data
      });
      //console.log("card getData")
      this.config =this.cardInfo;
    }
  },
  computed: {
    name() {
      return this.cardInfo.name || 'xxx';
    }
  }
};
</script>

<style scoped lang="scss">
.card-container {
  height: 100%;
  margin-bottom: 25px;
  width: 100%;
  /deep/ .ant-card {
    height: 100%;
    .extra {
      display: none;
      list-style: none;
      .item {
        float: left;
        .svgClass {
          margin: 0 8px;
          width: 20px;
          height: 20px;
        }
      }
      .morelist {
        position: relative;
        .menu-list {
          position: absolute;
          top: 24px;
          left: 0;
          right: 0;
          bottom: 0;
          display: none;
          width: 60px;
          font-size: 12px;
          z-index: 999;
          .menu-item {
            width: 100%;
            height: 20px;
          }
        }
        &:hover {
          .menu-list {
            display: block;
          }
        }
      }
    }
    &:hover {
      .extra {
        display: block;
      }
    }
    .ant-card-head {
      height: 60px;
    }
    .ant-card-body {
      height: calc(100% - 60px);
      .add-box {
        margin: 0 auto;
        width: 80%;
        height: 100%;
        .add-content {
          display: block;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>
