<template>
  <div class="contactBook-container" v-show="active">
    <div class="notice-wrapper">
      <p class="notice-item">新朋友</p>
      <p class="notice-item">群通知</p>
    </div>
    <div class="tab-bars" @click="tabClick">
      <div :class="['tab-item', tabKey === 'friend' ? 'active' : '']" data-key="friend">好友</div>
      <div :class="['tab-item', tabKey === 'group' ? 'active' : '']" data-key="group">群组</div>
    </div>
    <section class="contact-list-outter" ref="friend" key="friend" v-show="tabKey === 'friend'">
      <a-dropdown :trigger="['contextmenu']">
        <ul class="contact-list-inner" :style="{ height }">
          <li class="contact-list-item" v-for="(item, idx) in list" :key="idx">
            {{ item }}
          </li>
        </ul>
        <a-menu slot="overlay">
          <a-menu-item key="1">分组管理</a-menu-item>
        </a-menu>
      </a-dropdown>
    </section>
    <section class="contact-list-outter" ref="group" key="group" v-show="tabKey === 'group'">
      <ul class="contact-list-inner" :style="{ height }">
        <li class="contact-list-item" v-for="(item, idx) in list" :key="idx">
          {{ item }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import bs from 'better-scroll';
export default {
  name: 'contactBook',
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
      tabKey: 'friend',
      friendBar: null,
      groupBar: null,
      showContextMenu: false
    };
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    height() {
      let h = this.list.length * 45;
      return h + 'px';
    }
  },
  methods: {
    tabClick(e) {
      let el = e.target || e.srcElement;
      let key = el.getAttribute('data-key');
      if (key && key !== this.tabKey) {
        this.tabKey = key;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.contactBook-container {
  height: 100%;
  .notice-wrapper {
    height: 56px;
    .notice-item {
      height: 28px;
      line-height: 28px;
      // border-bottom: 1px solid #ebedf0;
    }
  }
  .tab-bars {
    height: 45px;
    line-height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ebedf0;
    user-select: none;
    .tab-item {
      flex: 1;
      text-align: center;
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }
    .active {
      border-bottom: 2px solid $color-primary;
      color: $color-primary;
      font-weight: 550;
    }
  }
  .contact-list-outter {
    position: relative;
    overflow: auto;
    cursor: pointer;
    height: calc(100% - 101px);
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
    .contact-list-inner {
      padding-right: 7px;
      transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      transition-property: transform;
      transition-duration: 0ms;
      .contact-list-item {
        height: 45px;
      }
    }
  }
}
</style>