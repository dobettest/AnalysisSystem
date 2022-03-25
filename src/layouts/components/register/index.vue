<template>
  <a-modal
    :visible="visible"
    title="注册"
    @cancel="$emit('close')"
    :footer="null"
    :width="800"
    :maskClosable="false"
    :destroyOnClose="true"
    :bodyStyle="{ 'padding-bottom': '6px', 'padding-top': '0px' }"
  >
    <dl>
      <dt class="flex-box step-title">
        <a-steps :current="current" slot="title">
          <a-step v-for="(item, idx) in steps" :key="idx" :title="item['title']"></a-step>
        </a-steps>
      </dt>
      <dd class="step-item">
        <component :is="key" @next="current++"></component>
      </dd>
    </dl>
  </a-modal>
</template>

<script>
import policy from './components/policy.vue';
import registerBox from './components/register-box.vue';
export default {
  name: 'registerModal',
  components: {
    policy,
    registerBox
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '用户条例'
        },
        {
          title: '注册账号'
        },
        {
          title: '安全绑定'
        }
      ]
    };
  },
  computed: {
    key() {
      switch (this.current) {
        case 0:
          return 'policy';
        case 1:
          return 'registerBox';
        default:
          return 'policy';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.step-title {
  height: 52px;
  padding: 10px 0;
}
.step-item {
  height: 368px;
  position: relative;
}
</style>