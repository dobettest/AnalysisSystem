<template>
  <a-modal
    :visible="visible"
    :title="resolveTitle"
    @cancel="$emit('close')"
    :footer="null"
    :width="width"
    :maskClosable="false"
    :bodyStyle="{ 'padding-bottom': '6px', 'padding-top': '0px' }"
  >
    <component :is="id" @change="change"> </component>
  </a-modal>
</template>

<script>
import login from './components/login-box.vue';
import forgetPwd from './components/forget-password';
import resetPwd from '@/components/reset-password';
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    initKey: {
      type: String
    }
  },
  data() {
    return {
      id: 'login'
    };
  },
  components: {
    login,
    forgetPwd,
    resetPwd
  },
  computed: {
    resolveTitle() {
      switch (this.id) {
        case 'login':
          return '登录';
        case 'register':
          return '注册';
        case 'forgetPwd':
          return '重置验证';
        case 'resetPwd':
          return '密码重置';
        default:
          return '默认提示框';
      }
    },
    width() {
      switch (this.id) {
        case 'login':
          return 500;
        case 'register':
          return 800;
        case 'resetPwd':
        case 'forgetPwd':
          return 500;
        default:
          return 460;
      }
    }
  },
  mounted() {
    if (this.initKey) {
      this.id = this.initKey;
    }
  },
  methods: {
    change(key) {
      this.id = key;
    }
  }
};
</script>