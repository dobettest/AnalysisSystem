<template>
  <a-drawer
    :title="$t('setting.globalSetting')"
    placement="right"
    :visible="settingVisible"
    @close="settingVisible = false"
    :width="325"
  >
    <section class="border-bottom">
      <h4 class="sub-title">{{ $t('setting.customSetting') }}</h4>
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
      <div class="item-setting flex justify-between">
        {{ $t('setting.tagView') }}
        <a-switch
          :checked="tagShow"
          :checked-children="$t('common.open')"
          :un-checked-children="$t('common.close')"
          @change="changeTag"
        />
      </div>
    </section>
    <section>
      <h4 class="sub-title">{{ $t('setting.communitySetting') }}</h4>
      <div class="item-setting flex justify-between">
        {{ $t('setting.bell') }}
        <a-switch
          :checked="bell"
          :checked-children="$t('common.open')"
          :un-checked-children="$t('common.close')"
          @change="changeBell"
        />
      </div>
      <div class="item-setting">
        <p>{{ $t('setting.allowType') }}</p>
        <a-select :options="allowTypes" :value="allowType" style="width: 120px;text-align:center" @change="changeAllow"></a-select>
      </div>
    </section>
    <section>
      <h4 class="sub-title">{{ $t('setting.securitySetting') }}</h4>
      <div class="item-setting flex justify-between">
        {{ $t('setting.bell') }}
        <a-switch
          :checked="tagShow"
          :checked-children="$t('common.open')"
          :un-checked-children="$t('common.close')"
          @change="changeTag"
        />
      </div>
      <div class="item-setting">
        <p>{{ $t('setting.allowType') }}</p>
        <a-select :options="allowTypes" :value="allowType" style="width: 180px" @change="changeLocale"></a-select>
      </div>
    </section>
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
      ],
      allowTypes: [
        {
          value: 'ALLOW_TYPE_ALLOW_ANY',
          label: '允许任何人'
        },
        {
          value: 'ALLOW_TYPE_NEED_CONFIRM',
          label: '需要我确认'
        },
        {
          value: 'ALLOW_TYPE_DENY_ANY',
          label: '禁止加好友'
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
    },
    bell: {
      get() {
        return this.$store.state.setting.bell;
      },
      set(value) {
        this.$store.dispatch('setting/changeSetting', { key: 'bell', value });
      }
    },
    allowType: {
      get() {
        return this.$store.state.setting.allowType;
      },
      set(value) {
        this.$store.dispatch('setting/changeSetting', { key: 'allowType', value });
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
    changeAllow(value) {
      this.allowType = value;
    },
    changeTheme(val) {
      this.theme = val.target.value;
    },
    changeBell(checked) {
      this.bell = checked;
    }
  }
};
</script>
<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
}
.sub-title {
  height: 24px;
  border-bottom: 1px solid #e7e7e7;
}
.item-setting {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
