<template>
  <div class="flex-box flex-sub">
    <logo class="horizontalSide-logo" />
    <a-menu mode="horizontal" theme="dark" :selectedKeys="[$route.path]" class="side-main">
      <template v-for="item in asyncRoutes">
        <sub-menu v-if="item['children']" :key="item.path" :currentRoute="item"></sub-menu>
        <menu-item v-else :key="item.path" :currentRoute="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import logo from './logo';
import subMenu from './subMenu';
import menuItem from './menuItem';
export default {
  name: 'sideBar',
  components: { logo, subMenu, menuItem },
  data() {
    return {};
  },
  computed: {
    asyncRoutes() {
      return this.$store.getters.asyncRoutes;
    }
  }
};
</script>
<style lang="scss" scoped>
.horizontalSide-logo {
  height: 60px;
  line-height: 60px;
  width: 260px;
  box-sizing: border-box;
}
.side-main {
  width: calc(100% - 260px);
  height: 60px;
  line-height: 60px;
  background: #293348;
  float: right;
}
</style>
