<template>
  <div class="all-container" :class="{ closeSide: !open, horizontal: horizontal }">
    <side-bar class="aside-container" :collapsed="open" v-if="!horizontal" />
    <div class="main-container" :class="{ hasTag: tagShow }">
      <div :class="{ 'fixed-header': fixHeader }">
        <nav-bar :collapsed="open" v-if="!horizontal" />
        <div v-else class="horizontal-nav flex">
          <horizontal-side />
          <nav-bar :horizontal="horizontal" class="nav-user"></nav-bar>
        </div>
        <tag-view v-if="tagShow" />
      </div>
      <div class="rightPanl" @click="changeVisivle">
        <a-icon type="setting" class="settingIcon" />
        <setting />
      </div>
      <div class="app-main">
        <router-view />
        <back-top />
      </div>
    </div>
  </div>
</template>

<script>
import { sideBar, navBar, tagView, setting, horizontalSide } from './components';
import backTop from '@/components/backTop/index';
import { mapState } from 'vuex';
export default {
  name: 'layout',
  components: { sideBar, navBar, tagView, setting, backTop, horizontalSide },
  computed: {
    ...mapState({
      open: state => state.setting.open,
      fixHeader: state => state.setting.fixHeader,
      tagShow: state => state.setting.tagShow,
      layout: state => state.setting.layout
    }),
    horizontal() {
      return this.layout == 'horizontal';
    }
  },
  methods: {
    changeVisivle() {
      this.$store.dispatch('setting/changeSetting', { key: 'settingVisible', value: true });
    }
  }
};
</script>
<style lang="scss" scoped>
.all-container {
  height: 100%;
}
.aside-container {
  background: rgb(41, 51, 72);
  transition: width 0.28s;
  width: 256px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 996;
  height: 100%;
}
.rightPanl {
  position: fixed;
  right: 1px;
  top:50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  color: #fff;
  background: $color-primary;
  border-radius: 6px 0 0 6px;
  text-align: center;
  line-height: 50px;
  font-size: 24px;
  z-index: 999;
  cursor: pointer;
}
.app-main {
  height: 100%;
  width: 100%;
}

.main-container {
  height: 100%;
  margin-left: 256px;
  width: calc(100% - 256px);
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 996;
    transition: width 0.28s;
    width: calc(100% - 256px);
    & ~ .app-main {
      padding-top: 54px;
    }
  }
}
.hasTag {
  .fixed-header {
    & ~ .app-main {
      padding-top: 100px !important;
      height: 100%;
    }
  }
}

.closeSide {
  .aside-container {
    width: 80px;
  }
  .main-container {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  .fixed-header {
    width: calc(100% - 80px);
  }
}

//水平布局
.horizontal {
  .aside-container{
    width: 0;
  }
  .horizontal-nav {
    background: #293348;
    color: #f1f1f1;
    height: 54px;
    line-height: 54px;
  }
  .main-container {
    margin-left: 0;
    width:100%;
  }
  .fixed-header {
    width: 100%;
  }
  .nav-user {
    background: #293348;
  }
  .app-main {
    background: #f0f2f5;
  }
}
</style>
