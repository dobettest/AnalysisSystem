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
    <a-form-model :model="Form" :rules="rules" ref="form">
      <a-form-model-item prop="folder">
        <a-input v-model="Form.folder" allow-clear />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { files } from '../../../lib/storage';
import cloneDeep from 'lodash/cloneDeep';
export default {
  name: 'create-folder',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    current: {
      type: Object,
      required: true
    },
    creator: {
      type: String,
      require: true
    }
  },
  data() {
    const validateFolder = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('文件夹名称不能为空'));
      }
      if (value.length > 14) {
        callback(new Error('请输入1~14个字符'));
      }
      if (/\//.test(value)) {
        callback(new Error('请不要使用特殊字符/'));
      }
      if (this.current.files.some(f => f.fname === value)) {
        callback(new Error('同名文件夹已存在'));
      }
      callback(); //清除错误提示
    };
    return {
      Form: {
        folder: ''
      },
      rules: {
        folder: { required: true, trigger: 'blur', validator: validateFolder }
      },
      loading: false
    };
  },
  computed: {
    copyedCurrent() {
      return cloneDeep(this.current);
    }
  },
  methods: {
    handleSure() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;
          let now = new Date();
          let {
            Form: { folder },
            copyedCurrent,
            creator
          } = this;
          let obj = {
            cdate: [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            creator,
            dirname: copyedCurrent.dirname + '/' + folder,
            files: []
          };
          copyedCurrent['files'].push({
            cdate: [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            creator,
            ftype: 'folder',
            fname: folder,
            filesize:0,
            fileID: 'dir' + folder
          });
          await files
            .where({
              dirname: copyedCurrent['dirname']
            })
            .update({
              files: copyedCurrent['files']
            });
          await files.add(obj);
          this.loading = false;
          this.$emit('update');
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