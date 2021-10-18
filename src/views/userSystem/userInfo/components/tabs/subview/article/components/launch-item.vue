<template functional>
  <div class="dynamic-launch-item">
    <p class="dynamic-descrption">{{ props.dynamic['descrption'] }}</p>
    <div class="dynamic-albums">
      <img :src="item" class="dynamic-album-item" v-for="(item, idx) in props.dynamic['albums']" :key="idx" />
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
    .like-list{
      float: right;
      .like-item{}
    }
    .dynamic-time {
      float: right;
      margin-right: 15px;
    }
  }
}
</style>