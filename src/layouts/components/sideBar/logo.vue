<!--
 * @Author: your name
 * @Date: 2021-03-21 19:28:18
 * @LastEditTime: 2021-04-03 21:47:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AnalysisSystemf:\vue-antd-admin\src\layouts\components\sideBar\logo.vue
-->
<template>
  <router-link to="/dashboard" class="logo-wrapper ">
    <svg-icon icon="logo" class="verticalMiddle" :size="30" />
    <div class="logo-title verticalMiddle">Analysis-WebSite</div>
  </router-link>
</template>

<script>
export default {
  name: 'logo',
  data() {
    return {};
  }
};
</script>
