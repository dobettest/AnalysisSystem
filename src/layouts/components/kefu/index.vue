<template>
  <div class="kefu-container">
    <dl v-if="visible" class="talk-container">
      <dt class="talk-title">
        <h4 class="flex-box"><my-svg-icon icon="kefu" :size="20" :overlayStyle="{ padding: '2px' }" />服务咨询</h4>
        <a-icon type="close" @click="visible = false" class="talk-icon flex-box"></a-icon>
      </dt>
      <dd class="talk-list"></dd>
      <dd class="talk-box">
        <my-emojis />
      </dd>
    </dl>
    <my-svg-icon icon="kefu" :size="60" @click="talk" v-else></my-svg-icon>
  </div>
</template>

<script>
import timMx from '@/mixins/tim.js';
import { nanoid } from 'nanoid';
import { createTimTicket } from '@/api/user';
export default {
  name: 'mini-kefu',
  data() {
    return {
      user: null,
      title: '连接中...',
      visible: false
    };
  },
  mixins: [timMx],
  methods: {
    talk() {
      console.log('talk');
      this.visible = true;
      //   switch (Boolean(this.user)) {
      //     case false:
      //       let userID = nanoid(6);
      //       this.user = {
      //         userID,
      //         userName: '匿名用户'
      //       };
      //       let userSig = await createTimTicket({ userID });
      //       await this.timLogin({ userID, userSig });
      //       this.title = '人工客服';
      //       break;
      //     default:
      //       break;
      //   }
    }
  }
};
</script>

<style lang="scss" scoped>
.kefu-container {
  position: fixed;
  right: 10px;
  bottom: 25%;
  .talk-container {
    width: 360px;
    background-color: #fff;
    box-shadow: inset 0 0 0 0.6px #ccc;
    padding: 4px 6px;
    .talk-list {
      min-height: 60px;
    }
    .talk-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 42px;
      border-bottom: 1px solid #c5c5c5;
      .talk-icon {
        width: 32px;
        height: 32px;
        padding: 4px;
      }
    }
  }
}
</style>