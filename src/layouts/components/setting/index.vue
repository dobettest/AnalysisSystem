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
          {{$t('setting.'+item.label)}}
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="item-setting">
      <p>{{ $t('setting.layout') }}</p>
      <a-radio-group :value="layout" button-style="solid" @change="changeLayout">
        <a-radio-button :value="item.key" v-for="item in layoutList" :key="item.key">
          {{$t('setting.'+item.label)}}
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
import { mapState } from 'vuex';
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
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'theme',
          value: val,
          cache: 'THEME'
        });
        document.getElementsByTagName('body')[0].className = `miscro-cloud-station-${val}Theme`;
      }
    },
    settingVisible: {
      get() {
        return this.$store.state.setting.settingVisible;
      },
      set(val) {
        this.$store.dispatch('setting/changeVisible', val);
      }
    },
    layout: {
      get() {
        return this.$store.state.setting.layout;
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'layout',
          value: val,
          cache: 'LAYOUT'
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
          value: val,
          cache: 'TAG_SHOW'
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
          value: val,
          cache: 'FIX_HEARDER'
        });
      }
    },
    ...mapState({ lang: state => state.setting.locale })
  },
  created() {
    if (this.theme) {
      document.getElementsByTagName('body')[0].className = `miscro-cloud-station-${this.theme}Theme`;
    }
  },
  methods: {
    changeLocale(value) {
      this.$store.dispatch('setting/changeLocale', value);
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
