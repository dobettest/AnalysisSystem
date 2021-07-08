<template>
    <div class="timeline-wrapper">
      <div class="dynamic-title">近期动态</div>
      <a-timeline class="padding24" mode="left" style="margin-top:35px">
        <a-timeline-item v-for="(item, index) in timelineList" :key="index" :color="item.color">
          <p>{{ item.time }}</p>
          {{ item.title }}
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dynamic',
  data() {
    return {
      timelineList: [
        {
          title: '学习下node写个后台，把这个项目后台写了',
          time: '以后...',
          color: 'red'
        },
        {
          title: '添加页面loading模块，方法有点low，写了很多个组件，看到可以用svg去时间loading动画，后续研究下再改进',
          time: '2020-12-23',
          color: 'gray'
        },
        {
          title: '异步加载AMap,去除本地的kriging',
          time: '2020-12-08',
          color: 'gray'
        },
        {
          title: '优化webpack',
          time: '2020-12-05',
          color: 'gray'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.dynamic-title {
  font-size: 1rem;
  margin-bottom: 15px;
}
.timeline-wrapper {
  margin-top: 24px;
}
</style>
