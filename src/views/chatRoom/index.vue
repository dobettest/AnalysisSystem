<template>
  <div class="im-container">
    <div class="conversation-list-wrapper">
      <div class="top-bar">
        <div class="top-title">易讯</div>
        <a-popover placement="bottomRight" trigger="click" style="margin-right: 4px" v-model="addable">
          <a-icon type="plus" class="add-icon" @click.self="addable = !addable"></a-icon>
          <ul slot="content">
            <li style="height: 32px; cursor: pointer" @click="showFriend">
              <a-icon type="user-add" style="font-size: 22px; margin-right: 4px"></a-icon>添加好友
            </li>
            <li style="height: 32px; cursor: pointer">
              <a-icon type="usergroup-add" style="font-size: 22px; margin-right: 4px"></a-icon>创建群组
            </li>
          </ul>
        </a-popover>
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
            <a-badge :count="unread" overCount="99" class="flex-box" :offset="[offset(unread), 4]">
              <my-svg-icon icon="message"></my-svg-icon>
              <p class="tab-title">消息</p>
            </a-badge>
          </div>
          <div :class="['tab-bar-item', tabKey === 'contactBook' ? 'active' : '']" @click="setTabKey('contactBook')">
            <a-badge :count="count" class="flex-box" :offset="[offset(count), 4]">
              <my-svg-icon icon="contact"></my-svg-icon>
              <p class="tab-title">联系人</p>
            </a-badge>
          </div>
        </div>
      </div>
    </div>
    <div class="conversation-room">
      <div class="current-conversation">
        <div class="top-header-bar">
          <h3 class="current-name" v-text="username"></h3>
          <div
            :class="['more-btn', showConversationProfile ? '' : 'left-arrow']"
            title="查看详细信息"
            @click="showConversationProfile = !showConversationProfile"
          ></div>
        </div>
        <div class="message-list-wrapper scroll-bar">
          <a-list :data-source="messageList" class="message-list">
            <message-item slot="renderItem" slot-scope="item" :message="item"></message-item>
          </a-list>
        </div>
        <message-box></message-box>
      </div>
      <conversationProfile class="conversation-profile" v-show="showConversationProfile" />
    </div>
    <friend-modal :visible="friendModal" @hide="friendModal = false"></friend-modal>
  </div>
</template>

<script>
// import bs from 'better-scroll';
import conversationList from './subView/conversationList';
import contactBook from './subView/contactBook/index.vue';
import { conversationProfile, messageBox, messageItem, friendModal } from './components';
import tim from '@/lib/tim.js';
import { mapState } from 'vuex';
export default {
  name: 'im',
  components: {
    conversationList,
    contactBook,
    conversationProfile,
    messageBox,
    messageItem,
    friendModal
  },
  data() {
    return {
      messageList: [],
      tabKey: 'conversationList',
      messageContent: '',
      focus: false,
      emojiShow: false,
      showConversationProfile: false,
      count: 0,
      profile: {},
      remark: '',
      addable: false,
      friendModal: false
    };
  },
  methods: {
    showFriend() {
      this.addable = false;
      this.friendModal = true;
    },
    setTabKey(val) {
      this.tabKey = val;
    },
    getMessageList() {
      tim.getMessageList({ conversationID: this.conversationID, count: 15 }).then(({ data: { messageList } }) => {
        this.messageList = messageList;
        console.log(this.messageList);
      });
    },
    offset(x) {
      return x > 99 ? 12 : 0;
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.accountInfo,
      unread: state => state.tim.unread,
      conversationID: state => state.tim.conversationID
    }),
    username() {
      let username = '';
      let conversationID = this.conversationID;
      switch (true) {
        case conversationID.startsWith('C2C'):
          console.log(1);
          username = this.remark || this.profile['nick'] || this.profile['userID'];
          break;
        case conversationID.startsWith('GROUP'):
          username = this.profile['name'] || this.profile['groupID'];
          console.log(2);
          break;
        case conversationID.startsWith('@TIM#SYSTEM'):
          console.log('systems');
          username = '系统管理员';
        default:
          break;
      }
      return username;
    }
  },
  watch: {
    conversationID: {
      handler(nl, ol) {
        if (nl) {
          console.log(nl);
          this.getMessageList();
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('setNeedNotice', false);
  },
  destroyed() {
    this.$store.dispatch('setNeedNotice', true);
  }
};
</script>

<style lang="scss" scoped>
@keyframes scale {
  100% {
    transform: scale(1.1);
  }
}
.im-container {
  height: 100%;
  display: flex;
  background-color: #fff;
  border: 10px solid #f0f2f5;
  .conversation-list-wrapper {
    // padding: 4px;
    width: 320px;
    border-right: 10px solid #f0f2f5;
    .top-bar {
      display: flex;
      align-items: center;
      height: 40px;
      position: relative;
      border-bottom: 1px solid #ccc;
      padding: 4px;
      .top-title {
        flex-grow: 1;
        text-align: center;
        font-weight: 500;
        font-size: 24px;
      }
      .add-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        padding: 4px;
        right: 0;
        cursor: pointer;
      }
      .addable-content {
        width: 120px;
        position: absolute;
        right: 0;
        top: 40px;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        background-color: #e8e8e8;
        z-index: 999;
        .addable-meta {
          height: 45px;
        }
      }
    }
    .tabs {
      height: calc(100% - 40px);
      .tab-pane {
        height: calc(100% - 75px);
      }
      .tab-bar {
        display: flex;
        height: 75px;
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
          font-weight: 600;
          .flex-box {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 48px;
          }
          ::v-deep .svgClass {
            width: 28px;
            height: 28px;
          }
          .tab-title {
            height: 24px;
            line-height: 24px;
          }
        }
        .active {
          color: $color-primary;
          animation: scale 300ms;
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
      padding-bottom: 4px;
      height: 100%;
      flex-grow: 1;
      .top-header-bar {
        display: flex;
        align-items: center;
        height: 32px;
        line-height: 32px;
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
          top: 1px;
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
        overflow: auto;
        position: relative;
        height: calc(100% - 179px);
        .message-list {
          // border-bottom: 1px solid #ccc;
          .message-title {
          }
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