<template>
  <a-form-model :model="form" :rules="rules" ref="form">
    <a-form-model-item prop="phone">
      <a-input v-model="form.phone" placeholder="请输入手机号" size="large" allow-clear :maxLength="11" type="text">
        <my-svg-icon icon="phone" :size="14" slot="prefix"></my-svg-icon>
      </a-input>
    </a-form-model-item>
    <a-form-model-item prop="code" ref="code" :autoLink="false">
      <a-col :span="10">
        <a-input
          v-model="form.code"
          placeholder="请输入验证码"
          size="large"
          :maxLength="6"
          ref="code"
          @blur="
            () => {
              $refs.code.onFieldBlur();
            }
          "
        ></a-input>
      </a-col>
      <a-col :span="6" :offset="1">
        <a-button size="large" @click="getCode" :disabled="disabled">
          {{ codeText }}
        </a-button>
      </a-col>
    </a-form-model-item>
    <a-form-model-item style="margin-top: -7px; margin-bottom: 7px">
      <a-button type="primary" block size="large" @click="validate">{{ okText }}</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { phone } from '@/utils/validate.js';
import { getCodeByPhone } from '@/api/user';
const phoneValidator = function (rule, value, callback) {
  if (!phone.test(value)) {
    callback('请输入正确的手机号码');
  } else {
    callback();
  }
};
const codeValidator = function (rule, value, callback) {
  if (!value) {
    callback('验证码不能为空');
  } else {
    callback();
  }
};
export default {
  props: {
    okText: {
      type: String,
      default: 'OK'
    },
    TemplateId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        phone: '',
        code: ''
      },
      codeText: '获取验证码',
      disabled: false,
      rules: {
        phone: [{ required: true, trigger: 'blur', validator: phoneValidator }],
        code: [{ required: true, trigger: 'blur', validator: codeValidator }]
      }
    };
  },
  methods: {
    getCode() {
      getCodeByPhone({
        TemplateId: this.TemplateId,
        phone: this.form['phone']
      }).then(() => {
        let begin = 60;
        let timer = setInterval(() => {
          switch (true) {
            case begin > 0:
              this.codeText = `${--begin}秒后重新获取`;
              this.disabled = true;
              break;
            default:
              this.codeText = '获取验证码';
              this.disabled = false;
              clearInterval(timer);
              break;
          }
        }, 1000);
      });
    },
    validate() {
      this.$refs.form.validate(valid => {
        switch (valid) {
          case true:
            this.$emit('success', this.form);
            break;
          default:
            return false;
        }
      });
    }
  }
};
</script>

<style>
</style>