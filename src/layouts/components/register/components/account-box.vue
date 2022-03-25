<template>
  <a-form-model :model="form" :rules="rules" ref="form">
    <a-form-model-item prop="userID">
      <a-tooltip placement="right" trigger="focus" overlayClassName="reset-tooltip">
        <template slot="title">
          <div class="clearfix">
            <span class="tip-icon"><b>•</b></span>
            <p class="tip-text">(数字|英文)[组合]5-50个字符</p>
          </div>
          <div class="clearfix">
            <span class="tip-icon"><b>•</b></span>
            <p class="tip-text">请勿包含身份证/银行卡等隐私信息，一旦设置成功无法修改</p>
          </div>
        </template>
        <a-input size="large" v-model="form['userID']" placeholder="请设置账号名称">
          <a-icon type="user" slot="prefix"></a-icon>
        </a-input>
      </a-tooltip>
    </a-form-model-item>
    <a-form-model-item prop="password">
      <a-tooltip placement="bottomLeft" trigger="focus" overlayClassName="reset-tooltip">
        <template slot="title">
          <div class="clearfix">
            <span class="tip-icon error"
              ><a-icon :type="similar ? 'close-circle' : 'check-circle'" :class="{ success: !similar }"
            /></span>
            <p class="tip-text">6-20个字符，密码不能是相同的用户名</p>
          </div>
          <div class="clearfix">
            <span class="tip-icon error"><a-icon type="close-circle" /></span>
            <p class="tip-text">只能包含字母、数字以及标点符号（除空格）</p>
          </div>
          <div class="clearfix">
            <span class="tip-icon error"><a-icon type="close-circle" /></span>
            <p class="tip-text">字母、数字和标点符号至少包含2种</p>
          </div>
        </template>
        <a-input-password size="large" placeholder="请设置登录密码" v-model="form['password']">
          <a-icon type="lock" slot="prefix"></a-icon>
        </a-input-password>
      </a-tooltip>
    </a-form-model-item>
    <a-form-model-item prop="repassword">
      <a-input-password size="large" placeholder="请再次输入密码" v-model="form['repassword']">
        <a-icon type="lock" slot="prefix"></a-icon>
      </a-input-password>
    </a-form-model-item>
    <a-form-model-item prop="code" class="flex-box">
      <a-col :span="10">
        <a-input size="large" placeholder="请输入验证码" allow-clear v-model="form['code']"> </a-input
      ></a-col>
      <a-col :span="6" :offset="1">
        <img :src="imgCode['img']" style="width: 100%; cursor: pointer" alt="" @click="genImgCode" />
      </a-col>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" block size="large" @click="register"> 注册 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { getImgCode } from '@/api/user';
import img from '@/assets/wx.png';
const userIDValidator = function (rule, value, callback) {
  const illegal = /#|[~～]|[!！]|[?？]|\.\.|--|__|－|＿|※|▲|△| |@/g;
  const malWord = value && value.match(illegal);

  if (value.length < 5 || value.length > 50) {
    callback('会员名中文为5-25个字符，英文5-50个字符');
  } else if (malWord) {
    callback('该会员名包含了非法字符，请重新输入');
  }
};
const passwordValidator = function (rule, value, callback) {
  const illegal = /#|[~～]|[!！]|[?？]|\.\.|--|__|－|＿|※|▲|△| |@/g;
  const malWord = value && value.match(illegal);
  const length = !value ? 0 : value.replace(/[^\x00-\xff]/g, '**').length;
  const allNumber = value && /^\d+$/.test(value);

  if ((value && length < 5) || (value && length > 50) || allNumber) {
    callback('会员名中文为5-25个字符，英文5-50个字符');
  } else if (malWord) {
    callback('该会员名包含了非法字符，请重新输入');
  } else {
    callback();
  }
};
export default {
  name: 'account-register-box',
  data() {
    return {
      form: {
        userID: '',
        password: '',
        repassword: '',
        code: ''
      },
      img,
      imgCode: {
        checkid: 0,
        img: ''
      },
      similar: false,
      rules: {
        userID: [{ required: true, trigger: 'blur', validator: userIDValidator }],
        password: [{ required: true, trigger: 'change', validator: passwordValidator }]
      }
    };
  },
  methods: {
    async genImgCode() {
      const imgCode = await getImgCode();
      this.imgCode = imgCode;
    },
    async register() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('true');
        } else {
          console.log('false');
          return false;
        }
      });
    }
  },
  created() {
    this.genImgCode();
  }
};
</script>

<style>
</style>