<template>
  <section class="message-box">
    <ul>
      <li class="message-meta">
        <a-popover placement="topLeft" trigger="click">
          <my-svg-icon icon="emoji"></my-svg-icon>
          <p class="emoji-list scroll-bar" slot="content">
            <span class="emoji-item" v-for="(item, idx) in emojiList" :key="idx" @click.stop="emojiClick(item)">{{
              item['char']
            }}</span>
          </p>
        </a-popover>
      </li>
      <li class="message-meta">
        <a-tooltip>
          <template slot="title">发送图片</template>
          <label style="display: block">
            <my-svg-icon icon="photo"></my-svg-icon>
            <input type="file" style="display: none" accept="image/*" @change="sendImage" />
          </label>
        </a-tooltip>
      </li>
      <li class="message-meta">
        <a-tooltip>
          <template slot="title">发送文件</template>
          <label style="display: block">
            <my-svg-icon icon="sendFile"></my-svg-icon>
            <input type="file" style="display: none" />
          </label>
        </a-tooltip>
      </li>
      <li class="message-meta">
        <a-tooltip>
          <template slot="title">语言通话</template>
          <my-svg-icon icon="voice" @click.native="handleLiving"></my-svg-icon>
        </a-tooltip>
      </li>
      <li class="message-meta">
        <a-tooltip>
          <template slot="title">视频通话</template>
          <my-svg-icon icon="video"></my-svg-icon>
        </a-tooltip>
      </li>
    </ul>
    <a-textarea class="content-box" v-model="message"></a-textarea>
    <a-tooltip placement="topLeft" class="send-btn">
      <template slot="title">按Enter发送消息，Ctrl+Enter换行</template>
      <my-svg-icon icon="send" @click.native="sendMessage"></my-svg-icon>
    </a-tooltip>
  </section>
</template>

<script>
import emojiList from '@/assets/emoji.json';
import tim from '@/lib/tim.js';
export default {
  name: 'message-box',
  data() {
    return {
      message: '',
      emojiList,
      visible: false
    };
  },
  methods: {
    async sendImage(ev) {
      let files = ev.target.files;
      if (files.length) {
        let file = files[0];
        let message = tim.createImageMessage({
          to: 'user0',
          conversationType: TIM.TYPES.CONV_C2C,
          // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
          // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
          // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
          payload: {
            file
          },
          // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
          // cloudCustomData: 'your cloud custom data'
          onProgress: function (event) {
            console.log('file uploading:', event);
          }
        });
        await tim.sendMessage(message);
      }
    },
    emojiClick(item) {
      this.message = this.message.concat(item['char']);
    },
    async sendMessage() {
      let { message: text } = this;
      if (text !== '') {
        let message = tim.createTextMessage({
          to: 'user0',
          conversationType: TIM.TYPES.CONV_C2C,
          // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
          // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
          // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
          payload: {
            text
          }
          // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
          // cloudCustomData: 'your cloud custom data'
        });
        // 2. 发送消息
        await tim.sendMessage(message);
        this.message = '';
      } else {
        this.$message.warning('不能发送空消息');
      }
    },
    handleLiving() {
      console.log('handleLiving')
      this.$store.commit('trtc/setVisible', true);
    }
  }
};
</script>

<style lang="scss" scoped>
.message-box {
  height: 147px;
  position: relative;
  border-top: 1.5px solid #ebedf0;
  .content-box {
    border: none !important;
    outline: none !important;
    box-shadow: none;
    height: calc(100% - 42px);
  }
  .message-meta {
    float: left;
  }
}
::v-deep .svgClass {
  padding: 0 6px;
  width: 42px;
  height: 42px;
  cursor: pointer;
}
.emoji-list {
  height: 180px;
  width: 330px;
  overflow: auto;
  .emoji-item {
    height: 36px;
    width: 36px;
    font-size: 24px;
    float: left;
    cursor: pointer;
  }
}
.send-btn {
  position: absolute;
  right: 10px;
  bottom: 5px;
  z-index: 999;
  width: 42px;
  height: 42px;
  cursor: pointer;
  color: $color-primary !important;
}
</style>