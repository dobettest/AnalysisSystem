import router, { baseRoute } from './router';
// import { getCache } from '@/utils/session';
import getPageTitle from '@/utils/getPageTitle';
import store from '@/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration
router.beforeEach(async function (to, from, next) {
  try {
    NProgress.start();
    document.title = getPageTitle(to.meta.title);
    switch (true) {
      case baseRoute.some(v => to['path'].startsWith(v['path']))://基本路由不限制
        next();
        break;
      case !!store.getters['token']://已登录
        let user = store.getters['userInfo'];
        if (user) {
          next();
        } else {
          await store.dispatch('user/getUserInfo');
          next({ ...to, replace: true });
        }
        break;
      default:
        next('/home');
        break;
    }
  } catch (error) {
    next('/home');
  }
});

router.afterEach(() => {
  NProgress.done();
});
