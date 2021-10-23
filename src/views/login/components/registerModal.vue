<template>
  <a-modal title="用户注册" :footer="null" :visible="visible" @cancel="visible = false">
    <a-card title="进度"> </a-card>
  </a-modal>
</template>

<script>
export default {
  name: 'registerModal',
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    this.$bus.$on('registerModal', function name(params) {
      this.visible = true;
    });
  }
};
</script>

<style>
</style>