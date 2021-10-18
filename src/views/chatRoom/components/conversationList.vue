<template>
  <div class="conversation-list-outter" ref="conversation">
    <ul class="conversation-list-inner" :style="{ height }">
      <li class="conversation-list-item" v-for="(item, idx) in list" :key="idx">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import bs from 'better-scroll';
export default {
  name: 'conversationList',
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
      scrollBar: null
    };
  },
  computed: {
    height() {
      let h = this.list.length * 45;
      return h + 'px';
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.conversation-list-outter {
  height: 100%;
  position: relative;
  overflow: auto;
  cursor: pointer;
  .conversation-list-inner {
    padding-right: 7px;
    .conversation-list-item {
      height: 45px;
    }
  }
  &::-webkit-scrollbar {
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    width: 7px;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>