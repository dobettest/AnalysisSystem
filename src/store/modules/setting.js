import { getCache, setCache } from '@/utils/session';
import { changeLocale } from '@/i18n';
const defaultSetting = {
  open: true,
  fixHeader: true,
  tagShow: true,
  settingVisible: false,
  layout: 'inline',
  theme: 'blue',
  locale: 'CN'
};
let state = getCache('_app_') || defaultSetting;
export const bootstrap = (options) => {
  return new Promise((resolve, reject) => {
    options['locale'] ? '' : options = defaultSetting;
    Object.keys(options).forEach(key => {
      if (state[key] !== options[key])
        state[key] = options[key];
    })
    let { theme, locale } = state;
    changeTheme(theme);
    changeLocale(locale);
    setCache('_app_', state);
    resolve();
  })
}
//切换主题
export const changeTheme = (color) => {
  const theme = document.getElementById('theme-style');
  const style = theme || document.createElement('link');
  style.href = `theme/${color}Theme.css`;

  if (!theme) {
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = 'theme-style';
    document.getElementsByTagName('head').item(0).appendChild(style);
  }
  document.getElementsByTagName('body')[0].className = `${color}Theme`;
  // 设置 css 变量
  document.getElementsByTagName('body')[0].style.setProperty('--color-primary', color);
}
const mutations = {
  TOGGLE_OPEN(state) {
    state.open = !state.open;
  },
  CHANGE_SETTING(state, { key, value }) {
    state[key] = value;
    setCache('_app_', state);
  }
};

const actions = {
  changeSetting({ commit }, setting) {
    commit('CHANGE_SETTING', setting);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
