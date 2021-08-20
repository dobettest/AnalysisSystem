import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

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
        name: 'meetingRoom',
        path: '/meetingRoom',
        component: () => import('@/views/meeting/index'),
        meta: {
          title: 'meeting',
          icon: 'meeting'
        }
      },
      {
        name: 'im',
        path: '/im',
        component: mainLayout,
        redirect: '/im/conversation',
        meta: {
          title: 'im',
          icon: 'im'
        },
        children: [
          {
            name: 'conversation',
            path: '/im/conversation',
            component: () => import('@/views/chatRoom/components/conversationList.vue'),
            meta: {
              title: 'conversation'
            }
          },
          {
            name: 'addressbook',
            path: '/im/addressbook',
            component: () => import('@/views/chatRoom/components/addressBook.vue'),
            redirect: '/im/addressbook/friendList',
            meta: {
              title: 'addressBook'
            },
            children: [
              {
                name: 'friendList',
                path: '/im/addressbook/friendList',
                component: () => import('@/views/chatRoom/components/friendList.vue'),
                meta: {
                  title: 'friendList'
                }
              },
              {
                name: 'groupList',
                path: '/im/addressbook/groupList',
                component: () => import('@/views/chatRoom/components/groupList.vue'),
                meta: {
                  title: 'groupList'
                }
              }
            ]
          }
        ]
      },
      echartRouter,
      componentsRouter,
      {
        name: 'userSystem',
        component: mainLayout,
        path: '/userSystem',
        redirect: '/userSystem/userInfo',
        meta: { title: 'userSystem', icon: 'user' },
        children: [
          {
            name: 'userInfo',
            path: '/userSystem/userInfo',
            component: () => import('@/views/userSystem/userInfo/index'),
            meta: { title: 'userInfo' }
          },
          {
            name: 'setting',
            path: '/userSystem/setting',
            component: () => import('@/views/userSystem/setting/index'),
            meta: { title: 'userSetting' }
          }
        ]
      },
      {
        name: 'system',
        component: mainLayout,
        path: '/system',
        redirect: '/system/userManage',
        meta: {
          title: 'system',
          icon: 'system'
        },
        children: [
          {
            name: 'userManage',
            path: '/system/userManage',
            component: () => import('@/views/system/userManage/index'),
            meta: { title: 'userManage' }
          },
          {
            name: 'roleManage',
            path: '/system/roleManage',
            component: () => import('@/views/system/roleManage/index'),
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
  router.matcher = createRouter().matcher;
}

//重定向时报错，用这个不让他报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default router;
