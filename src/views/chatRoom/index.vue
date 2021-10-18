<template>
  <div class="im-container">
    <div class="conversation-list-wrapper">
      <div class="search-box">
        <a-input-search></a-input-search>
      </div>
      <div class="tabs">
        <div class="tab-pane">
          <conversation-list v-show="tabKey === 'conversationList'" />
          <contact-book v-show="tabKey === 'contactBook'" />
        </div>
        <div class="tab-bar">
          <div
            :class="['tab-bar-item', tabKey === 'conversationList' ? 'active' : '']"
            @click="setTabKey('conversationList')"
          >
            <a-badge count="0" class="flex-box">
              <svg-icon icon="message"></svg-icon>
              <p style="margin-top: 6px">消息</p>
            </a-badge>
          </div>
          <div :class="['tab-bar-item', tabKey === 'contactBook' ? 'active' : '']" @click="setTabKey('contactBook')">
            <a-badge count="5" class="flex-box" :offset="[-6, 0]">
              <svg-icon icon="contact"></svg-icon>
              <p style="margin-top: 6px">联系人</p>
            </a-badge>
          </div>
        </div>
      </div>
    </div>
    <div class="conversation-room">
      <div class="current-conversation">
        <div class="top-header-bar">
          <div class="current-name">这是</div>
          <div
            :class="['more-btn', showConversationProfile ? '' : 'left-arrow']"
            title="查看详细信息"
            @click="showConversationProfile = !showConversationProfile"
          ></div>
        </div>
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
        <div :class="['footer', focus]">
          <div class="footer-meta">
            <div class="tools-list">
              <div class="tool-item">
                <a-tooltip placement="left">
                  <template slot="title">发送表情</template>
                  <svg-icon icon="emoji" @click.native="emojiShow = !emojiShow"></svg-icon>
                  <p class="emoji-list scroll-bar" v-show="emojiShow" @click.stop="emojiClick">
                    <span class="emoji-item" v-for="(item, idx) in emojiList" :key="idx">
                      {{ item['char'] }}
                    </span>
                  </p>
                </a-tooltip>
              </div>
              <div class="tool-item">
                <a-tooltip>
                  <template slot="title">发送图片</template>
                  <label style="display: block">
                    <svg-icon icon="photo"></svg-icon>
                    <input type="file" style="display: none" accept="image/*" />
                  </label>
                </a-tooltip>
              </div>
              <div class="tool-item">
                <a-tooltip>
                  <template slot="title">发送文件</template>
                  <label style="display: block">
                    <svg-icon icon="sendFile"></svg-icon>
                    <input type="file" style="display: none" />
                  </label>
                </a-tooltip>
              </div>
              <div class="tool-item">
                <a-tooltip>
                  <template slot="title">语言通话</template>
                  <svg-icon icon="voice"></svg-icon>
                </a-tooltip>
              </div>
              <div class="tool-item">
                <a-tooltip>
                  <template slot="title">视频通话</template>
                  <svg-icon icon="video"></svg-icon>
                </a-tooltip>
              </div>
            </div>
          </div>
          <a-textarea class="content-box" v-model="messageContent"></a-textarea>
          <a-tooltip placement="topLeft" class="send-btn">
            <template slot="title">按Enter发送消息，Ctrl+Enter换行</template>
            <svg-icon icon="send" style="color: red"></svg-icon>
          </a-tooltip>
        </div>
      </div>
      <conversationProfile class="conversation-profile" v-show="showConversationProfile" />
    </div>
  </div>
</template>

<script>
import { getUserTable } from '@/api/userManage';
import bs from 'better-scroll';
import conversationList from './components/conversationList.vue';
import contactBook from './subView/contactBook/index.vue';
import conversationProfile from './components/ConversationProfile';
import emojiList from '@/assets/emoji.json';
export default {
  name: 'im',
  components: {
    conversationList,
    contactBook,
    conversationProfile
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'a', 'b', 'c', 'd', 'e', 'f', 'g'],
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd'],
      tabKey: 'conversationList',
      messageContent: '',
      focus: false,
      emojiList,
      emojiShow: false,
      showConversationProfile: false
    };
  },
  async created() {
    const res = await getUserTable();
    console.log('res', res);
  },
  methods: {
    setTabKey(val) {
      this.tabKey = val;
    },
    emojiClick(e) {
      let el = e.target || e.srcElement;
      if (el.classList.contains('emoji-item')) {
        this.messageContent = [this.messageContent, el.innerText].join('');
        this.emojiShow = false;
      }
    }
  },
  computed: {
    messageH() {
      let h = this.arr.length * 48;
      return h + 'px';
    }
  },
  mounted() {
    new bs(this.$refs.msi, {
      scrollY: true,
      scrollbar: true,
      mouseWheel: true
    });
  }
};
</script>

