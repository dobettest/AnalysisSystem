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
import mainLayout from '@/layouts/mainLayout';
import echartRouter from './modules/echarts';
import componentsRouter from './modules/components';

//基础路由
export const baseRoute = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error/500'),
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true,
    children: [
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
      echartRouter,
      componentsRouter,
      {
        name: 'userInfo',
        path: '/userInfo',
        component: () => import('@/views/userInfo/index'),
        meta: { title: 'userSystem', icon: 'user' }
      },
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
            name: 'roleManage',
            path: '/memberManage/roleManage',
            component: () => import('@/views/memberManage/roleManage/index'),
            meta: { title: 'roleManage' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = function () {
  return new VueRouter({
    routes: baseRoute,
    scrollBehavior: () => ({ y: 0 })
  });
};

const router = createRouter();

export function resetRouter() {
  return new Promise((resolve, reject) => {
    let matcher = createRouter().matcher;
    router.matcher = matcher;
    resolve();
  })
}

export default router;
