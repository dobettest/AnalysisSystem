<template>
  <div class="rect-wrapper">
    <div class="rect-item rect1"></div>
    <div class="rect-item rect2"></div>
    <div class="rect-item rect3"></div>
    <div class="rect-item rect4"></div>
    <div class="rect-item rect5"></div>
  </div>
</template>

<script>
export default {
  name: 'rectSpin'
};
</script>
<style lang="scss" scoped>
.rect-wrapper {
  height: 100%;
  display: flex;
  width: 80%;
  margin: 0 auto;
}
.rect-item {
  background-color: $color-primary;
  margin: 0 4px;
  height: 100%;
  flex: 1;
  animation: rect-loader 1.2s infinite ease-in-out;
}
.rect2 {
  animation-delay: -1.1s;
}
.rect3 {
  animation-delay: -1s;
}
.rect4 {
  animation-delay: -0.9s;
}
.rect5 {
  animation-delay: -0.8s;
}

@keyframes rect-loader {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
