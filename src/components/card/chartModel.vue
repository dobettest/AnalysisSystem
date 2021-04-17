<template>
  <a-modal
    title="编辑"
    :visible="dialogVisible"
    okText="确认"
    cancelText="取消"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
    @ok="setOptions()"
  >
    <a-form-model :model="options" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" ref="roleFrom" hideRequiredMark>
      <a-form-model-item prop="name" label="名称" hasFeedback>
        <a-input v-model="options.name" />
      </a-form-model-item>
      <a-form-model-item prop="key" label="索引" hasFeedback>
        <a-select :default-value="keys[0]" v-model="options.key">
          <a-select-option :value="item" v-for="(item, index) in keys" :key="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item prop="cash" label="过滤器" hasFeedback>
        <a-input v-model="options.cash" placeholder="格式:key:value,多个用&分割" />
      </a-form-model-item>
      <a-form-model-item prop="range" label="范围" hasFeedback v-if="numberKey">
        <a-input placeholder="格式:min~max:'description',多个用&分割" v-model="options.range"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="type" label="类型" hasFeedback>
        <a-radio-group name="typeGroup" :default-value="options.type">
          <a-radio value="bar">
            bar
          </a-radio>
          <a-radio value="line">
            line
          </a-radio>
          <a-radio value="pie">
            pie
          </a-radio>
          <a-radio value="wordcloud">
            wordcloud
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { Random } from 'mockjs';
export default {
  props: {
    option: {
      type: Object
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object
    }
  },
  data() {
    return {
      options: {},
    };
  },
  computed: {
    keys() {
      return Object.keys(this.model);
    },
    numberKey() {
      let { model } = this;
      let { key } = this.options;
      return Object.prototype.toString.call(model[key]) === '[object Number]';
    }
  },
  methods: {
    setOptions() {}
  },
  mounted() {
    this.options = this.option;
  }
};
</script>

<style scoped></style>
