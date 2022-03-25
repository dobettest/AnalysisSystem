<template>
  <div class="event-item-wrapper">
    <div class="event_img-wrapper">
      <img
        :src="item['event_img']"
        alt=""
      >
    </div>
    <div class="descrption-wrapper">
      <p class="descrption">
        {{item['descrption']}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eventItem',
  props: {}
};
</script>

<style lang="scss" scoped>
</style>>