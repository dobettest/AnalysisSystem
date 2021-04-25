<template functional>
  <a-menu-item :key="item.name">
    <template v-if="props.currentRoute">
      <router-link :to="props.currentRoute.path">
        <svg-icon v-if="props.currentRoute.meta.icon" :icon="props.currentRoute.meta.icon"> </svg-icon>
        <span style="margin-left:16px" class="menu-title">{{ props.currentRoute.meta.title }}</span>
      </router-link>
    </template>
    <template v-else>
      <router-link :to="props.path">
        <span style="margin-left:16px" class="menu-title">{{ props.title }}</span>
      </router-link>
    </template>
  </a-menu-item>
</template>

<script>
export default {
  name: 'menuItem',
  props: {
    currentRoute: {
      type: Object
    },
    path: {
      type: String
    },
    title: String
  }
};
</script>
