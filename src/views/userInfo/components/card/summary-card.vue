<template>
  <div class="summary-container">
    <div class="summary-item">
      <p class="summary-num">{{ summary['visit'] }}</p>
      <p class="summary-name">访问量</p>
    </div>
    <div class="summary-item">
      <p class="summary-num">{{ summary['article'] }}</p>
      <p class="summary-name">文章</p>
    </div>
    <div class="summary-item">
      <p class="summary-num">{{ summary['dynamic'] }}</p>
      <p class="summary-name">动态</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'summary-card',
  props: {
    summary: {
      type: Object,
      required: true
    }
  }
};
</script>