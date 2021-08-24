<template>
  <a-drawer
    :title="$t('setting.customSetting')"
    placement="right"
    :visible="settingVisible"
    @close="settingVisible = false"
    :width="325"
  >
    <div class="item-setting">
      <p>{{ $t('setting.theme') }}</p>
      <a-radio-group button-style="solid" :value="theme" @change="changeTheme">
        <a-radio-button :value="item.key" v-for="item in customList" :key="item.key">
          {{ $t('setting.' + item.label) }}
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="item-setting">
      <p>{{ $t('setting.layout') }}</p>
      <a-radio-group :value="layout" button-style="solid" @change="changeLayout">
        <a-radio-button :value="item.key" v-for="item in layoutList" :key="item.key">
          {{ $t('setting.' + item.label) }}
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="item-setting">
      <p>{{ $t('setting.lang') }}</p>
      <a-select :options="langs" :value="lang" style="width: 180px" @change="changeLocale"></a-select>
    </div>

    <div class="item-setting flex justify-between">
      {{ $t('setting.tagView') }}
      <a-switch
        :checked="tagShow"
        :checked-children="$t('common.open')"
        :un-checked-children="$t('common.close')"
        @change="changeTag"
      />
    </div>
    <div class="item-setting flex justify-between">
      {{ $t('setting.fixedHeader') }}
      <a-switch
        :checked="fixHeader"
        :checked-children="$t('common.open')"
        :un-checked-children="$t('common.close')"
        @change="changeHeader"
      />
    </div>
  </a-drawer>
</template>

<script>
import { changeTheme } from '@/store/modules/setting';
import { changeLocale } from '@/i18n';
export default {
  name: 'setting',
  data() {
    return {
      visible: false,
      customList: [
        {
          key: 'blue',
          label: 'sky'
        },
        {
          key: 'yellow',
          label: 'sunset'
        },
        {
          key: 'green',
          label: 'grass'
        }
      ],
      layoutList: [
        {
          label: 'sideNav',
          key: 'inline'
        },
        {
          label: 'topNav',
          key: 'horizontal'
        }
      ],
      langs: [
        {
          value: 'En',
          label: 'EN English'
        },
        {
          value: 'CN',
          label: 'CN 简体中文'
        }
      ]
    };
  },
  computed: {
    theme: {
      get() {
        return this.$store.state.setting.theme;
      },
      set(color) {
        if (color === this.theme) {
          return;
        }
        this.$store.dispatch('setting/changeSetting', {
          key: 'theme',
          value: color
        });
        changeTheme(color);
      }
    },
    settingVisible: {
      get() {
        return this.$store.state.setting.settingVisible;
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', { key: 'settingVisible', value: val });
      }
    },
    layout: {
      get() {
        return this.$store.state.setting.layout;
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'layout',
          value: val
        });
      }
    },
    tagShow: {
      get() {
        return this.$store.state.setting.tagShow;
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'tagShow',
          value: val
        });
      }
    },
    fixHeader: {
      get() {
        return this.$store.state.setting.fixHeader;
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'fixHeader',
          value: val
        });
      }
    },
    lang: {
      get() {
        return this.$store.state.setting.locale;
      },
      set(value) {
        this.$store.dispatch('setting/changeSetting', { key: 'locale', value });
        changeLocale(value);
      }
    }
  },
  methods: {
    changeLocale(value) {
      this.lang = value;
    },
    changeTag(checked) {
      this.tagShow = checked;
    },
    changeHeader(checked) {
      this.fixHeader = checked;
    },
    changeLayout(val) {
      this.layout = val.target.value;
    },
    changeTheme(val) {
      this.theme = val.target.value;
    }
  }
};
</script>
<style lang="scss" scoped>
.item-setting {
  margin-bottom: 18px;
}
</style>
