<template>
  <section class="register-box flex-box">
    <div class="qrcode-container">
      <img :src="img" alt="" />
      <h2 class="other-title">使用微信扫码立即注册</h2>
      <p class="flex-box">
        <b class="text-underline theme-text"
          >其他注册方式
          <span class="split">:</span>
        </b>
        <my-svg-icon
          v-for="(item, idx) in others"
          @click="change(item['activeKey'])"
          :key="idx"
          :icon="item['icon']"
          :size="24"
          :overlayStyle="{ margin: '4px', cursor: 'pointer' }"
        ></my-svg-icon>
      </p>
    </div>
    <div style="width: 55%; height: 100%">
      <phone-box
        okText="注册"
        v-if="activeKey === 'phone-box'"
        @success="registerByPhone"
        :TemplateId="1202596"
      ></phone-box>
      <account-box v-else-if="activeKey === 'account-box'"></account-box>
      <mail-box okText="注册" v-else @success="registerByEmail" :TemplateId="1202596"></mail-box>
    </div>
  </section>
</template>

<script>
import img from '@/assets/wx.png';
import phoneBox from '@/components/phone-box';
import mailBox from '@/components/mail-box';
import accountBox from './account-box';

import { checkCodeByMail, checkCodeByPhone } from '@/api/user';
const others = [
  {
    icon: 'qq',
    activeKey: 'qq'
  },
  {
    icon: 'phone-circle',
    activeKey: 'phone-box'
  },
  {
    icon: 'mail-circle',
    activeKey: 'mail-box'
  },
  {
    icon: 'password-circle',
    activeKey: 'account-box'
  }
];
export default {
  components: {
    phoneBox,
    accountBox,
    mailBox
  },
  data() {
    return {
      img,
      activeKey: 'account-box'
    };
  },
  computed: {
    others() {
      return others.filter(v => v.activeKey !== this.activeKey);
    }
  },
  methods: {
    registerByEmail(form) {
      checkCodeByMail(form).then(() => {
        this.$message.success('注册成功');
      });
    },
    registerByPhone(form) {
      checkCodeByPhone(form).then(() => {
        this.$message.success('注册成功');
      });
    },
    change(key) {
      switch (key) {
        case 'qq':
          break;
        default:
          this.activeKey = key;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.register-box {
  padding: 15px 8px;
  height: 100%;
  width: 100%;
}
.qrcode-container {
  height: 100%;
  width: 45%;
  text-align: center;
  border-right: 3px solid #a5a5a5;
  margin-right: 15px;
  padding: 20px;
  .other-title {
    margin: 12px 0 6px 0 !important;
  }
}
.step-bottom-group {
  display: flex;
  align-items: center;
  height: 48px;
  border-top: 1px solid #e8e8e8;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  .next-step-btn {
    position: absolute;
    right: 0px;
  }
}
.tip-icon {
  float: left;
  width: 21px;
  text-align: center;
  padding: 4px;
}
.tip-text {
  padding: 4px;
  margin-left: 21px;
  font-size: 14px;
}
.img-code {
  width: 100%;
  cursor: pointer;
}
</style>