<template>
  <a-row class="messageList">
    <a-col :xs="10" :sm="10" :md="8" :lg="8" :xl="7" class="conversationList">
      <div class="conversation-item">
        <a-avatar></a-avatar>
      </div>
    </a-col>
    <a-col :xs="14" :sm="14" :md="16" :lg="16" :xl="17" class="currentCoversation">
      currentCoversation
    </a-col>
  </a-row>
</template>

<script>
import { getUserTable } from '@/api/userManage';
export default {
  name: 'conversationList',
  async created() {
    const res = await getUserTable();
    console.log('res', res);
  }
};
</script>

<style lang="scss">
.messageList {
  height: 100%;
  .conversationList {
  }
  .currentCoversation {
    background-color: #fff;
  }
}
</style>
