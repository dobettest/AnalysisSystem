<template>
  <div class="loading-container" :style="{ background: background }" v-if="show">
    <div class="loading-wrapper">
      <component :is="spin + '-spin'" />
    </div>
  </div>
</template>

<script>
import { rectSpin, planeSpin, cubeSpin, chaseSpin } from './spin';
export default {
  name: 'loading',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: 'rgba(255,255,255,0.6)'
    },
    spin: {
      type: String,
      default: 'rect'
    }
  },
  components: { rectSpin, planeSpin, cubeSpin, chaseSpin }
};
</script>
<style lang="scss" scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  .loading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: unquote('max(30px, 10%)');
    height: unquote('max(20%, 30px)');
  }
}
@keyframes rotating {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>
