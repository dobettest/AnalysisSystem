import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
//重定向时报错，用这个不让他报错
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};
import Layout from '@/layouts';
import baseLayout from '@/layouts/base';
import mainLayout from '@/layouts/mainLayout';
import echartRouter from './modules/echarts';
import componentsRouter from './modules/components';

//基础路由
export const baseRoute = [
  {
    name: 'home',
    path: '/home',
    component: baseLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index'),
      }
    ]
  },
  {
    name: 'solutions',
    path: '/solutions',
    component: baseLayout,
    redirect: '/',
    children: [
      {
        path: '/',
        component: () => import('@/views/solutions/index'),
      }
    ]
  },
  {
    name: 'about',
    path: '/about',
    component: baseLayout,
    redirect: '/',
    children: [
      {
        path: '/',
        component: () => import('@/views/about/index'),
      }
    ]
  },
  {
    path: '/403',
    component: () => import('@/views/error/403')
  },
  {
    path: '/404',
    component: () => import('@/views/error/404')
  },
  {
    path: '/500',
    component: () => import('@/views/error/500')
  }
];

export const asyncRoutes = [
  echartRouter,
  componentsRouter,
  {
    name: 'memberManage',
    component: mainLayout,
    path: '/memberManage',
    redirect: '/memberManage/userManage',
    meta: {
      title: 'memberManage',
      icon: 'memberManage'
    },
    children: [
      {
        name: 'userManage',
        path: '/memberManage/userManage',
        component: () => import('@/views/memberManage/userManage/index'),
        meta: { title: 'userManage' }
      },
      {
        name: 'role',
        path: '/memberManage/role',
        component: () => import('@/views/memberManage/role/index'),
        meta: { title: 'role' }
      }
    ]
  }
];
export const commonRoutes = [
  {
    name: 'index',
    path: '/index',
    component: () => import('@/views/index/index'),
    meta: {
      title: 'index',
      icon: 'dashboard'
    }
  },
  {
    name: 'icon',
    path: '/icon',
    component: () => import('@/views/icon/index'),
    meta: {
      title: 'icon',
      icon: 'icon'
    }
  },
  {
    name: 'storage',
    path: '/storage',
    component: () => import('@/views/storage/index'),
    meta: {
      title: 'storage',
      icon: 'storage'
    }
  },
  {
    name: 'im',
    path: '/im',
    component: () => import('@/views/chatRoom/index.vue'),
    meta: {
      title: 'im',
      icon: 'im'
    }
  },
  {
    name: 'userInfo',
    path: '/userInfo',
    component: () => import('@/views/userInfo/index'),
    meta: { title: 'userSystem', icon: 'user' }
  }
]
const routes = [
  ...baseRoute,
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/index',
    children: commonRoutes
  },
  { path: '*', redirect: '/404' }
]
const createRouter = function () {
  return new VueRouter({
    routes,
    scrollBehavior: () => ({ y: 0 })
  })
};

const router = createRouter();

export function resetRouter() {
  let matcher = createRouter().matcher;
  router.matcher = matcher;
}

export default router;
