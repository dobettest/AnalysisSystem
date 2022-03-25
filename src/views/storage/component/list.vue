<template>
  <section class="file-list" >
    <ul v-if="source.length">
      <li
        v-for="(item, idx) in source"
        :key="idx"
        @click="$emit('itemClick', item)"
        :class="['file-item', { multiple, selected: multiple && selectedArr[idx]['flag'] }]"
      >
        <my-svg-icon :icon="item['ftype']" class="file-type"></my-svg-icon>
        <div class="file-name">{{ item.fname }}</div>
      </li>
    </ul>
    <div class="empty-container" v-else></div>
  </section>
</template>

<script>
export default {
  name: 'file-list',
  data() {
    return {
      selectedArr: []
    };
  },
  props: {
    source: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.file-list {
  height: 100%;
  .file-item {
    float: left;
    width: 80px;
    height: 80px;
    text-align: center;
    cursor: pointer;
    margin: 6px;
    position: relative;
    .file-type {
      font-size: 56px !important;
    }
    .file-name {
      user-select: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &.multiple {
      background-color: #f1f1f1;
      &::before {
        position: absolute;
        top: 4px;
        left: 4px;
        display: block;
        width: 16px;
        height: 16px;
        content: '';
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
    &.selected {
      background-color: #fafafa;
      &::before {
        position: absolute;
        top: 4px;
        left: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        content: '✓';
        border: 1px solid #fff;
        color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        background-color: $color-primary;
      }
    }
  }
}
.empty-container {
  height: 100%;
  background: center/contain url('~@/assets/empty.svg') no-repeat;
}
</style>