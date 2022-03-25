<template functional>
  <a-sub-menu :key="props.item['key']">
    <template slot="title">
      <span>
        {{ props.item['title'] }}
      </span>
    </template>
    <template v-for="temp in props.item['children']">
      <sub-menu v-if="temp['children']" :key="temp['key']" :item="temp" />
      <menu-item v-else :key="temp['key']" :item="temp" />
    </template>
  </a-sub-menu>
</template>

<script>
import menuItem from './menu-item';
export default {
  name: 'subMenu',
  components: { menuItem },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
