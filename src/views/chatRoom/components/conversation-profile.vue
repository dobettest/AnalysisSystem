<template>
  <div class="profile-container">
    <h1 class="current-name">aaaa</h1>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </div>
</template>
<script>
export default {
  name: 'conversationProfile',
  data() {
    return {};
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.profile-container {
  .current-name {
    height: 50px;
  }
}
</style>