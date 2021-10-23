<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    bell() {
      return this.$store.setting.bell;
    }
  },
  name: 'App'
};
</script>
