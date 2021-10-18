<template>
  <div class="dynamic-container">
    <div class="dynamic-list">
      <launchItem v-for="(item, idx) in dynamicList" :key="idx" :dynamic="item" />
    </div>
  </div>
</template>

<script>
import launchItem from './components/launch-item.vue';
export default {
  data() {
    return {
      dynamicList: [
        {
          descrption:
            '1、在路上，不为旅行，不因某人，只为在未知的途中遇见未知的自己。2、有的事情现在不做，就一辈子也不会做了。3、关于旅行，关于生活，如此而已。4、我和西藏之间，只隔着一张火车票。5、旅行是消除仇恨和无知的最好方法。6、年轻时，旅行是教育的一部分；年老时，旅行是阅历的一部分。',
          albums: ['https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg','https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg','https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg','https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg','https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg']
        },
        {
          descrption:
            '1、在路上，不为旅行，不因某人，只为在未知的途中遇见未知的自己。2、有的事情现在不做，就一辈子也不会做了。3、关于旅行，关于生活，如此而已。4、我和西藏之间，只隔着一张火车票。5、旅行是消除仇恨和无知的最好方法。6、年轻时，旅行是教育的一部分；年老时，旅行是阅历的一部分。',
          albums: ['https://www.kuk8.com/uploads/allimg/170806/1-1FP4234502947.jpg']
        },
        {
          descrption:
            '1、在路上，不为旅行，不因某人，只为在未知的途中遇见未知的自己。2、有的事情现在不做，就一辈子也不会做了。3、关于旅行，关于生活，如此而已。4、我和西藏之间，只隔着一张火车票。5、旅行是消除仇恨和无知的最好方法。6、年轻时，旅行是教育的一部分；年老时，旅行是阅历的一部分。',
          albums: ['https://www.kuk8.com/uploads/allimg/170806/1-1FP42345031b.jpg']
        }
      ]
    };
  },
  mounted() {
    console.log('dynamic-container', this.dynamicList);
  },
  components: {
    launchItem
  }
};
</script>

<style lang="scss" scoped>
.dynamic-container {
  .dynamic-list {
  }
}
</style>