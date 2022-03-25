<template>
  <section class="hire-container">
    <div class="side-bar scroll-bar">
      <a-menu mode="inline" :open-keys="openKeys" :default-selected-keys="selected" class="menu" @openChange="onOpenChange">
        <template v-for="item in jobs">
          <sub-menu v-if="item['children']" :key="item['key']" :item="item"></sub-menu>
          <menu-item v-else :key="item['key']" :item="item" />
        </template>
      </a-menu>
    </div>
    <div class="content scroll-bar">
      <dl>
        <dt class="list-title text-underline">
          <my-svg-icon icon="jobtodo" :size="20" :overlayStyle="{ margin: '2px' }"></my-svg-icon>工作职责
        </dt>
        <dd class="list-item">依据业务需求完成高质量的跨终端Web的前端开发和维护</dd>
        <dd class="list-item">在理解前端开发流程的基础上，结合业务实际建立或优化提升工作效率的工具</dd>
        <dd class="list-item">负责主站业务的技术改进和性能优化</dd>
        <dd class="list-item">关注前端前沿技术研究，通过新技术服务团队和业务</dd>
      </dl>
      <dl>
        <dt class="list-title text-underline">
          <my-svg-icon icon="jobrequire" :size="20" :overlayStyle="{ margin: '2px' }"></my-svg-icon>任职要求
        </dt>
        <dd class="list-item">精通各种前端技术，包括HTML/CSS/JavaScript等，熟悉AngularJS/Vue等MVVM技术者优先</dd>
        <dd class="list-item">对前端工程化与模块化开发有一定了解，并有实践经验（如Vue/React/webpack/commonjs等）</dd>
        <dd class="list-item">能够对网站性能优化，有性能优化的经验</dd>
        <dd class="list-item">具备良好的团队协作精神，能利用自身技术能力提升团队整体研发效率，提高团队影响力</dd>
        <dd class="list-item">对前端技术有持续的热情，个性乐观开朗，逻辑性强，善于和各种背景的人合作</dd>
      </dl>
      <dl>
        <dt class="list-title text-underline">
          <my-svg-icon icon="jobrequire" :size="20" :overlayStyle="{ margin: '2px' }"></my-svg-icon>福利待遇
        </dt>
        <dd class="list-item">实行大小周双休制度</dd>
        <dd class="list-item">每年两次提薪机会</dd>
        <dd class="list-item">导师制度,更有牛人带领</dd>
        <dd class="list-item">朝十晚七,弹性打卡</dd>
        <dd class="list-item">实现14薪,年终奖,项目分红,生日补贴</dd>
      </dl>
      <dl>
        <dt class="list-title text-underline">
          <my-svg-icon icon="jobrequire" :size="20" :overlayStyle="{ margin: '2px' }"></my-svg-icon>其他
        </dt>
        <dd class="list-item">精通各种前端技术，包括HTML/CSS/JavaScript等，熟悉AngularJS/Vue等MVVM技术者优先</dd>
        <dd class="list-item">对前端工程化与模块化开发有一定了解，并有实践经验（如Vue/React/webpack/commonjs等）</dd>
        <dd class="list-item">能够对网站性能优化，有性能优化的经验</dd>
      </dl>
      <TMap :form="form" overlayClass="map"></TMap>
    </div>
  </section>
</template>
<script>
import menuItem from './menu-item';
import subMenu from './sub-menu';
import TMap from '@/components/TMap';
export default {
  name: 'hire',
  components: { menuItem, subMenu, TMap },
  data() {
    return {
      form: {
        type: 0,
        marker:"coord:39.96554,116.26719;title:成都;addr:复兴路32号院Icoord:39.87803,116.19025;title:成都园;addr:北京园博园",
        key: 'A6CBZ-NN4WP-RRSDS-VZR3Q-5MANE-MDBA5',
        referer: 'app1'
      },
      rootSubmenuKeys: ['development', 'sale'],
      
      openKeys: ['development'],
      selected:['front2'],
      jobs: [
        {
          key: 'development',
          title: '技术研发',
          children: [
            {
              key: 'front1',
              title: '前端工程师'
            },
            {
              key: 'front2',
              title: '可视化工程师'
            },
            {
              key: 'front3',
              title: '安卓工程师'
            }
          ]
        },
        {
          key: 'sale',
          title: '市场营销',
          children: [
            {
              key: 'saler',
              title: '销售专员'
              //   children: []
            }
          ]
        },
        {
          key: 'manage',
          title: '行政管理',
          children: [
            {
              key: 'manage1',
              title: '经理秘书'
              //   children: []
            }
          ]
        },
        {
          key: 'goods',
          title: '产品经理',
          children: [
            {
              key: 'goods1',
              title: '产品经理'
              //   children: []
            }
          ]
        },
        {
          key: 'person',
          title: '人力资源',
          children: [
            {
              key: 'person1',
              title: '产品经理'
              //   children: []
            }
          ]
        }
      ]
    };
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.map{
    height: 430px;
    padding: 25px;
    width: 100%;
}
.hire-container {
  height: 460px;
  position: relative;
  .side-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 256px;
    height: 100%;
    .menu {
      height: 100%;
    }
  }
  .content {
    height: 100%;
    margin-left: 256px;
    width: calc(100% - 256px);
    padding: 15px 0 120px 15px;
    .list-title {
      display: flex;
      align-items: center;
      font-weight: 700;
    }
    .list-item {
      display: flex;
      align-items: center;
      line-height: 28px;
      &::before {
        display: block;
        content: ' ';
        width: 6px;
        height: 6px;
        margin: 4px;
        background-color: $color-primary;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
