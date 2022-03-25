<template>
  <a-modal
    :title="currentRow ? '编辑' : '新增'"
    :visible="dialogVisible"
    okText="确认"
    cancelText="取消"
    :width="620"
    :confirmLoading="loading"
    @ok="handleSure"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
  >
    <a-form-model
      :model="userForm"
      :rules="userRule"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
      ref="userForm"
      hideRequiredMark
    >
      <a-form-model-item prop="id" label="id" v-show="currentRow">
        <a-input v-model="userForm.id" disabled />
      </a-form-model-item>
      <a-form-model-item prop="username" label="用户名" hasFeedback>
        <a-input v-model="userForm.username" />
      </a-form-model-item>
      <a-form-model-item prop="password" label="密码" hasFeedback>
        <a-input-password v-model="userForm.password" />
      </a-form-model-item>
      <a-form-model-item prop="role" label="权限">
        <a-radio-group v-model="userForm.role">
          <a-radio v-for="(item, idx) in roleOption" :key="idx" :value="item">
            {{ item }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item prop="text" label="描述">
        <a-textarea v-model="userForm.text" placeholder="描述..." :autoSize="{ minRows: 3, maxRows: 5 }" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import {addTable } from '@/api/userManage';
import {updateUserInfo } from '@/api/user.js';
import { getRoles } from '@/api/role';
export default {
  name: 'userModel',
  props: {
    currentRow: [Object, null],
    dialogVisible: Boolean
  },
  data() {
    return {
      userRule: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空！' }],
        password: [{ required: true, trigger: 'blur', min: 6, message: '密码不能少于6位！' }],
        text: [{ required: true, trigger: 'blur', min: 5, message: '请至少输入五个字符描述！' }]
      },
      userForm: {
        role: ''
      },
      roleOption: [],
      loading: false
    };
  },
  async created() {
    let { data: roleOption } = await getRoles();
    this.roleOption = roleOption.map(r => {
      return r.role;
    });
  },

  mounted() {
    this.userForm = { ...this.currentRow };
  },
  methods: {
    handleSure() {
      this.$refs.userForm.validate(valid => {
        this.loading = true;
        if (valid) {
          if (this.currentRow) {
            //编辑
            updateUserInfo(this.userForm).then(() => {
              this.$message.success('修改成功!');
              this.loading = false;
              this.$emit('ok');
            });
          } else {
            //新增
            addTable(this.userForm).then(() => {
              this.$message.success('添加成功!');
              this.loading = false;
              this.$emit('ok');
            });
          }
        } else {
          this.loading = false;
        }
      });
    }
  }
};
</script>
