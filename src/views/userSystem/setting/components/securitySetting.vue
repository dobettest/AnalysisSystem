<template>
  <a-form-model
    :model="securityFrom"
    :rules="securityRule"
    class="security-from"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    ref="securityFrom"
  >
    <a-form-model-item prop="password" label="登录密码">
      <a-row :gutter="24">
        <a-col :span="16">
          <a-input-password
            disabled
            ref="password"
            v-model="securityFrom.password"
            placeholder="请输入登录密码"
          />
        </a-col>
        <a-col :span="8">
          <a-button type="link" @click="changePassword('save')" v-if="passwordStatus == 'change'">
            修改
          </a-button>
          <div v-else>
            <a-button type="link">
              保存
            </a-button>
            <span style="margin-left:-5px">
              取消
            </span>
          </div>
        </a-col>
      </a-row>
    </a-form-model-item>
    <a-form-model-item prop="phone" label="绑定手机">
      <a-row :gutter="24">
        <a-col :span="16">
          <a-input placeholder="请输入手机号" disabled v-model="securityFrom.phone">
          </a-input>
        </a-col>
        <a-col :span="8">
          <a-button type="link">
            修改
          </a-button>
        </a-col>
      </a-row>
    </a-form-model-item>
    <a-form-model-item prop="email" label="绑定邮箱">
      <a-row :gutter="24">
        <a-col :span="16">
          <a-input placeholder="请输入邮箱账号" disabled v-model="securityFrom.email" />
        </a-col>
        <a-col :span="8">
          <a-button type="link">
            修改
          </a-button>
        </a-col>
      </a-row>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: 'securitySetting',
  data() {
    return {
      securityFrom: {
        password: '123456',
        phone: '13*****6666',
        email: '1364525***@qq.com'
      },
      showPhone: false,
      passwordStatus: 'change',
      securityRule: {}
    };
  },
  methods: {
    changePassword(val) {
      this.passwordStatus = val;
      if (val == 'save') {
        this.$refs.password.focus();
      }
    },
    changeEye() {
      this.showPhone = !this.showPhone;
    }
  }
};
</script>
