<template>
  <div class="nav-wrapper flex-box">
    <a-icon
      :type="collapsed ? 'menu-fold' : 'menu-unfold'"
      class="nav-fold boxHover"
      @click="toggleOpen"
      v-show="!horizontal"
    />

    <bread-crumb v-show="!horizontal" />
    <div class="right-menu flex-box">
      <a-tooltip placement="bottom">
        <template slot="title"> 系统设置 </template>
        <div class="right-menu-item boxHover" @click="changeVisible">
          <svg-icon icon="globalSetting" :size="20" />
        </div>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template slot="title">未读消息{{ unread }}</template>
        <div class="right-menu-item boxHover" style="margin-right: 15px" @click="toNotice">
          <a-badge :count="unread" :overflow-count="99" :offset="[10, -10]">
            <svg-icon icon="bell" :size="20" :class="{ notice }" />
          </a-badge>
        </div>
      </a-tooltip>
      <nav-user class="right-menu-item boxHover flex-sub" />
    </div>
  </div>
</template>

<script>
import navUser from './navUser';
import screenfull from 'screenfull';
import breadCrumb from './breadCrumb';
let timer = null;
export default {
  name: 'navBar',
  props: {
    collapsed: {
      type: Boolean,
      default: true
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  components: { navUser, breadCrumb },
  data() {
    return {
      isFullscreen: false,
      notice: false
    };
  },
  computed: {
    unread() {
      return this.$store.state.tim.unread;
    }
  },
  methods: {
    notify() {
      timer && clearTimeout(timer);
      this.notice = true;
      timer = setTimeout(() => {
        this.notice = false;
      }, 600); //保证喇叭动画效果
    },
    toggleOpen() {
      this.$store.commit('setting/TOGGLE_OPEN');
    },
    screenFull() {
      if (!screenfull.isEnabled) {
        this.$message.warning('不好意思，你的电脑不支持全屏，赶紧换个电脑吧，谢谢~');
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    },
    changeVisible() {
      this.$store.dispatch('setting/changeSetting', { key: 'settingVisible', value: true });
    },
    toNotice() {
      this.$router.push({
        path: '/im'
      });
    }
  },
  mounted() {
    this.$bus.$on('bell', this.notify);
  }
};
</script>
<style lang="scss" scoped>
@keyframes scale {
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.notice {
  animation: scale 0.3s infinite;
}
.nav-wrapper {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid transparent;
  .boxHover {
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .nav-fold {
    padding: 0 18px;
    height: 100%;
    cursor: pointer;
    font-size: 20px;
    line-height: 60px;
    transition: all 0.3s, padding 0s;
  }

  .right-menu {
    height: 100%;
    width: 280px;
    .right-menu-item {
      height: 100%;
      padding: 0 8px;
      line-height: 60px;
      cursor: pointer;
    }
  }
}
</style>
