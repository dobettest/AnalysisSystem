<template>
  <div class="paddingBox-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'paddingBox',
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.paddingBox-container {
  height: 100%;
  overflow: scroll;
  padding: 24px;
  background: #f0f2f5;
}
</style>
