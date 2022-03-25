<template>
  <div class="upload-list-container">
    <div class="upload-list-header">
      <div class="upload-list-title"><b>上传列表</b></div>
      <div class="upload-list-extra" @click="handleExtra">
        <a-icon class="item" type="minus"></a-icon>
        <a-icon class="item" type="border"></a-icon>
        <a-icon class="item" type="close"></a-icon>
      </div>
    </div>
    <ul :class="['upload-list', { hidden: !showBody }]">
      <li class="upload-list-item" v-for="(item, idx) in upList" :key="idx">
        <div>{{ item.filename }}</div>
        <a-progress :percent="item.percent"></a-progress>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'upload-list-diag',
  data() {
    return {
      showBody: true
    };
  },
  computed: {
    upList() {
      return this.$store.state.cloudbase.uploadList;
    }
  },
  methods: {
    handleExtra(event) {
      let e = event.srcElement || event.target;
      let type = e.getAttribute('data-icon');
      console.log('type', type);
      switch (type) {
        case 'minus':
          this.showBody = false;
          break;
        case 'border':
          this.showBody = true;
          break;
        case 'close':
          this.$emit('close');
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.upload-list-container {
  position: absolute;
  width: 400px;
  max-height: 360px;
  right: 30px;
  bottom: 10px;
  z-index: 999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  overflow: hidden;
  .upload-list-header {
    height: 42px;
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid #ccc;
    padding: 8px;
    .upload-list-title {
      flex-grow: 1;
    }
    .upload-list-extra {
      float: right;
      cursor: pointer;
      .item {
        font-size: 20px;
        margin: 0 4px;
      }
    }
  }
  .upload-list {
    box-sizing: border-box;
    padding: 0 8px;
    height: 298px;
    overflow: auto;
    transition: height 1.5s;
  }
  .hidden {
    height: 0;
  }
}
</style>