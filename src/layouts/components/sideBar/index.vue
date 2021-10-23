<template>
  <div class="side-wrapper">
    <logo :collapse="collapsed" />
    <scroll-bar class="side-main">
      <a-menu
        :mode="mode"
        :inline-collapsed="!collapsed"
        theme="dark"
        :selectedKeys="[$route.path]"
        :open-keys="openKeys"
        @openChange="changeOpen"
      >
        <template v-for="item in baseRoute">
          <menu-item v-if="!item.children && !item.hidden" :key="item.path" :currentRoute="item" />
          <template v-else v-for="temp in item.children">
            <menu-item v-if="!temp.children" :key="temp.path" :currentRoute="temp" />
            <sub-menu v-else :key="temp.path" :currentRoute="temp"></sub-menu>
          </template>
        </template>
      </a-menu>
    </scroll-bar>
  </div>
</template>

<script>
import logo from './logo';
import subMenu from './subMenu';
import menuItem from './menuItem';
import { mapGetters } from 'vuex';
export default {
  name: 'sideBar',
  props: {
    collapsed: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'inline'
    }
  },
  components: { logo, subMenu, menuItem },
  data() {
    return {
      openKeys: []
    };
  },
  computed: {
    ...mapGetters(['baseRoute'])
  },
  mounted() {
    let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
    if (matched.length > 1) {
      this.openKeys = matched.map(item => item.path);
    }
  },
  methods: {
    changeOpen(keys) {
      const currentOpenKey = keys.find(key => this.openKeys.indexOf(key) === -1);
      const children = this.baseRoute.filter(item => item.children);

      if (children[0].children.findIndex(item => item.path == currentOpenKey) === -1) {
        this.openKeys = keys;
      } else {
        this.openKeys = currentOpenKey ? [currentOpenKey] : [];
      }
    }
  }
};
</script>
<style lang="scss">
.logo-wrapper {
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 64px;
  display: inline-block;
  .logo-title {
    font-size: 1.2rem;
    color: #fff;
    font-weight: 600;
    margin-left: 12px;
    display: inline-block;
  }
}

.closeSide {
  .horizontalSide-wrapper {
    .logo-title {
      display: inline-block !important;
    }
    .menu-title {
      display: inline-block !important;
    }
  }
  .logo-title {
    display: none;
  }
  .menu-title {
    display: none;
  }
}

.side-wrapper {
  .side-main {
    width: 100%;
    height: calc(100% - 64px);
  }
  .ant-menu {
    background: rgb(41, 51, 72) !important;
  }
  .ant-menu-dark .ant-menu-inline.ant-menu-sub {
    background: rgb(19, 29, 48) !important;
    box-shadow: none !important;
  }
}

.horizontal {
  .side-wrapper {
    display: flex;
    .logo-wrapper {
      height: 60px;
      line-height: 60px;
      min-width: 250px;
    }
    .side-main {
      height: 100%;
      flex: auto;
      color: #fff;
    }
    /deep/ .ant-menu-horizontal {
      height: 60px !important;
      line-height: 60px;
    }
  }
}
</style>
