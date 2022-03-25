<template>
  <section>
    <a-tabs v-model="currentTab" class="tabs" :tabBarGutter="35">
      <a-tab-pane key="phone" tab="手机号验证">
        <phone-box okText="去重置" TemplateId="1187910" @success="next"></phone-box>
      </a-tab-pane>
      <a-tab-pane key="mail" tab="邮箱验证">
        <mail-box okText="去重置" :TemplateId="1187910" @success="next"></mail-box>
      </a-tab-pane>
    </a-tabs>
  </section>
</template>

<script>
import phoneBox from '@/components/phone-box';
import mailBox from '@/components/mail-box';
export default {
  name: 'forget-password-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    phoneBox,
    mailBox
  },
  data() {
    return {
      currentTab: 'phone'
    };
  },
  methods: {
    next(){
      this.$emit('change','resetPwd')
    }
  }
};
</script>