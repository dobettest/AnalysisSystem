<template>
  <div class="dynamic-launch-item">
    <p class="dynamic-descrption">{{ dynamic['data'] }}</p>
    <div class="dynamic-albums">
      <img :src="item" class="dynamic-album-item" v-for="(item, idx) in dynamic['albums']" :key="idx" />
    </div>
    <div class="dynamic-meta">
      <div class="dynamic-btn-container">
        <a-icon type="like" class="dynamic-meta-btn"></a-icon>
        <p class="like-list clearfix">
          <span
            class="like-item"
            v-for="(it, idx) in dynamic['likelist']"
            :key="idx"
            @click="navigate(it['userid'])"
          >
            {{ it['username'] }}</span
          >
          <span>等人觉得很赞</span>
        </p>
      </div>
      <h4 class="meta-action">
        <span class="dynamic-time">2020-01-03</span>
        <div>
          <svg-icon icon="more"></svg-icon>
        </div>
      </h4>
      <div class="dynamic-comment" v-if="dynamic['edit']">
        <a-textarea></a-textarea>
      </div>
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
  methods: {
    navigate(userID) {
      this.$bus.$emit('getUserInfo', userID);
    }
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
    .dynamic-btn-container {
      float: left;
      display: flex;
      align-items: center;
      .dynamic-meta-btn {
        font-size: 18px;
        margin: 4px;
        cursor: pointer;
      }
      .like-list {
        .like-item {
          color: currentColor;
          font-size: 12px;
          cursor: pointer;
          &:not(:nth-last-child()) {
            &::after {
              display: block;
              content: '、';
            }
          }
        }
      }
    }
    .meta-action {
      float: right;
      margin-right: 15px;
      display: flex;
      align-items: center;
      .dynamic-time {
      }
    }
  }
}
</style>