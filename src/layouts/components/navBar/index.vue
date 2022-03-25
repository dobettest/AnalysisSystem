<template>
  <div class="nav-wrapper flex-box">
    <a-icon
      :type="collapsed ? 'menu-fold' : 'menu-unfold'"
      class="nav-fold boxHover flex-box"
      @click="toggleOpen"
      v-show="!horizontal"
    />

    <bread-crumb v-show="!horizontal" />
    <div class="right-menu flex-box">
      <a-tooltip placement="bottom">
        <template slot="title"> 系统设置 </template>
        <div class="right-menu-item boxHover" @click="changeVisible">
          <my-svg-icon icon="globalSetting" :size="23" />
        </div>
      </a-tooltip>
      <workstation-control />
      <a-popover placement="bottom" trigger="click" :getPopupContainer="getPopupContainer">
        <template slot="content">
          <dl class="message-list">
            <dt class="text-center border-bottom message-title"><h3>未读消息</h3></dt>
            <dd v-for="(item, idx) in conversationList" :key="idx" class="message-item hover">
              <my-badge :count="100" :offset="[-6, -4]" class="message-avatar flex-box">
                <a-avatar icon="user" shape="square" size="large"></a-avatar>
              </my-badge>
              <div class="message-content">
                <h4 v-text="conversationName(item)" style="color: #121212; font-size: 15px"></h4>
                <div class="text-elipise" v-text="messageForShow(item)" style="color: #8590a6; font-size: 14px"></div>
              </div>
            </dd>
          </dl>
          <div class="clearfix" style="border-top: 1px solid #ebebeb; padding: 6px; color: #8590a6">
            <router-link style="float: right; cursor: pointer" to="/im"
              >查看全部<a-icon type="right-circle" style="padding-left: 4px"></a-icon
            ></router-link>
          </div>
        </template>
        <div class="right-menu-item boxHover">
          <my-badge :count="unread" :offset="[-8, 5]">
            <p class="bell-container">
              <my-svg-icon icon="bell" :size="23" :class="{ notice }" />
            </p>
          </my-badge>
        </div>
      </a-popover>
      <nav-user class="right-menu-item boxHover flex-sub" />
    </div>
  </div>
</template>

<script>
import navUser from './navUser';
import screenfull from 'screenfull';
import breadCrumb from './breadCrumb';
import workstationControl from './workstation-control';
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
  components: { navUser, breadCrumb, workstationControl },
  data() {
    return {
      isFullscreen: false,
      notice: false
    };
  },
  computed: {
    unread() {
      return this.$store.state.tim.unread;
    },
    conversationList() {
      return this.$store.state.tim.conversationList;
    }
  },
  methods: {
    getPopupContainer() {
      return this.$parent.$refs.headerBar;
    },
    conversationName: function (conversation) {
      if (conversation.type === TIM.TYPES.CONV_C2C) {
        return conversation.userProfile.nick || conversation.userProfile.userID;
      }
      if (conversation.type === TIM.TYPES.CONV_GROUP) {
        return conversation.groupProfile.name || conversation.groupProfile.groupID;
      }
      if (conversation.type === TIM.TYPES.CONV_SYSTEM) {
        return '系统通知';
      }
      return '';
    },
    messageForShow(conversation) {
      if (conversation.lastMessage.isRevoked) {
        if (conversation.lastMessage.fromAccount === currentUserProfile.userID) {
          return '你撤回了一条消息';
        }
        if (conversation.type === TIM.TYPES.CONV_C2C) {
          return '对方撤回了一条消息';
        }
        return `${conversation.lastMessage.fromAccount}撤回了一条消息`;
      }
      return conversation.lastMessage.messageForShow;
    },
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
    padding: 0 10px 0 18px;
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
  .bell-container {
    width: 35px;
  }
}
</style>
