<template>
  <div class="scoket-container">
    <div class="chat-container">
      <scroll-bar style="width: 100%; height: 400px; padding: 6px 0 15px" ref="scrollBar">
        <p class="text-center" v-if="newsList.length">{{ newsList[newsList.length - 1].date }}</p>
        <div
          class="list-item"
          v-for="(item, index) in newsList"
          :key="index"
          :class="{ 'text-right': index % 2 === 0 }"
        >
          <div class="message myself" v-if="index % 2 == 0">{{ item.message }}</div>
          <a-avatar :src="require('@/assets/avatar/' + item.imgUrl)" :size="35" />
          <div class="message" v-if="index % 2 != 0" v-html="item.message"></div>
        </div>
      </scroll-bar>
    </div>
    <a-comment class="comment-container">
      <a-avatar slot="avatar" :src="require('@/assets/avatar/' + userInfo['avatar'])" />
      <div slot="content">
        <a-row class="row">
          <ul class="type-list clearfix">
            <li class="type-item">
              <a-icon type="smile" theme="twoTone" @click="showEmoji" class="emoji-btn"></a-icon>
              <div class="emojiList" ref="emoji" v-show="emoji">
                <div class="content clearfix" @click="handleEmoji">
                  <span class="emoji-item" v-for="(item, idx) in emojiList" :key="idx">{{ item.char }}</span>
                </div>
              </div>
            </li>
            <li class="type-item">
              <a-icon type="picture" theme="twoTone"></a-icon>
            </li>
          </ul>
        </a-row>
        <a-row class="row">
          <a-textarea :rows="3" @change="changeText" :value="textValue" />
        </a-row>
        <a-row class="row">
          <a-button html-type="submit" type="primary" @click="sendNews"> 发送 </a-button>
        </a-row>
      </div>
    </a-comment>
  </div>
</template>
<script>
import moment from 'moment';
import io from 'socket.io-client';
import { mapState } from 'vuex';
import emojiList from '@/assets/emoji.json';
import bs from 'better-scroll';
import { clickOutSide } from '@/utils/dom';
export default {
  data() {
    return {
      errorTimes: 0,
      websock: null,
      newsList: [],
      textValue: '',
      emoji: false,
      emojiList,
      outSideEvent: null
    };
  },
  computed: {
    ...mapState({ userInfo: state => state.user.accountInfo })
  },
  created() {
    this.init();
  },
  mounted() {
    this.outSideEvent = clickOutSide('emojiList', function () {
      this.emoji = false;
    });
  },
  destroyed() {
    this.emoji = false;
    //console.log("destroyed")
  },
  methods: {
    init() {
      var socket = io('http://localhost:3100');
      socket.on('receivedMessage', data => {
        console.log(data);
      });
      socket.emit('login', {
        ...this.userInfo
      });
      socket.on('userLeave', data => {
        console.log('userLeave', data);
      });
      this.websock = socket;
    },
    changeText(e) {
      this.textValue = e.target.value;
    },
    async sendNews() {
      if (!this.textValue) {
        this.$message.warning('输入内容不能为空');
        return;
      }
      await this.websock.emit('sendMessage', { to: 'AI', content: this.textValue });
      this.textValue = '';
    },
    showEmoji() {
      this.emoji = !this.emoji;
      if (this.emoji) {
        this.$nextTick(() => {
          new bs(this.$refs.emoji);
        });
      }
    },
    handleEmoji(e) {
      let el = e.srcElement || e.target;
      console.log(el, e);
      if (el.classList.contains('emoji-item')) {
        this.textValue += el.innerText;
      }
      this.emoji = false;
    }
  },
  watch: {
    emoji(nl, ol) {
      if (nl === false) {
        document.removeEventListener('click', this.outSideEvent);
      } else if (nl === true) {
        document.addEventListener('click', this.outSideEvent, true);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-container {
  margin: 0 auto;
  background-color: #fff;
  .status {
    color: #fff;
    background: #1890ff;
    height: 35px;
    line-height: 35px;
    text-align: center;
  }
  .list-item {
    box-sizing: border-box;
    padding: 5px 15px;

    .message {
      background-color: #f0f2f5;
      margin-left: 8px;
      line-height: 32px;
      max-width: calc(100% - 100px);
      border-radius: 3px;
      display: inline-block;
      position: relative;
      padding: 0 12px;
      box-sizing: border-box;
    }
    .myself {
      margin-right: 8px;
    }
    .myself.message::before {
      border-right: 0;
      border-left: 6px solid #f0f2f5;
      left: unset;
      right: -6px;
    }

    .message::before {
      content: ' ';
      border-left: 0px solid #f0f2f5;
      border-top: 6px solid transparent;
      border-right: 6px solid #f0f2f5;
      border-bottom: 6px solid transparent;
      position: absolute;
      left: -6px;
      top: 12px;
    }
  }
}
.comment-container {
  padding: 8px 0;
  /deep/ .ant-comment-inner {
    padding: 0;
  }
  .row {
    margin-bottom: 8px;
  }
  .type-list {
    list-style: none;
    margin: 0;
    padding: 0;
    .type-item {
      font-size: 24px;
      padding: 0 8px;
      float: left;
      position: relative;
      cursor: pointer;
      .emojiList {
        background-color: #fff;
        position: absolute;
        bottom: 40px;
        left: 0;
        width: 162px;
        cursor: pointer;
        height: 100px;
        overflow: hidden;
        border: 1px solid #ccc;
        box-sizing: border-box;
        .content {
          height: auto;
          width: 100%;
          .emoji-item {
            height: 32px;
            width: 32px;
            float: left;
          }
        }
      }
    }
  }
}
</style>
