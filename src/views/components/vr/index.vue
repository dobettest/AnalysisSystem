<template>
  <div class="PSViewer" ref="psvdbg" style="height: calc(100vh - 148px)"></div>
</template>

<script>
import { Viewer } from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
export default {
  name: 'vr',
  data() {
    return {
      img: require('../../../assets/vr/base.jpg'),
      psv: null,
      scene: [
        {
          src: require('../../../assets/vr/base.jpg'),
          title: '客厅'
        },
        {
          src: require('../../../assets/vr/room.jpeg'),
          title: '卧室'
        },
                {
          src: require('../../../assets/vr/child.jpeg'),
          title: '儿童房'
        },
        {
          src: require('../../../assets/vr/kitchen.jpeg'),
          title: '厨房'
        },
        {
          src: require('../../../assets/vr/p1.jpeg'),
          title: '厕所'
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.initScene();
    });
  },
  methods: {
    init() {
      this.psv = new Viewer({
        panorama: this.img, //图片
        container: this.$refs.psvdbg, //id
        size: {
          width: '100%',
          height: this.$refs.psvdbg.offsetHeight
        },
        navbar: ['autorotate', 'zoom', 'caption'],
        plugins: []
      });
    },
    initScene() {
      let { scene } = this;
      let fragment = document.createDocumentFragment();
      let el = document.createElement('div');
      el.className = 'scene-list';
      el.addEventListener('click', e => {
        let ele = e.target || e.srcElement;
        if (ele.parentNode.classList.contains('scene-item')) {
          let panorama = ele.parentNode.getAttribute('panorama');
          this.psv.setPanorama(panorama);
        }
      },{
        passive:true
      });
      for (let item of scene) {
        let div = document.createElement('div');
        div.className = 'scene-item';
        div.setAttribute('panorama', item.src);
        let img = document.createElement('img');
        let title = document.createElement('div');
        title.innerText = item.title;
        title.className = 'scene-title';
        img.className = 'scene-img';
        img.src = item.src;
        div.appendChild(img);
        div.appendChild(title);
        el.appendChild(div);
      }
      fragment.appendChild(el);
      this.$refs.psvdbg.appendChild(fragment);
    }
  }
};
</script>
<style lang="scss">
.PSViewer {
  position: relative;
}
.scene-list {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  height: 90px;
  z-index: 1000;
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
      width: 100%;
      height: 100%;
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
</style>
