<template>
  <a-modal title="评论" :footer="null" @cancel="$emit('hide')">
      
  </a-modal>
</template>

<script>
export default {
  props: {
    commentKey: {
      type: String
    }
  }
};
</script>

<style>
</style>