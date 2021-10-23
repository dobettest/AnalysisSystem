<template>
  <a-tabs :activeKey="activeKey" @change="change">
    <a-tab-pane key="dynamic">
      <div slot="tab">
        <a-badge count="5" :offset="[14, 0]">
          <span>我的空间</span>
        </a-badge>
      </div>
      <dynamic-container class="scroll-container" :dynamicList="dynamicList" />
    </a-tab-pane>
    <a-tab-pane key="article">
      <div slot="tab">
        <a-badge count="5" :offset="[14, 0]">
          <span>我的文章</span>
        </a-badge>
      </div>
      <article-container class="scroll-container" />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import articleContainer from './subview/article/index.vue';
import dynamicContainer from './subview/dynamic/index.vue';
import { db } from '@/lib/cloudbase.js';
export default {
  name: 'dynamic-article-tab',
  components: {
    dynamicContainer,
    articleContainer
  },
  data() {
    return {
      activeKey: 'dynamic',
      dynamicList: []
    };
  },
  props: {
    userID: {
      type: String,
      required: true
    }
  },
  methods: {
    async getDynamicList() {
      let { userID } = this;
      // console.log(userID);
      let regexp = `^v\\d{8}${userID}\\d{2,3}$`;
      const { data } = await this.$store.dispatch('cloudbase/access', {
        name: 'vblog',
        params: {
          vid: new db.RegExp({
            regexp
          })
        }
      });
      this.dynamicList = data;
    },
    change(val) {
      this.activeKey = val;
    }
  },
  watch: {
    userID: {
      handler(nl, ol) {
        if (nl && nl !== ol) {
          this.getDynamicList();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.scroll-container {
  height: 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
}
</style>