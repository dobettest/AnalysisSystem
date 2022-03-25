<template>
  <li class="list-item" :class="{ active }" @click="checkoutConversation">
    <div class="avatar flex-box">
      <a-avatar icon="user" shape="square" size="large"></a-avatar>
    </div>
    <div class="list-item-meta">
      <div class="flex-box">
        <h3 v-text="conversationName" class="conversationName"></h3>
        <div class="unread flex-box" @click="read" v-if="conversation['unreadCount']">
          <span class="badge"> {{ conversation['unreadCount'] > 99 ? '99+' : conversation['unreadCount'] }}</span>
        </div>
      </div>
      <div class="flex-box description">
        <span v-text="messageForShow" class="message text-elipise"></span>
        <span v-text="date" class="time"></span>
      </div>
    </div>
  </li>
</template>

<script>
import tim from '@/lib/tim';
export default {
  name: 'conversation-item',
  props: {
    conversation: {
      type: Object
    }
  },
  computed: {
    date() {
      let ms = this.conversation.lastMessage.lastTime * 1000;
      let date = new Date(ms);
      let now = Date.now();
      let today = new Date(now);
      let day = 24 * 60 * 60 * 1000;
      let week = 7 * day;
      if (now - ms > week) {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
      } else if (today.getDate() - date.getDate()) {
        return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()];
      } else {
        let minutes = date.getMinutes() < 10 ? '0'.concat(date.getMinutes()) : date.getMinutes();
        return [date.getHours(), minutes].join(':');
      }
    },
    active() {
      return this.conversation['conversationID'] === this.$store.state.tim.conversationID;
    },
    messageForShow() {
      if (this.conversation.lastMessage.isRevoked) {
        if (this.conversation.lastMessage.fromAccount === this.currentUserProfile.userID) {
          return '你撤回了一条消息';
        }
        if (this.conversation.type === TIM.TYPES.CONV_C2C) {
          return '对方撤回了一条消息';
        }
        return `${this.conversation.lastMessage.fromAccount}撤回了一条消息`;
      }
      return this.conversation.lastMessage.messageForShow;
    },
    conversationName: function () {
      if (this.conversation.type === TIM.TYPES.CONV_C2C) {
        return this.conversation.userProfile.nick || this.conversation.userProfile.userID;
      }
      if (this.conversation.type === TIM.TYPES.CONV_GROUP) {
        return this.conversation.groupProfile.name || this.conversation.groupProfile.groupID;
      }
      if (this.conversation.type === TIM.TYPES.CONV_SYSTEM) {
        return '系统通知';
      }
      return '';
    }
  },
  methods: {
    read() {
      tim.setMessageRead({ conversationID: this.conversation['conversationID'] });
    },
    checkoutConversation() {
      this.$store.dispatch('tim/setConversationID', this.conversation['conversationID']);
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes scale {
  100% {
    transform: scaleY(1.02);
  }
}
.list-item {
  padding: 4px;
  cursor: pointer;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  .avatar {
    width: 45px;
    height: 45px;
  }
  .list-item-meta {
    padding-left: 4px;
    width: calc(100% - 45px);
  }
}
.active {
  background-color: #f6f6f6;
  animation: scale 300ms;
}
.conversationName {
  margin: 0;
  font-size: 16px;
  flex-grow: 1;
}
.unread {
  .badge {
    vertical-align: bottom;
    background-color: red;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    height: 18px;
    max-width: 40px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
  }
}
.description {
}
.message {
  font-size: 13px;
  flex-grow: 1;
}
.time {
  font-size: 12px;
  color: #c8c8c8;
  padding: 0 1px;
}
</style>