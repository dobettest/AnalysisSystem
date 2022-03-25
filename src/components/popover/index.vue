<template>
  <section class="m-popover">
    <slot name="trigger"></slot>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'popover',
  props: {
    placement: {
      type: String,
      default: 'bottom'
    }
  }
};
</script>

<style lang="scss" scoped>
</style>