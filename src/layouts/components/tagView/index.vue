<template>
  <div class="tag-container">
    <a-tag :class="['tag', isActive ? 'active' : '']" v-for="(item, index) in tagList" :key="index">
      {{ item.name }}
    </a-tag>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      isActive: true
    };
  },
  computed: {
    ...mapGetters(['tagList'])
  },
  methods: {
    nextTag() {
      if (this.tagList.length === 0) {
      }
    }
  }
};
</script>

<style scoped lang="scss">
.tag-container {
  height: 46px;
  line-height: 46px;
  background-color: #fff;
  box-shadow: rgba(0, 21, 41, 0.08) 0px 1px 4px 0px;
  padding:0 25px;
  .tag {
    height: 32px;
    line-height: 32px;
    font-size: $--fz-sm;
  }
  .active {
    background-color: $--theme-active-bg;
    color: white;
  }
}
</style>