<style lang="scss" scoped>
.im-container {
  height: 100%;
  display: flex;
  background-color: #fff;
  border: 10px solid #f0f2f5;
  .conversation-list-wrapper {
    // padding: 4px;
    width: 320px;
    border-right: 10px solid #f0f2f5;
    .search-box {
      padding: 4px;
      height: 40px;
    }
    .tabs {
      height: calc(100% - 40px);
      .tab-pane {
        height: calc(100% - 70px);
      }
      .tab-bar {
        display: flex;
        height: 70px;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #ccc;
        z-index: 999;
        cursor: pointer;
        // padding: 6px 0;
        user-select: none;
        .tab-bar-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          .flex-box {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 48px;
          }
          /deep/ .svgClass {
            width: 28px;
            height: 28px;
          }
        }
        .active {
          color: $color-primary;
        }
      }
    }
  }
  .conversation-room {
    height: 100%;
    flex-grow: 1;
    display: flex;
    overflow: hidden;
    .current-conversation {
      height: 100%;
      padding: 4px 0;
      height: 100%;
      flex-grow: 1;
      .top-header-bar {
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e7e7e7;
        position: relative;
        .current-name {
          flex-grow: 1;
          height: 28px;
          line-height: 28px;
          text-align: center;
          margin: 0;
        }
        .more-btn {
          position: absolute;
          top: 10px;
          right: -15px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          &::before {
            position: absolute;
            right: 0;
            z-index: 0;
            content: '';
            width: 15px;
            height: 30px;
            border: 1px solid #e7e7e7;
            border-radius: 0 100% 100% 0/50%;
            border-left: none;
            background-color: #fff;
          }
          &::after {
            content: '';
            width: 12px;
            height: 12px;
            transition: transform 0.8s;
            border-top: 2px solid #a5b5c1;
            border-right: 2px solid #a5b5c1;
            float: right;
            position: relative;
            top: 11px;
            right: 8px;
            transform: rotate(45deg);
          }
        }
        .left-arrow {
          transform: rotate(180deg);
          &::before {
            background-color: #f7f7f7;
          }
        }
      }
      .message-list-wrapper {
        // background-color: red;
        overflow: hidden;
        position: relative;
        height: calc(100% - 197px);
        .message-list {
          padding-right: 7px;
          // border-bottom: 1px solid #ccc;
          .message-item {
            height: 48px;
          }
        }
      }
      .footer {
        height: 147px;
        border-top: 1.5px solid #ebedf0;
        position: relative;
        .footer-meta {
          display: flex;
          align-items: center;
          padding: 0 4px;
          .tools-list {
            display: flex;
            align-items: center;
            flex-grow: 1;
            .tool-item {
              position: relative;
              cursor: pointer;
              /deep/ .svgClass {
                padding: 0 6px;
                width: 42px;
                height: 42px;
                cursor: pointer;
              }
              .emoji-list {
                position: absolute;
                left: 0;
                bottom: 50px;
                height: 180px;
                width: 345px;
                padding: 0 7px;
                overflow: auto;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                .emoji-item {
                  height: 36px;
                  width: 36px;
                  font-size: 24px;
                  float: left;
                }
              }
              &:hover {
                color: #000;
              }
            }
          }
        }
        .content-box {
          border: none !important;
          outline: none !important;
          box-shadow: none;
          height: calc(100% - 42px);
        }
        .send-btn {
          position: absolute;
          right: 20px;
          bottom: 15px;
          z-index: 999;
          width: 32px;
          height: 32px;
          cursor: pointer;
          color: $color-primary !important;
        }
      }
    }
    .conversation-profile {
      border-left: 1px solid #e7e7e7;
      width: 280px;
      background-color: #fff;
    }
  }
}
</style>