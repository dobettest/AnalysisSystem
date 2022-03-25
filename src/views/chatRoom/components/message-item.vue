<template>
  <div class="message-item clearfix">
    <a-avatar
      :class="{ me: message['flow'] === 'out' }"
      shape="square"
      size="large"
      icon="user"
      class="msg-avatar"
    ></a-avatar>
    <template>
      <span v-if="message['type'] === TIM.TYPES.MSG_TEXT" class="msg" :class="{ me: message['flow'] === 'out' }">{{
        message['payload']['text']
      }}</span>
      <img
        :src="message['payload']['imageInfoArray'][0]['url']"
        alt
        v-if="message['type'] === TIM.TYPES.MSG_IMAGE"
        class="msg-img"
        :class="{ me: message['flow'] === 'out' }"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'message-message',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.message-item {
  min-height: 60px;
  padding: 4px;
}
.msg{
    background-color: #e5e5e5;
}
.msg-avatar {
  margin: 4px;
}
.me {
  float: right;
}
.msg-img {
  vertical-align: text-top;
  width: 120px;
  height: 120px;
}
</style>