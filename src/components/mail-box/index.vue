<template>
  <a-form-model :model="form" :rules="rules" ref="form">
    <a-form-model-item prop="mail">
      <a-input v-model="form.mail" placeholder="请输入邮箱地址" size="large" allow-clear type="mail">
        <a-icon type="mail" slot="prefix"></a-icon>
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
import { mail } from '@/utils/validate.js';
import { getCodeByMail } from '@/api/user';
const mailValidator = function (rule, value, callback) {
  if (!mail.test(value)) {
    callback('请输入正确的邮箱地址');
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
      type: Number,
      required: true
    }
  },
  data() {
    return {
      form: {
        mail: '',
        code: ''
      },
      codeText: '获取验证码',
      disabled: false,
      rules: {
        mail: [{ required: true, trigger: 'blur', validator: mailValidator }],
        code: [{ required: true, trigger: 'blur', validator: codeValidator }]
      }
    };
  },
  methods: {
    getCode() {
      console.log(typeof this.TemplateId)
      getCodeByMail({
        TemplateId: this.TemplateId,
        mail: this.form['mail']
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
    validate(){
      this.$refs.form.validate(valid=>{
        switch (valid) {
          case true:
            this.$emit('success', this.form)
            break;
          default:
            return false;
        }
      })
    }
  }
};
</script>

<style>
</style>