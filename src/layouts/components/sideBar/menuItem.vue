<template functional>
  <a-menu-item :key="currentRoute.name">
    <router-link :to="currentRoute">
      <span style="margin-left:16px" class="menu-title">{{ title }}</span>
    </router-link>
  </a-menu-item>
</template>

<script>
export default {
  name: 'menuItem',
  props: {
    currentRoute: {
      type: Object
    },
    title: String
  }
};
</script>
