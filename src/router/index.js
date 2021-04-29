import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '@/layouts';
import mainLayout from '@/layouts/mainLayout';
import customRouter from './modules/custom';

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
  },
  {
    path: '/',
    component: Layout,
    redirect: {
      name:'dashboard',
      params:{
        name:'system'
      },
      query:{
        id:0
      }
    },
    hidden: true,
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/index/index'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard'
        },
        props: {
          name: null
        },
      },
      {
        name: 'database',
        path: '/database',
        component: () => import('@/views/database/index'),
        props: {
          name: null
        },
        meta: {
          title: '数据库',
          icon: 'database'
        }
      },
      customRouter
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
