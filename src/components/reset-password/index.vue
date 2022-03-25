<template>
  <a-form-model style="padding-top: 15px" :model="form" :rules="rules" ref="form">
    <a-form-model-item prop="password">
      <a-input-password size="large" @change="passwordInput" v-model="form['password']">
        <a-icon type="lock" slot="prefix"></a-icon>
      </a-input-password>
    </a-form-model-item>
    <a-form-model-item prop="repassword">
      <a-input-password size="large" v-model="form['repassword']">
        <a-icon type="lock" slot="prefix"></a-icon>
      </a-input-password>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" block size="large" @click="reset">重置密码</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { allNumber, allLetter, allCharacter } from '@/utils/validate';
const passwordValidator = function (rule, value, callback) {
  if (!value) {
    callback('密码不能为空');
  } else {
    callback();
  }
};
export default {
  name: 'reset-password',
  data() {
    const repasswordValidator = (rule, value, callback) => {
      if (!value) {
        callback('密码不能为空');
      } else if (value !== this.form['password']) {
        callback('两次密码不一致');
      } else {
        callback();
      }
    };
    return {
      form: {
        password: '',
        repassword: ''
      },
      security: 0,
      status: 'success',
      rules: {
        password: [{ required: true, trigger: 'blur', validator: passwordValidator }],
        repassword: [{ required: true, trigger: 'blur', validator: repasswordValidator }]
      }
    };
  },
  methods: {
    passwordInput() {
      let security = 0;
      let value = this.form['password'];
      switch (true) {
        case value.length > 0:
          security += 30;
        case /[-+=|,!@#$%^&*?_~+\/\\(){}\[\]<>]+/.test(value):
          console.log('char');
          security += 20;
          break;
        case /[a-zA-Z]/.test(value):
          security += 20;
        case value.length > 6:
          security += 30;
        default:
          break;
      }
      console.log('security', security, /[-+=|,!@#$%^&*?_~+\/\\(){}\[\]<>]+/.test(value));
      this.security = security;
    },
    reset() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.$emit('success');
          this.$message.success('valid')
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>