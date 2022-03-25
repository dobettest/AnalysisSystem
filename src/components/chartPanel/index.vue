<template>
  <a-card :title="title" :hoverable="true" :bordered="false">
    <div slot="extra">
      <my-svg-icon icon="screencut"></my-svg-icon>
      <my-svg-icon icon="excel"></my-svg-icon>
    </div>
    <div style="width: 100%; height: 300px" ref="Chart">
      <slot></slot>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'chart-panel',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
