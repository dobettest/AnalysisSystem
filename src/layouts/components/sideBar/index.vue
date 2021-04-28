<template>
  <div class="side-wrapper">
    <logo :collapse="collapsed" />
    <scroll-bar class="side-main">
      <a-menu
        :mode="mode"
        :inline-collapsed="!collapsed"
        theme="dark"
        :selectedKeys="[current]"
        :open-keys="openKeys"
        @click="handleClick"
        @openChange="changeOpen"
      >
        <a-sub-menu key="dashboard">
          <span slot="title"><svg-icon icon="dashboard" /><span style="margin-left:16px">仪表盘</span></span>
          <a-menu-item v-for="(item, index) in dashList" :key="'dashboard' + item.name">
            <router-link :to="{ name: 'dashboard', params: { name: item.name },query:{id:index} }">
              <span style="margin-left:16px" class="menu-title">{{ item.alia || item.name }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="database">
          <span slot="title"><svg-icon icon="database" /><span style="margin-left:16px">数据源</span></span>
          <a-menu-item v-for="(item, index) in dbList" :key="'database' + item.name">
            <router-link :to="{ name: 'database', params: { name: item.name }, query: { id: index } }">
              <span style="margin-left:16px" class="menu-title">{{ item.alia || item.name }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="diy">
          <span slot="title"><svg-icon icon="diy" /><span style="margin-left:16px">个性化</span></span>
          <a-menu-item v-for="(item, index) in dbList" :key="'diy' + index"> </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </scroll-bar>
  </div>
</template>

<script>
import logo from './logo';
import subMenu from './subMenu';
import menuItem from './menuItem';
import { mapGetters } from 'vuex';
import { getCache } from '@/utils/session';
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
      openKeys: [],
      current: 'dashboardsystem'
    };
  },
  computed: {
    ...mapGetters(['baseRoute']),
    ...mapGetters(['dbList']),
    ...mapGetters(['dashList'])
  },
  watch: {
    $route(to, from) {
      let { name, params } = this.$route;
      var str = name;
      Object.keys(params).forEach(key => {
        str += params[key];
      });
      this.current = str;
      console.log(str);
    }
  },
  async mounted() {
    /*let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
    if (matched.length > 1) {
      this.openKeys = matched.map(item => {
        let { name, meta, params } = item;
        delete meta['icon'];
        return { name, meta, params };
      });
    }*/
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
    },
    handleClick(e) {
      this.current = e.key;
    }
  }
};
</script>
