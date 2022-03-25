<template>
  <a-dropdown>
    <span class="right-menu-item boxHover">
      <my-svg-icon icon="change" :size="23"></my-svg-icon>
    </span>
    <a-menu slot="overlay">
      <template v-for="item in roles">
        <a-menu-item :key="item['alia']"> {{ item['alia'] }}</a-menu-item>
      </template>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'workstation-control',
  computed: {
    roles() {
      return this.$store.state.role.roles;
    }
  }
};
</script>

<style>
</style>