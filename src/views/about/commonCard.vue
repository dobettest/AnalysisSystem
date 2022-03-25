<template>
  <div class="common-card">
    <div class="title-wrapper">
      <h2 class="main-title">{{mainTitle}}</h2>
      <h3 class="sub-title">{{subTitle}}</h3>
    </div>
    <div class="descrption">
      <slot name="descrption">
      </slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'commonCard',
  props: {
    mainTitle: {
      type: String,
      required: true
    },
    subTitle: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.common-card {
  .title-wrapper {
    text-align: center;
    .main-title {
      font-size: 32px;
      margin: 64px 0 16px 0;
    }
  }
  .descrption {
    width: 80%;
    margin: 15px auto;
    color: #585d65;
    font-size: 16px;
    line-height: 30px;
  }
}
</style>