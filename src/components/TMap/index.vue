<template>
  <div ref="map"></div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad';
export default {
  name: 'TMap',
  data() {
    return {
      map: null
    };
  },
  props: {
    form: {
      type: Object
    },
    overlayClass: {
      type: String
    },
    overlayStyle: {
      type: [Object, String]
    }
  },
  methods: {
    async init() {
      await remoteLoad('https://map.qq.com/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77');
      var center = new TMap.LatLng(39.984104, 116.307503);
      //初始化地图
      var map = new TMap.Map(this.$refs.map, {
        zoom: 12, //设置地图缩放级别
        center: center, //设置地图中心点坐标,
        scrollable:false
      });
      var marker = new TMap.MultiMarker({
        map: map,
        styles: {
          // 点标记样式
          marker: new TMap.MarkerStyle({
            width: 20, // 样式宽
            height: 30, // 样式高
            anchor: { x: 10, y: 30 }, // 描点位置
            src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png', // 标记路径
            direction: 'bottom'
          })
        },
        geometries: [
          // 点标记数据数组
          {
            // 标记位置(经度，纬度，高度)
            styleId: 'marker',
            position: new TMap.LatLng(39.98210863924864, 116.31310899739151, 134),
            content: '腾讯总部'
          }
        ]
      });
      this.map = map;
    }
  },
  async created() {},
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  destroyed() {
    if (this.map) {
      this.map.destroy();
    }
    // document.body.removeChild(
    //   document.querySelector(
    //     'script[src = "https://map.qq.com/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"]'
    //   )
    // );
  }
};
</script>

<style>
</style>