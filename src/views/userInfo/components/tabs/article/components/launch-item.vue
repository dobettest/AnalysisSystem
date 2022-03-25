<template functional>
  <div class="dynamic-launch-item">
    <p class="dynamic-descrption">{{ props.dynamic['descrption'] }}</p>
    <div class="dynamic-albums">
      <img
        :src="item"
        class="dynamic-album-item"
        v-for="(item, idx) in props.dynamic['albums']"
        :key="idx"
      />
    </div>
    <div class="dynamic-meta">
      <a-icon type="like" class="dynamic-meta-btn"></a-icon>
      <a-icon type="message" class="dynamic-meta-btn"></a-icon>
      <p class="like-list">
        <span class="like-item"></span>
      </p>
      <h4 class="dynamic-time">2020-01-03</h4>
    </div>
    <a-divider></a-divider>
  </div>
</template>

<script>
export default {
  name: 'dynamic-launch-item',
  props: {
    dynamic: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dynamicList: [
        {
          descrption:
            '1、在路上，不为旅行，不因某人，只为在未知的途中遇见未知的自己。2、有的事情现在不做，就一辈子也不会做了。3、关于旅行，关于生活，如此而已。4、我和西藏之间，只隔着一张火车票。5、旅行是消除仇恨和无知的最好方法。6、年轻时，旅行是教育的一部分；年老时，旅行是阅历的一部分。',
          albums: ['https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg', 'https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg', 'https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg', 'https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg', 'https://www.yebaike.com/d/file/20210721/350095c80f5b0e9714d696516b1ec9f9.jpg']
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
    }
  },
  mounted() {
    console.log(this.dynamic);
  }
};
</script>

<style lang="scss" scoped>
.dynamic-launch-item {
  .dynamic-descrption {
  }
  .dynamic-albums {
    display: flex;
    align-items: center;
    margin: 0 1%;
    flex-wrap: wrap;
    .dynamic-album-item {
      width: calc(97% / 3);
      margin: 0 0.5%;
      flex-grow: 1;
      padding: 2px;
      max-height: 240px;
    }
  }
  .dynamic-meta {
    height: 32px;
    line-height: 32px;
    .dynamic-meta-btn {
      font-size: 18px;
      margin: 4px;
    }
    .like-list {
      float: right;
      .like-item {
      }
    }
    .dynamic-time {
      float: right;
      margin-right: 15px;
    }
  }
}
</style>