<template functional>
  <a-menu-item :key="props.item['key']">{{ props.item['title'] }} </a-menu-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>