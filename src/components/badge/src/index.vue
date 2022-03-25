<template>
  <section class="my-badge">
    <slot></slot>
    <div
      class="unread"
      :style="{ right: offset[0] + 'px', top: offset[1] + 'px' }"
      v-text="calc"
      v-show="zeroShow"
    ></div>
  </section>
</template>

<script>
export default {
  name: 'my-badge',
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    overCount: {
      type: Number,
      default: 99
    },
    count: {
      type: Number,
      default: 0
    },
    zeroShow: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Array,
      default: function () {
        return [0, 0];
      }
    }
  },
  computed: {
    calc() {
      return this.count > this.overCount ? '99+' : this.count;
    }
  },
  methods: {
    initTrigger() {
      switch (this.trigger) {
        case 'hover':
          break;
        case 'click':
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.initTrigger();
  }
};
</script>

<style lang="scss">
.my-badge {
  position: relative;
  .unread {
    position: absolute;
    vertical-align: bottom;
    background-color: red;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    max-width: 40px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
  }
}
</style>