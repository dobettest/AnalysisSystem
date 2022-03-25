<template>
  <section class="login-container">
    <a-form-model :model="form" :rules="rules" class="form-container" ref="form">
      <a-tabs v-model="currentTab" class="tabs" :tabBarGutter="35">
        <a-tab-pane key="user" tab="账号密码登录">
          <a-form-model-item prop="account">
            <a-input
              v-model.trim="form.account"
              placeholder="请输入账号(手机号/ID)"
              size="large"
              allow-clear
              @pressEnter="focusPassword"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input
              v-model="form.password"
              placeholder="请输入密码"
              size="large"
              type="password"
              autocomplete
              allow-clear
              @pressEnter="validate"
              ref="password"
            >
              <a-icon type="lock" slot="prefix"></a-icon>
            </a-input>
          </a-form-model-item>
          <a-form-item style="margin-top: -7px; margin-bottom: 7px">
            <a-button type="primary" block size="large" :loading="loading" @click="validate">登录</a-button>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="phone" tab="手机号登录">
          <phone-box okText="登录" TemplateId="748383" @success="loginByPhone"></phone-box>
        </a-tab-pane>
      </a-tabs>
    </a-form-model>
    <div slot="footer" class="flex-box">
      <div style="float: left; flex-grow: 1">
        <a-checkbox
          v-model="form.remember"
          v-if="currentTab === 'user'"
          style="float: left; line-height: 40px"
          class="del-text"
          >记住密码</a-checkbox
        >
        <div
          class="hover-box del-text"
          style="float: left; line-height: 40px; cursor: pointer"
          @click="$emit('change', 'forgetPwd')"
        >
          <span style="padding: 0 6px">找回密码</span>
        </div>
      </div>
      <dl style="float: right; margin: 0" class="flex-box">
        <dt class="transform-trigger" style="margin-right: 4px">
          <b>其他登录方式</b>
        </dt>
        <dd class="flex-box">
          <my-svg-icon icon="qq" :size="25" style="margin: 0 4px; cursor: pointer"></my-svg-icon>
        </dd>
      </dl>
    </div>
  </section>
</template>

<script>
import { getCache, setCache, removeCache } from '@/utils/session';
import { checkCodeByPhone } from '@/api/user';
import phoneBox from '@/components/phone-box';
const validateuserID = (rule, value, callback) => {
  if (value.trim().length === 0) {
    callback('用户名不能为空');
  } else {
    callback();
  }
};
const validatePassword = (rule, value, callback) => {
  if (!value) {
    callback('密码不能为空');
  } else {
    callback();
  }
};
export default {
  name: 'login-form-modal',
  components: {
    phoneBox
  },
  data() {
    return {
      currentTab: 'user',
      form: {
        account: '',
        password: '',
        remember: true
      },
      rules: {
        account: [{ required: true, trigger: 'blur', validator: validateuserID }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false
    };
  },
  mounted() {
    const cache = getCache('LOGIN_INFO');
    if (cache) {
      this.form.account = cache.account;
      this.form.password = cache.password;
    }
  },
  methods: {
    focusPassword() {
      this.$refs.password.focus();
    },
    loginByPhone(form) {
      checkCodeByPhone(form).then(() => {
        this.$store.dispatch('user/loginByPhone', form['phone']);
      });
    },
    async login() {
      let { account, password } = this.form;
      await this.$store.dispatch('user/login', { account, password });
      this.$router.push('/index');
    },
    //登录
    validate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    }
  }
};
</script>