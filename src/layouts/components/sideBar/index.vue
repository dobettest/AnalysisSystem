<!--
 * @Author: your name
 * @Date: 2021-03-21 19:28:18
 * @LastEditTime: 2021-04-03 21:34:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-antd-admin\src\layouts\components\sideBar\index.vue
-->
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
import { getChartList } from '@/api/user';
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
    ...mapGetters(['baseRoute']),
    dashboard() {
      return {
        name: 'index',
        path: '/index',
        component: () => import('@/views/index/index'),
        meta: {
          role: ['admin', 'test'],
          title: '仪表盘',
          icon: 'dashboard'
        }
      };
    }
  },
  async mounted() {
    let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
    if (matched.length > 1) {
      this.openKeys = matched.map(item => item.path);
    }
    await getChartList({ username: 'admin' }).then(data => {
      let { chartlist } = data;
      console.log(this.dashboard);
    });
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
