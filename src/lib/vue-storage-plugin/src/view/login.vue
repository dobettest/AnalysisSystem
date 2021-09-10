<template>
  <div class="login-container">
    <div class="login-inner-container">
      <div class="logo-wrapper">{{ currentPath }}</div>
      <a-form-model :model="loginForm" class="login-form">
        <a-form-model-item prop="username">
          <a-input v-model="loginForm.userID" placeholder="请输入账号(手机号/ID)" size="large" allow-clear></a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input-password
            v-model="loginForm.password"
            placeholder="请输入密码"
            size="large"
            allow-clear
          ></a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" block size="large" @click="toLogin">登录</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    toLogin() {
      //this.$store.dispatch("user/setToken")
    }
  },
  computed: {
    ...mapState({
      currentPath: state => state.fileModule.currentPath
    })
  }
};
</script>

<style lang="scss">
.login-container {
  position: relative;
  height: 100%;
  .login-inner-container {
    position: absolute;
    width: 480px;
    height: 300px;
    left: calc(50% - 240px);
    top: calc(50% - 150px);
  }
}
</style>