<template>
  <a-modal
    title="新建文件夹"
    :visible="visible"
    okText="确认"
    cancelText="取消"
    :confirmLoading="loading"
    @ok="handleSure"
    @cancel="$emit('close')"
  >
    <a-form-model :model="form" :rules="rules" ref="form">
      <a-form-model-item prop="name">
        <a-input v-model="form['name']" allow-clear />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
const validateFolder = (rule, value, callback) => {
  switch (true) {
    case value.length === 0:
      callback(new Error('文件夹名称不能为空'));
      break;
    case value.length > 14:
      callback(new Error('请输入1~14个字符'));
    default:
      callback();
      break;
  }
};
export default {
  name: 'create-folder',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: ''
      },
      rules: {
        name: { required: true, trigger: 'blur', validator: validateFolder }
      },
      loading: false,
      validateFolder
    };
  },
  methods: {
    handleSure() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.$emit('createFolder', this.form['name']);
        } else {
          return false;
        }
      });
    }
  }
};
</script>