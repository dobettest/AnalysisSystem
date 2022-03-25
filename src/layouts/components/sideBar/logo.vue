<template>
  <router-link to="/index" :class="['logo-wrapper', 'flex-box', open ? 'open' : '']">
    <my-svg-icon icon="logo" :size="30" />
    <div class="logo-title" v-if="open">{{ companyName }}</div>
  </router-link>
</template>

<script>
export default {
  name: 'logo',
  computed: {
    companyName() {
      return this.$store.getters.currentRole ? this.$store.getters.currentRole['alia'] : '';
    },
    open() {
      return this.$store.state.setting.open;
    }
  }
};
</script>
<style lang="scss" scoped>
.logo-wrapper {
  position: relative;
  height: 64px;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 64px;
  .logo-title {
    font-size: 1.2rem;
    color: #fff;
    font-weight: 600;
    margin-left: 12px;
    flex-grow: 1;
  }
}
.horizontal .logo-wrapper {
  height: 60px;
  line-height: 60px;
  min-width: 250px;
}
.open {
  padding-left: 24px;
}
</style>
