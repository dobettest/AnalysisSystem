<template>
  <a-modal :visible="visible" title="添加好友" @cancel="$emit('hide')" :bodyStyle="{ padding: '12px' }" :width="400">
    <a-form-model :model="form" labelAlign="left" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21}">
      <a-form-model-item label="ID" prop="to" required>
        <a-input v-model="form['to']" has-feedback>
          <a-icon type="search" slot="suffix"></a-icon>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-input v-model="form['remark']"></a-input>
      </a-form-model-item>
      <a-form-model-item label="分组" prop="groupName">
        <a-input v-model="form['groupName']"></a-input>
      </a-form-model-item>
      <a-form-model-item label="附言" prop="wording" style="margin-bottom:6px">
        <a-textarea v-model="form['wording']" :rows="4"></a-textarea>
      </a-form-model-item>
    </a-form-model>
    <a-button block type="primary" slot="footer" size="large">发送</a-button>
  </a-modal>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        to: '',
        remark: '',
        groupName: '',
        wording: '',
        source: ''
      }
    };
  }
};
</script>

<style></style>
