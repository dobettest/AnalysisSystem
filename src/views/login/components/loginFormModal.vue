<template>
  <a-modal
    title="登录"
    :visible="show"
    @cancel="$emit('hide')"
    :footer="null"
    :bodyStyle="{ 'padding-bottom': '6px', 'padding-top': '0px' }"
  >
    <a-form-model :model="loginForm" :rules="loginRules" class="form-container" ref="loginForm">
      <a-tabs v-model="currentTab" class="tabs" :tabBarGutter="35">
        <a-tab-pane key="user" tab="账号密码登录">
          <a-form-model-item prop="userID">
            <a-input
              v-model.trim="loginForm.userID"
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
              v-model="loginForm.password"
              placeholder="请输入密码"
              size="large"
              type="password"
              autocomplete
              allow-clear
              @pressEnter="toLogin"
              ref="password"
            >
              <svg-icon icon="password" :size="14" slot="prefix"> </svg-icon>
            </a-input>
          </a-form-model-item>
        </a-tab-pane>
        <a-tab-pane key="phone" tab="手机号登录">
          <a-form-model-item prop="phone">
            <a-input
              v-model="loginForm.phone"
              placeholder="请输入手机号"
              size="large"
              allow-clear
              :maxLength="11"
              type="text"
            >
              <svg-icon icon="phone" :size="14" slot="prefix"> </svg-icon>
            </a-input>
          </a-form-model-item>

          <a-form-model-item prop="code">
            <a-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
              size="large"
              :maxLength="6"
              style="width: 58%"
              ref="code"
              @pressEnter="toLogin"
            >
            </a-input>
            <a-button size="large" @click="getCode" :disabled="codeStatus" style="width: 35%; margin-left: 7%">{{
              phoneCode
            }}</a-button>
          </a-form-model-item>
        </a-tab-pane>
      </a-tabs>

      <a-form-item style="margin-top: -7px">
        <a-button type="primary" block size="large" :loading="loading" @click="toLogin"> 登录 </a-button>
      </a-form-item>
      <a-form-item style="margin-top: -7px; margin-bottom: 7px">
        <div style="float: left">
          <a-checkbox v-model="loginForm.remember" v-if="currentTab === 'user'" style="float: left; line-height: 40px"
            >记住密码</a-checkbox
          >
          <div
            class="hover-box"
            style="float: left; line-height: 40px; cursor: pointer; padding: 0 4px"
            @click="toRegister"
          >
            <span>注册</span>
          </div>
          <div class="hover-box" style="float: left; line-height: 40px; cursor: pointer">
            <span style="padding: 0 4px">找回密码</span>
          </div>
        </div>
        <dl style="float: right; margin: 0" class="flex-box">
          <dt class="transform-trigger" style="margin-right: 4px"><b>其他登录方式</b></dt>
          <dd class="flex-box">
            <svg-icon icon="qq" :size="25" style="margin: 0 4px; cursor: pointer"></svg-icon>
          </dd>
          <!-- <svg-icon icon="qq" :size="25" class="verticalMiddle"></svg-icon> -->
        </dl>
      </a-form-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { isPhone, isPassWord, isCode } from '@/utils/validate';
import { getCache, setCache, removeCache } from '@/utils/session';
import { getPhoneCode } from '@/api/user';
const validateuserID = (rule, value, callback) => {
  if (value.trim().length === 0) {
    callback(new Error('用户名不能为空'));
  } else {
    callback();
  }
};
const validatePassword = (rule, value, callback) => {
  if (!isPassWord(value)) {
    callback(new Error('请正确输入密码'));
  } else {
    callback();
  }
};
const validatePhone = (rule, value, callback) => {
  if (!isPhone(value)) {
    callback(new Error('手机号码有误，请重新填写'));
  } else {
    callback();
  }
};
const validateCode = (rule, value, callback) => {
  if (!isCode(value)) {
    callback(new Error('验证码有误，请重新填写'));
  } else {
    callback();
  }
};
export default {
  name: 'login-form-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentTab: 'user',
      loginForm: {
        userID: '',
        password: '',
        phone: '',
        code: '',
        remember: true
      },
      loading: false,
      phoneCode: '获取验证码',
      codeStatus: false,
      currentCode: null
    };
  },
  mounted() {
    const cache = getCache('LOGIN_INFO');
    if (cache) {
      this.loginForm.userID = cache.userID;
      this.loginForm.password = cache.password;
    }
  },
  computed: {
    loginRules() {
      {
        return this.currentTab === 'user'
          ? {
              userID: [{ required: true, trigger: 'blur', validator: validateuserID }],
              password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            }
          : {
              phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
              code: [{ required: true, trigger: 'blur', validator: validateCode }]
            };
      }
    }
  },
  methods: {
    toRegister() {
        // this.$bus.$emit('registerModal');
    },
    focusPassword() {
      this.$refs.password.focus();
    },
    //获取验证码
    getCode() {
      if (isPhone(this.loginForm.phone)) {
        this.codeStatus = true;
        let time = 60;
        var getPhoneIntval = setInterval(() => {
          if (time > 0) {
            time--;
            this.phoneCode = `重新获取(${time}s)`;
          } else {
            clearInterval(getPhoneIntval);
            getPhoneIntval = null;
            this.phoneCode = '获取验证码';
            this.codeStatus = false;
          }
        }, 1000);

        this.$refs.code.focus();
        getPhoneCode({ phone: this.loginForm.phone });
      } else {
        this.$message.error('请正确输入手机号');
      }
    },
    //登录
    toLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.currentTab === 'user') {
            const { userID, password } = this.loginForm;
            this.$store
              .dispatch('user/login', { userID, password })
              .then(async () => {
                if (this.loginForm.remember) {
                  setCache('LOGIN_INFO', { userID, password });
                  let path = '/index';
                  this.$router.push({
                    path: path
                  });
                  this.loading = false;
                } else {
                  removeCache('LOGIN_INFO');
                }
              })
              .catch(() => {
                setTimeout(() => {
                  this.loading = false;
                }, 500);
              });
          } else if (this.currentTab === 'phone') {
            const { phone, code } = this.loginForm;
            this.$store
              .dispatch('user/codeTest', { phone, code })
              .then(() => {
                removeCache('LOGIN_INFO');
                this.$router.push({
                  path: '/index'
                });
                this.loading = false;
              })
              .catch(() => {
                setTimeout(() => {
                  this.loading = false;
                }, 500);
              });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>