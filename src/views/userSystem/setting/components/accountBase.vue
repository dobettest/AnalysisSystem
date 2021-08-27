<template>
  <div class="card-container">
    <div class="card-head">
      <span class="card-title">
        <span>{{ $t('common.baseInfo') }}</span>
      </span>
      <span class="card-extra">
        <svg-icon :icon="editable ? 'edited' : 'edit'" @click.native="editable=!editable"></svg-icon>
      </span>
    </div>
    <div :class="['card-body', { mask: editable }]">
      <a-form-model
        :model="accountForm"
        :rules="accountRule"
        class="account-from"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        ref="accountForm"
        hideRequiredMark
      >
        <a-form-model-item prop="avatarUrl" :label="$t('common.avatar')">
          <avatar-upload
            :avatarUrl="accountForm.avatar"
            @change="updateAvatar"
            v-model="accountForm.avatar"
          ></avatar-upload>
        </a-form-model-item>
        <a-form-model-item prop="username" :label="$t('common.username')" hasFeedback>
          <a-input v-model="accountForm.username" placeholder="请输入用户名" allow-clear />
        </a-form-model-item>
        <a-form-model-item :label="$t('common.role')">
          <a-input v-model="accountForm.role" disabled />
        </a-form-model-item>
        <a-form-model-item prop="position" :label="$t('common.job')" hasFeedback>
          <a-input v-model="accountForm.position" allow-clear />
        </a-form-model-item>
        <a-form-model-item prop="location" :label="$t('common.city')">
          <a-input v-model="accountForm.location" allow-clear />
        </a-form-model-item>
        <a-form-model-item prop="label" :label="$t('common.signature')">
          <a-textarea
            v-model="accountForm.label"
            placeholder="请输入个人介绍..."
            :autoSize="{ minRows: 4, maxRows: 7 }"
          />
        </a-form-model-item>
        <a-form-item class="text-center">
          <a-button type="primary" @click="updateValue" :loading="loading"> {{ $t('common.submit') }} </a-button>
          <a-button style="margin-left: 25px" @click="resetFrom"> {{ $t('common.cancel') }} </a-button>
        </a-form-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import avatarUpload from './avatar-upload';
import { editTable } from '@/api/userManage';
//import tim from '@/lib/tim';
export default {
  name: 'accountBase',
  components: { avatarUpload },
  data() {
    return {
      loading: false,
      accountForm: {},
      accountRule: {
        avatar: [{ required: true, trigger: 'blur' }],
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空！' }],
        position: [{ required: true, trigger: 'blur', message: '职位不能为空！' }],
        location: [{ required: true, trigger: 'blur', message: '请选择所在城市！' }],
        label: [{ required: true, trigger: 'blur', message: '个人介绍不能为空！' }]
      },
      editable: true
    };
  },
  computed: {
    ...mapState({
      accountInfo: state => {
        return { ...state.user.accountInfo };
      }
    })
  },
  mounted() {
    this.accountForm = this.accountInfo;
  },
  methods: {
    updateAvatar(avatarUrl) {
      this.accountForm.avatar = avatarUrl;
      console.log(this.accountForm.avatar);
    },
    changeSkill(key) {
      this.accountForm.skill = key.join(',');
    },
    updateValue() {
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          this.loading = true;
          const { username, position, location, label, skill, role, avatar } = this.accountForm;
          await editTable(this.accountForm);
          await this.$store.dispatch('user/updateInfo', { username, position, location, label, skill, role, avatar });
          // await tim.updateMyProfile({
          //   nick: username,
          //   avatar,
          //   selfSignature: label
          // });
          this.$message.success('修改成功！');
          this.loading = false;
        }
      });
    },
    resetFrom() {
      this.$refs.accountForm.resetFields();
    }
  }
};
</script>
