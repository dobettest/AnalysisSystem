<template>
  <a-list :data-source="list">
    <conversation-item  slot-scope="item" slot="renderItem" :conversation="item"></conversation-item>
  </a-list>
</template>

<script>
import conversationItem from './components/conversation-item.vue'
export default {
  name: 'conversationList',
  components:{conversationItem},
  computed: {
    height() {
      let h = this.list.length * 45;
      return h + 'px';
    },
    list() {
      return this.$store.state.tim.conversationList;
    }
  },
  watch: {
    list: {
      handler(nl, ol) {
        if (nl) {
          // this.$emit('update')
        }
      },
      deep: true
    }
  },
  methods: {
    offset(x) {
      return x > 99 ? 12 : 0;
    },
    Avatar(item) {
      // Object.prototype.hasOwnProperty.call(item, "userProfile") ?
      switch (item.type) {
        case 'GROUP':
          return item.groupProfile.avatar
        case 'C2C':
          return item.userProfile.avatar
        default:
          return ''
      }
    },
    resolveTime(time) {
      let ms = time * 1000;
      let date = new Date(ms);
      let now = Date.now();
      let today = new Date(now);
      let day = 24 * 60 * 60 * 1000;
      let week = 7 * day;
      if (now - ms > week) {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
      } else if (today.getDate() - date.getDate()) {
        return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]
      } else {
        return [date.getHours(), date.getMinutes()].join(":")
      }
    },
    setConversation(item) {
      let payload;
      switch (item['type']) {
        case TIM.TYPES.CONV_C2C:
          payload = {
            conversationID: item['conversationID'],
            profile: item['userProfile'],
            remark:item['remark']
          }
          break;
        case TIM.TYPES.CONV_GROUP:
          payload = {
            conversationID: item['conversationID'],
            profile: item['groupProfile'],
            remark:item['remark']
          }
          break;
        case TIM.TYPES.CONV_SYSTEM:
          payload = {
            conversationID: item['conversationID'],
            profile: {},
            remark:item['remark']
          }
          break;
        default:
          break;
      }
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>