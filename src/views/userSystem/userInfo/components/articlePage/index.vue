<template>
  <div class="article-wrapper">
    <a-list item-layout="vertical" :data-source="data" size="large">
      <a-list-item slot="renderItem" slot-scope="item">
        <template slot="actions">
          <span><a-icon type="star-o" style="margin-right: 8px" /> {{ item.star }}</span>
          <span> <a-icon type="like-o" style="margin-right: 8px" /> {{ item.like }}</span>
          <span><a-icon type="message" style="margin-right: 8px" /> {{ item.message }}</span>
        </template>
        <a-list-item-meta>
          <a slot="title" :href="item.url" target="_blank" style="font-size:1rem">{{ item.title }}</a>
          <div slot="description" class="listDescription">
            <template v-for="tag in item.tagList">
              <a-tag :key="tag.title" style="margin-bottom:6px" :color="tag.color">
                {{ tag.title }}
              </a-tag>
            </template>
            {{ item.time }}
            <div style="margin:7px 0 5px">{{ item.description }}</div>
          </div>
        </a-list-item-meta>
      </a-list-item>
      <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
        <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
      </div>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'articlePage',
  data() {
    return {
      data: [
        {
          title: '一. vue keep-alive踩坑，删除keep-alive缓存',
          url: 'https://juejin.im/post/6844903982301708302',
          tagList: [
            {
              title: 'Vue',
              color: '#1890FF'
            },
            {
              title: 'keep-alive',
              color: '#52C41A'
            }
          ],
          star: 75,
          like: 23,
          message: 15,
          time: '2019-10-28',
          description:
            '使用keep-alive的时候，有时候会遇到切换了账号后还是上一个的页面的keep-alive，由于vue没有对应的方法去清除keep-alive，所以我们可以强制删除vnode里面的keepAlive属性，达到想要的效果。'
        },
        {
          title: '二. Echarts+Amap实现点击下钻功能',
          url: 'https://juejin.im/post/6844903982377205768',
          tagList: [
            {
              title: 'Vue',
              color: '#1890FF'
            },
            {
              title: 'Echarts',
              color: '#1890FF'
            },
            {
              title: '点击下钻',
              color: '#1890FF'
            },
            {
              title: 'AMap',
              color: '#52C41A'
            }
          ],
          star: 28,
          like: 125,
          message: 96,
          time: '2019-10-28',
          description:
            '为了不用在本地下载市县的geoJson,所以使用AMap的api方法获取行政区的geoJson，然后再通过Echarts渲染，达到点击下钻的效果。'
        }
      ],
      loadingMore: false
    };
  },
  methods: {
    loadMore() {
      this.loadingMore = true;
      const data = [...this.data];
      this.data = this.data.concat(data.reverse());
      setTimeout(() => {
        this.loadingMore = false;
      }, 350);
    }
  }
};
</script>
<style lang="scss" scoped>
.listDescription {
  margin: 10px 0 1px;
  color: #666;
}
</style>
