<template>
  <a-tabs :activeKey="activeKey" @change="change">
    <a-tab-pane key="dynamic">
      <div slot="tab">
        <a-badge count="0" :offset="[14, 0]">
          <span>我的空间</span>
        </a-badge>
      </div>
      <dynamic-container :userID="userID" :editable="editable" />
    </a-tab-pane>
    <a-tab-pane key="article">
      <div slot="tab">
        <a-badge count="0" :offset="[14, 0]">
          <span>我的文章</span>
        </a-badge>
      </div>
      <article-container class="scroll-container" />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import articleContainer from './article/index.vue';
import dynamicContainer from './dynamic/index.vue';
export default {
  name: 'dynamic-article-tab',
  components: {
    dynamicContainer,
    articleContainer
  },
  data() {
    return {
      activeKey: 'dynamic',
      editable: false
    };
  },
  props: {
    userID: {
      type: String,
      required: true
    }
  },
  methods: {
    change(val) {
      this.activeKey = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.scroll-container {
  height: 450px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
}
</style>