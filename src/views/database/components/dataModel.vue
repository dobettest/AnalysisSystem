<template>
  <a-modal :title="mode" :visible="visible" @ok="handleSure" @cancel="$emit('cancel')" okText="确认" cancelText="取消">
    <a-form-model :model="ownModel" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-model-item :label="key" v-for="(key, index) in modelKeys" :key="index">
        <a-input v-model="ownModel[key]" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { addTable } from '@/api/user';
import { mapGetters } from 'vuex';
export default {
  props: {
    model: [Object, null],
    visible: {
      type: Boolean,
      required: true
    },
    table: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mode: '',
      ownModel: Object.assign({}, this.model)
    };
  },
  mounted() {
    let flag = Object.values(this.ownModel).every(v => v === '');
    this.mode = flag ? '新增' : '编辑';
  },
  computed: {
    ...mapGetters(['userInfo']),
    modelKeys() {
      return Object.keys(this.ownModel);
    }
  },
  methods: {
    handleSure() {
      let { username } = this.userInfo;
      let { ownModel, table, mode } = this;
      if (mode == '新增') {
        addTable({ username, table, item: ownModel }).then(() => {
          this.$message.success('添加成功');
          this.$emit('ok');
        });
      }
    }
  }
};
</script>

<style scoped></style>
