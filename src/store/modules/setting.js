import { getCache, setCache } from '@/utils/session';
import { changeLocale } from '@/i18n';
const state = {
  open: true,
  fixHeader: getCache('FIX_HEARDER') == null ? true : getCache('FIX_HEARDER'),
  tagShow: getCache('TAG_SHOW') == null ? true : getCache('TAG_SHOW'),
  settingVisible: false,
  layout: getCache('LAYOUT') || 'inline',
  theme: getCache('THEME') || 'blue',
  locale: getCache("Lang") || 'CN'
};

const mutations = {
  TOGGLE_OPEN(state) {
    state.open = !state.open;
  },
  CHANGE_SETTING(state, { key, value, cache }) {
    // eslint-disable-next-line
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      setCache(cache, value);
    }
  },
  CHANGE_VISIBLE(state, bool) {
    state.settingVisible = bool;
  },
  CHANGE_LOCALE(state, locale) {
    state.locale = locale;
    setCache("Lang", locale);
  }
};

const actions = {
  changeSetting({ commit }, setting) {
    commit('CHANGE_SETTING', setting);
  },
  changeVisible({ commit }, bool) {
    commit('CHANGE_VISIBLE', bool);
  },
  changeLocale({ commit }, locale) {
    commit('CHANGE_LOCALE', locale);
    changeLocale(locale);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
