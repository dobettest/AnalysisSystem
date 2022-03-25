<template>
  <RecycleScroller
    v-infinite-scroll="handleInfiniteOnLoad"
    style="height: 493px"
    :items="dynamicList"
    :min-item-size="32"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
    key-field="_id"
    v-slot="{ item }"
    class="scroll-bar"
  >
    <launchItem :dynamic="item" />
  </RecycleScroller>
</template>

<script>
import launchItem from './components/launch-item.vue';
import infiniteScroll from 'vue-infinite-scroll';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
export default {
  directives: { infiniteScroll },
  data() {
    return {
      loading: false,
      dynamicList: [
        {
          albumlist: [],
          comments: [],
          data: '1、在路上，不为旅行，不因某人，只为在未知的途中遇见未知的自己。2、有的事情现在不做，就一辈子也不会做了。3、关于旅行，关于生活，如此而已。4、我和西藏之间，只隔着一张火车票。5、旅行是消除仇恨和无知的最好方法。6、年轻时，旅行是教育的一部分；年老时，旅行是阅历的一部分。',
          edit: false,
          likelist: []
        },
        {
          albumlist: [],
          comments: [],
          data: '1、在路上，不为旅行，不因某人，只为在未知的途中遇见未知的自己。2、有的事情现在不做，就一辈子也不会做了。3、关于旅行，关于生活，如此而已。4、我和西藏之间，只隔着一张火车票。5、旅行是消除仇恨和无知的最好方法。6、年轻时，旅行是教育的一部分；年老时，旅行是阅历的一部分。',
          edit: false,
          likelist: []
        },
        {
          albumlist: [],
          comments: [],
          data: '1、在路上，不为旅行，不因某人，只为在未知的途中遇见未知的自己。2、有的事情现在不做，就一辈子也不会做了。3、关于旅行，关于生活，如此而已。4、我和西藏之间，只隔着一张火车票。5、旅行是消除仇恨和无知的最好方法。6、年轻时，旅行是教育的一部分；年老时，旅行是阅历的一部分。',
          edit: false,
          likelist: []
        }
      ],
      busy: false,
      skip: 0
    };
  },
  props: {
    userID: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    friendList() {
      return this.$store.state.tim.friendList;
    },
    userList() {
      return ['mym17770831435', 'mym18720787170', 'mym13640735596'];
    }
  },
  watch: {
    userID: {
      handler(nl, ol) {
        this.getDynamicList();
      },
      immediate: true
    }
  },
  methods: {
    handleInfiniteOnLoad() {
      console.log('load more');
      this.busy = true;
    },
    async getDynamicList() {
      this.loading = true;
      const data = [];
      this.loading = false;
      this.dynamicList = data;
    }
  },
  components: {
    launchItem,
    RecycleScroller
  }
};
</script>

<style lang="scss" scoped>
.dynamic-container {
  .dynamic-list {
  }
}
</style>