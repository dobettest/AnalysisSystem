import router from './router';
import { getCache } from '@/utils/session';
import getPageTitle from '@/utils/getPageTitle';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { message } from 'ant-design-vue';
import store from './store';

NProgress.configure({ showSpinner: false }); // NProgress Configuration
const defaultTitle = 'Analysis-WebSite';
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title) || defaultTitle;
  const isLogin = getCache('USER_INFO');
  if (to.path == '/login') {
    next();
    NProgress.done();
  } else {
    if (!isLogin) {
      next('/login');
    } else {
      next();
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
