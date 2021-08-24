<template>
  <div class="PSViewer" ref="psvdbg" style="height: calc(100vh - 148px)">
    <div class="scene-container" ref="scene">
      <ul class="scene-list" :style="{ width }">
        <li class="scene-item" v-for="(item, idx) in scene" :key="idx" @click="change(item.src)">
          <img v-lazy="item.src" class="scene-img" />
          <div class="scene-title">{{ item.title }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad';
import { threeJs } from '@/plugins/cdn.js';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import bs from '@better-scroll/core';
export default {
  name: 'vr',
  data() {
    return {
      img: require('@/assets/vr/base.jpg'),
      psv: null,
      scene: [
        {
          src: require('@/assets/vr/base.jpg'),
          title: '客厅'
        },
        {
          src: require('@/assets/vr/room.jpeg'),
          title: '卧室'
        },
        {
          src: require('@/assets/vr/child.jpeg'),
          title: '儿童房'
        },
        {
          src: require('@/assets/vr/kitchen.jpeg'),
          title: '厨房'
        },
        {
          src: require('@/assets/vr/p1.jpeg'),
          title: '厕所'
        },
        {
          src: require('@/assets/vr/base.jpg'),
          title: '客厅'
        },
        {
          src: require('@/assets/vr/room.jpeg'),
          title: '卧室'
        },
        {
          src: require('@/assets/vr/child.jpeg'),
          title: '儿童房'
        },
        {
          src: require('@/assets/vr/kitchen.jpeg'),
          title: '厨房'
        },
        {
          src: require('@/assets/vr/p1.jpeg'),
          title: '厕所'
        }
      ]
    };
  },
  computed: {
    width() {
      return this.scene.length * 124 + 'px';
    }
  },
  async mounted() {
    await remoteLoad(threeJs);
    const { Viewer } = await import('@/lib/common.js');
    this.psv = new Viewer({
      panorama: this.img, //图片
      container: this.$refs.psvdbg, //id
      navbar: ['autorotate', 'zoom', 'caption'],
      size: {
        width: '100%',
        height: '100%'
      },
      plugins: []
    });
    new bs(this.$refs.scene, {
      scrollX: true,
      scrollY: false
    });
  },
  methods: {
    change(panorama) {
      this.psv.setPanorama(panorama);
    }
  }
};
</script>
<style lang="scss">
.PSViewer {
  position: relative;
  overflow-x: hidden;
}
.scene-container {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 620px;
  overflow: hidden;
  .scene-list {
    height: 90px;
    white-space: nowrap;
    .scene-item {
      display: inline-block;
      width: 120px;
      height: 90px;
      margin: 0 2px;
      border: 0.1px solid #fff;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      .scene-img {
        height: 90px;
        width: 100%;
      }
      .scene-title {
        color: #fff;
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 600;
      }
    }
  }
}
</style>
