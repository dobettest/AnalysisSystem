<template functional>
  <a-menu-item :key="props.currentRoute.path">
    <router-link :to="props.currentRoute.path">
      <my-svg-icon v-if="props.currentRoute.meta.icon" :icon="props.currentRoute.meta.icon"> </my-svg-icon>
      <span style="margin-left:16px" class="menu-title">{{ parent.$t('route.' + props.currentRoute.meta.title) }}</span>
    </router-link>
  </a-menu-item>
</template>

<script>
export default {
  name: 'menuItem',
  props: {
    currentRoute: {
      type: Object,
      required: true
    }
  }
};
</script>
