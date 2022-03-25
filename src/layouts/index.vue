<template>
  <div class="all-container" :class="{ closeSide: !open, horizontal: horizontal }">
    <side-bar class="aside-container" :collapsed="open" v-if="!horizontal" />
    <div class="main-container" :class="{ hasTag: tagShow }">
      <div class="fixed-header" ref="headerBar">
        <nav-bar :collapsed="open" v-if="!horizontal" />
        <div v-else class="horizontal-nav flex">
          <horizontal-side />
          <nav-bar :horizontal="horizontal" class="nav-user"></nav-bar>
        </div>
        <tag-view v-if="tagShow" />
      </div>
      <setting />
      <div class="app-main">
        <!-- <a-button @click="bamp">BMap</a-button> -->
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
import timMx from '@/mixins/tim.js';
import trtcMx from '@/mixins/trtc.js';
export default {
  name: 'layout',
  components: { sideBar, navBar, tagView, setting, backTop, horizontalSide },
  mixins: [timMx, trtcMx],
  computed: {
    ...mapState({
      userSig: state => state.user.userSig,
      open: state => state.setting.open,
      fixHeader: state => state.setting.fixHeader,
      tagShow: state => state.setting.tagShow,
      layout: state => state.setting.layout,
      userInfo: state => state.user.accountInfo,
      notice: state => state.setting.notice,
      currentRole: state => state.role.currentRole
    }),
    horizontal() {
      return this.layout == 'horizontal';
    }
  },
  created() {
    this.$store.dispatch('user/createTimTicket');
    this.$store.dispatch('user/getWorkstations');
  },
  methods: {
    bamp() {
      this.$BMap.show();
    },
    changeVisivle() {
      this.$store.dispatch('setting/changeSetting', { key: 'settingVisible', value: true });
    }
  },
  watch: {
    notice: {
      handler(nl, ol) {
        if (nl && 'Notification' in window) {
          if (Notification.permission !== 'granted') {
            Notification.requestPermission(status => {
              if (status === 'granted') {
                Notification.permission = status;
              } else {
                this.$message.error('消息弹窗开启失败,请打开授权');
              }
            });
          }
        }
      },
      immediate: true
    },
    userSig: {
      handler(userSig, ol) {
        if (userSig) {
          let { userID } = this.userInfo;
          this.timLogin({ userID, userSig });
          this.trtcLogin({ userID, userSig });
        }
      },
      immediate: true
    },
    currentRole: {
      handler(nl, ol) {
        if (nl) {
          this.$store.dispatch('cloudbase/login');
        }
      },
      deep:true,
      immediate:true
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
  top: 50%;
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
  width: 100%;
  height: 100%;
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
    ::v-deep .ant-popover-inner-content {
      padding: 4px;
    }
    ::v-deep .message-list {
      .message-item {
        display: flex;
        align-items: center;
        width: 280px;
      }
      .message-avatar {
        width: 50px;
        height: 50px;
        padding: 5px;
      }
      .message-content {
        width: calc(100% - 50px);
        padding: 6px;
      }
      .message-title {
        padding: 4px 0;
        color: #121212;
        font-weight: 700;
      }
    }
    & ~ .app-main {
      padding-top: 60px;
    }
  }
}
.hasTag {
  .nav-wrapper {
    border-bottom-color: #e7e7e7;
  }
  .fixed-header {
    & ~ .app-main {
      padding-top: 106px;
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
  .aside-container {
    width: 0;
  }
  .horizontal-nav {
    background: #293348;
    color: #f1f1f1;
    height: 60px;
    line-height: 60px;
  }
  .main-container {
    margin-left: 0;
    width: 100%;
  }
  .fixed-header {
    width: 100%;
  }
  .nav-wrapper {
    border-bottom: none;
  }
  .nav-user {
    background: #293348;
  }
}
</style>
