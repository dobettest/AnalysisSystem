<template>
  <div class="conversation-list-container">
    <div class="conversation-list-wrapper">
      <div class="search-box">
        <a-input-search></a-input-search>
      </div>
      <div class="tabs">
        <div class="tab-pane">
          <!-- <component :is="tabKey"></component> -->
        </div>
        <div class="tab-bar">
          <div :class="['tab-bar-item', tabKey === 'conversation' ? 'active' : '']" @click="setTabKey('conversation')">
            <svg-icon icon="message"></svg-icon>
            <p>消息</p>
          </div>
          <div :class="['tab-bar-item', tabKey === 'contactBook' ? 'active' : '']" @click="setTabKey('contactBook')">
            <svg-icon icon="contact"></svg-icon>
            <p>联系人</p>
          </div>
        </div>
      </div>
      <!-- <a-tabs v-model="tabKey" class="tabs" :tabBarStyle="{ margin: 0, height: 45 + 'px' }">
        <a-tab-pane tab="会话" key="conversation">
          <div class="conversation-list-outter" ref="conversation">
            <ul class="conversation-list-inner" :style="{ height: height }">
              <li class="conversation-list-item" v-for="(item, idx) in list" :key="idx">
                {{ item }}
              </li>
            </ul>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="联系人" key="contactBook">
          <div class="conversation-list-outter" ref="contactBook">
            <ul class="conversation-list-inner" :style="{ height: height }">
              <li class="conversation-list-item" v-for="(item, idx) in list" :key="idx">
                {{ item }}
              </li>
            </ul>
          </div>
        </a-tab-pane>
      </a-tabs> -->
    </div>
    <div class="conversation-room">
      <h3 class="current-name">zhes</h3>
      <div class="message-list-wrapper" ref="msi">
        <ul class="message-list" :style="{ height: messageH }">
          <!-- v-for="(item, idx) in arr" :key="idx" -->
          <li class="message-item clearfix">
            <a-avatar style="float: left"></a-avatar>
            <span style="float: left">a</span>
          </li>
          <li class="message-item clearfix">
            <a-avatar style="float: right"></a-avatar>
            <span style="float: right">a</span>
          </li>
          <li class="message-item clearfix">
            <a-avatar style="float: left"></a-avatar>
            <span style="float: left">a</span>
          </li>
          <li class="message-item clearfix">
            <a-avatar style="float: left"></a-avatar>
            <span style="float: left">a</span>
          </li>
          <li class="message-item clearfix">
            <a-avatar style="float: right"></a-avatar>
            <span style="float: right">a</span>
          </li>
        </ul>
      </div>
      <div class="footer">
        <div>
          <div class="tools-list">
            <div class="tool-item">
              <svg-icon icon="emoji"></svg-icon>
            </div>
          </div>
          <a-button type="primary" style="float: right"> 发送 </a-button>
        </div>
        <a-textarea :rows="4"></a-textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserTable } from '@/api/userManage';
import bs from 'better-scroll';
export default {
  name: 'conversationList',
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'a', 'b', 'c', 'd', 'e', 'f', 'g'],
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd'],
      tabKey: 'conversation'
    };
  },
  async created() {
    const res = await getUserTable();
    console.log('res', res);
  },
  methods: {
    setTabKey(val) {
      this.tabKey = val;
    }
  },
  computed: {
    height() {
      let h = this.list.length * 45;
      return h + 'px';
    },
    messageH() {
      let h = this.arr.length * 48;
      return h + 'px';
    }
  },
  mounted() {
    new bs(this.$refs.msi, {
      scrollY: true,
      scrollbar: true
    });
  },
  watch: {
    tabKey: {
      handler(nl, ol) {
        if (nl) {
          console.log(nl);
          this.$nextTick(() => {
            new bs(this.$refs[nl], {
              scrollY: true,
              scrollbar: true
            });
          });
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.conversation-list-container {
  height: 100%;
  display: flex;
  background-color: #fff;
  .conversation-list-wrapper {
    // padding: 4px;
    width: 320px;
    border-right: 10px solid #f0f2f5;
    .search-box {
      padding: 4px;
      height: 32px;
    }
    .tabs {
      height: calc(100% - 32px);
      .tab-pane {
        height: calc(100% - 60px);
      }
      .tab-bar {
        display: flex;
        height: 60px;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #ccc;
        cursor: pointer;
        padding: 6px 0;
        user-select: none;
        .tab-bar-item {
          flex: 1;
          text-align: center;
          /deep/ .svgClass {
            font-size: 28px !important;
          }
        }
        .active {
          color: $color-primary;
        }
      }
      // height: calc(100% - 32px);
      // .conversation-list-outter {
      //   position: relative;
      //   height: calc(100% - 45px);
      //   overflow: hidden;
      //   cursor: pointer;
      //   .conversation-list-inner {
      //     padding-right: 7px;
      //     .conversation-list-item {
      //       height: 45px;
      //     }
      //   }
      // }
    }
  }
  .conversation-room {
    flex-grow: 1;
    padding: 4px;
    height: 100%;
    .current-name {
      height: 28px;
      text-align: center;
      border-bottom: 1px solid #ccc;
      margin: 0;
    }
    .message-list-wrapper {
      // background-color: red;
      overflow: hidden;
      position: relative;
      height: calc(100% - 148px);
      .message-list {
        padding-right: 7px;
        // border-bottom: 1px solid #ccc;
        .message-item {
          height: 48px;
        }
      }
    }
    .footer {
      height: 120px;
      .tools-list {
        float: left;
        .tool-item {
          position: relative;
          /deep/ .svgClass {
            cursor: pointer;
            font-size: 28px !important;
          }
        }
      }
    }
  }
}
</style>
