<template>
  <div ref="map" style="height:320px;"></div>
</template>
<script>
import remoteLoad from '@/utils/remoteLoad';
import qs from 'qs';
export default {
  name: 'BMap',
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  computed: {
    url() {
      let url = `https://api.map.baidu.com/api?${qs.stringify(this.params)}`;
      return url;
    }
  },
  watch: {
    params: {
      handler(nl, ol) {
        if (nl) {
          this.initMap();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initMap: remoteLoad(
      'BMap',
      'https://api.map.baidu.com/api?type=webgl&v=1.0&ak=Wc62kF8LBWTNT3xOEgGOqE2diqqtPQNy',
      function () {
        this.$nextTick(() => {
          var map = new BMapGL.Map(this.$refs.map); // 创建Map实例
          var point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
          map.centerAndZoom(point, 10);
          map.enableScrollWheelZoom(); // 启用滚轮放大缩小
        });
      }
    )
  }
};
</script>

<style>
</style>