<template>
  <div class="main-layout-container">
    <router-view />
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      isLogin: state => state.userModule.token
    })
  },
  watch: {
    /*防跳墙*/
    isLogin: {
      handler: function (nl, ol) {
        if (!nl) {
          this.$router.push({
            path: '/login'
          });
        }
      },
      immediate: true
    }
  }
};
</script>

<style>
</style>