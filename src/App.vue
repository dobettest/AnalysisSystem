<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en');
export default {
  name: 'App',
  computed: {
    locale: {
      get() {
        return enUS;
      },
      set(lang) {
        moment.locale(lang);
        this.locale = lang;
      }
    }
  }
};
</script>
