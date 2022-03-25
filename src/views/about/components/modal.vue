<template>
  <a-modal
    :visible="visible"
    :title="resolveTitle"
    @cancel="$emit('close')"
    :footer="null"
    :width="width"
    :maskClosable="false"
    :bodyStyle="{'padding': '0px' }"
  >
    <component :is="id" @change="change"> </component>
  </a-modal>
</template>

<script>
import hire from './hire';
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: 'hire'
    };
  },
  components: {
      hire
  },
  computed: {
    resolveTitle() {
      switch (this.id) {
        case 'hire':
          return '岗位招聘';
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
        case 'hire':
          return 1000;
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