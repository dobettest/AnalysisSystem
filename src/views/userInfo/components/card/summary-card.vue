<template>
  <section class="card-container">
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
    <ul class="maker-container flex-box">
      <li class="maker-item" @click="$emit('change', 'dynamic-editor')">
        <my-svg-icon icon="blog" :size="26"></my-svg-icon>
        <p>发动态</p>
      </li>
      <li class="maker-item" @click="$emit('change', 'article-editor')">
        <my-svg-icon icon="article" :size="26"></my-svg-icon>
        <p>写文章</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'summary-card',
  props: {
    summary: {
      type: Object,
      default() {
        return {
          visit: 0,
          article: 0,
          dynamic: 0
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card-container {
  background-color: #fff;
  .summary-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 348px;
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
    .summary-item {
      width: 120px;
      text-align: center;
      cursor: pointer;
      .summary-num {
        padding: 4px;
        font-family: Tahoma;
        color: #333;
        &:hover {
          color: #eb7350;
        }
      }
      .summary-name {
        color: #808080;
      }
    }
  }
  .maker-container {
    .maker-item {
      cursor: pointer;
      padding: 8px;
      text-align: center;
      width: 120px;
    }
  }
}
</style>