<template>
  <header class="header" :class="{ fixed }">
    <div class="nav-list">
      <div class="flex-box logo-wrapper">
        <my-svg-icon class="logo-img" icon="logo" :size="45"></my-svg-icon>
        <p class="logo-title">{{ $t('common.programName') }}</p>
      </div>
      <router-link class="nav-item" to="/home" exact-active-class="exact-active-class">首页</router-link>
      <router-link class="nav-item" to="/solutions" exact-active-class="exact-active-class">解决方案</router-link>
      <router-link class="nav-item" to="/about" exact-active-class="exact-active-class">关于我们</router-link>
    </div>
    <div class="header-right flex-box">
      <dl class="international-wrapper">
        <dt class="flex-box inter-title">
          <my-svg-icon icon="international" :size="24" :overlayStyle="{ color: '#181818' }"></my-svg-icon
          ><span class="inter-name">{{ $t('common.locale') }}</span
          ><span class="arrow"></span>
        </dt>
        <dd class="inter-sub-wrapper">
          <div :class="['inter-item', locale === 'CN' ? 'active' : '']" @click="locale = 'CN'">简体中文</div>
          <div :class="['inter-item', locale === 'EN' ? 'active' : '']" @click="locale = 'EN'">English</div>
        </dd>
      </dl>
      <div style="margin: 0 12px" @click="$emit('openModal', 'login')">
        {{ $t('common.login') }}
      </div>
      <a-button type="primary" @click="$emit('openModal', 'register')" class="register-btn" size="large">
        <span><a-icon type="user-add" class="icon" />免费注册</span>
      </a-button>
    </div>
  </header>
</template>

<script>
import { changeLocale } from '@/i18n';
export default {
  name: 'home-header',
  data() {
    return {
      fixed: false
    };
  },
  computed: {
    locale: {
      get() {
        return this.$store.state.setting.locale;
      },
      set(value) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'locale',
          value
        });
        changeLocale(value);
      }
    }
  },
  mounted() {
    document.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    document.removeEventListener('scroll', this.scroll);
  },
  methods: {
    scroll(e) {
      this.$nextTick(() => {
        let sc = document.body.scrollTop || document.documentElement.scrollTop;
        this.fixed = sc > 70 ? true : false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fixed {
  background-color: #fff !important;
}
.exact-active-class {
  position: relative;
  &::after {
    display: block;
    width: 100%;
    content: ' ';
    position: absolute;
    bottom: 3px;
    border-bottom: 3px solid $color-primary;
  }
}
.header {
  display: flex;
  align-items: center;
  // background-color: #354060;
  background-color: hsla(0, 0%, 100%, 0.1);
  border-bottom: 1px solid rgba(61, 61, 61, 0.15);
  color: #181818;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 70px;
  z-index: 999;
  .nav-list {
    height: 100%;
    display: flex;
    align-items: center;
    flex-grow: 1;
    .logo-wrapper {
      padding: 12px 16px;
      font-size: 17px;
      .logo-title {
        padding-left: 8px;
        font-weight: 600;
      }
    }
    .nav-item {
      // color: #fff;
      color: #181818;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 17px;
      padding: 0 8px;
      cursor: pointer;
    }
  }
  .header-right {
    height: 70px;
    float: right;
    // color: #fff;
    .international-wrapper {
      // color: #fff;
      position: relative;
      cursor: pointer;
      height: 70px;
      margin: 0 8px;
      &:hover {
        // color: rgba(255, 255, 255, 0.85);
        .inter-sub-wrapper {
          display: block;
        }
        .arrow {
          transform: rotate(180deg);
          border-top-color: rgba(255, 255, 255, 0.85);
        }
      }
      .inter-title {
        display: flex;
        align-items: center;
        height: 70px;
        .inter-name {
          text-align: center;
          width: 70px;
          padding: 0 4px;
        }
      }
      .arrow {
        display: block;
        content: ' ';
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid #181818;
      }
      .inter-sub-wrapper {
        display: none;
        width: 120px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 70px;
        border-top: 1px solid rgba(255, 255, 255, 0.85);
        .inter-item {
          height: 28px;
          padding: 0 24px;
        }
        .inter-item:hover {
          // color: #fff;
        }
        .inter-item.active {
          color: $color-primary;
        }
      }
    }
    .register-btn {
      margin-left: 16px;
      width: 140px;
      height: 100%;
      .icon {
        font-size: 20px;
        padding: 6px;
      }
    }
  }
}
</style>