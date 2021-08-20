<template>
  <div class="meeting-container">
    <a-tabs v-model="currentTab" :tabBarGutter="35" class="meeting-login-frm">
      <a-tab-pane key="create" tab="创建"> 创建 </a-tab-pane>
      <a-tab-pane key="join" tab="加入会议"> 进入 </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'create'
    };
  }
};
</script>

<style lang="scss">
.meeting-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .meeting-login-frm {
    width: 420px;
    height: 360px;
    border: 1px solid #000;
  }
}
</style>