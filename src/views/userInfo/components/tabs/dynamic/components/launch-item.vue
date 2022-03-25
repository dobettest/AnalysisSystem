<template>
  <section class="dynamic-launch-item">
    <header class="dynamic-header">
      <a-avatar icon="user" size="middle" style="margin: 6px" :src="resolveAvatar()"></a-avatar>
      <div>
        <h3>{{resolveName()}}</h3>
        <h5>
          <span class="dynamic-time" v-text="resolveTime()">2020-01-03</span>
        </h5>
      </div>
      <div class="right-meta">
        <my-svg-icon icon="more" :size="24"></my-svg-icon>
      </div>
    </header>
    <main>
      <p class="dynamic-descrption">{{ dynamic['data'] }}</p>
      <div class="dynamic-albums">
        <img
          :src="item['download_url']"
          class="dynamic-album-item"
          v-for="(item, idx) in dynamic['albumList']"
          :key="idx"
        />
      </div>
    </main>
    <footer class="dynamic-footer">
      <div class="dynamic-meta">
        <div class="flex-box">
          <a-icon type="like" class="like-btn" :class="{ liked }" @click="like"></a-icon>
          <a-breadcrumb class="like-list text-elipise" separator="、">
            <a-breadcrumb-item
              class="like-item"
              v-for="(it, idx) in dynamic['likelist']"
              :key="idx"
              @click.native="navigate(it)"
            >
              {{ it }}</a-breadcrumb-item
            >
          </a-breadcrumb>
          <span>等{{ dynamic['likelist'].length }}人觉得很赞</span>
        </div>
        <div class="flex right-meta">
          <p>
            <a-tag v-for="(item, idx) in dynamic['tags']" :key="idx" :color="color(idx)">{{ item }}</a-tag>
          </p>
          <p class="flex-box" style="float: right" v-if="dynamic['position'] !== '未知'">
            <a-icon type="environment" style="padding: 4px"></a-icon>
            <span>{{ dynamic['position'] }}</span>
          </p>
        </div>
      </div>
      <div class="dynamic-meta">
        <div class="flex-box">
          <my-svg-icon icon="message" class="message-btn"></my-svg-icon>
          <span>共{{ dynamic['commentlist'].length }}条评论回复</span>
        </div>
      </div>
    </footer>
    <!-- <a-modal :visible="visible" title="全部评论" :footer="null" @cancel="visible=false">
      aaaaaaa
    </a-modal> -->
  </section>
</template>

<script>
const colors = ['pink', 'red', 'orange', 'cyan', 'blue', 'purple', '#2db7f5', '#f50', '#87d068'];
import { tofix } from '@/utils/index';
export default {
  name: 'dynamic-launch-item',
  props: {
    dynamic: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      visible:true
    }
  },
  computed: {
    friendList() {
      return this.$store.state.tim.friendList;
    },
    userInfo() {
      return this.$store.state.user.accountInfo;
    },
    liked() {
      return this.dynamic['likelist'].some(v => v === this.userInfo['userID']);
    }
  },
  methods: {
    like() {
      let likelist = [...this.dynamic['likelist']];
      let idx = likelist.findIndex(v => v === this.userInfo['userID']);
      idx === -1 ? likelist.push(this.userInfo['userID']) : likelist.splice(idx, 1);
      this.$store
        .dispatch('cloudbase/update', {
          name: 'vblog',
          where: {
            _id: this.dynamic['_id']
          },
          newVal: {
            likelist
          }
        })
        .then(data => {
          console.log('update', data, this.dynamic['_id'], likelist);
          this.dynamic['likelist'] = [...likelist];
        });
    },
    color(idx) {
      //   let index = idx || Math.round((Math.random() * 100) % 10);
      return colors[idx % 9];
    },
    navigate(userID) {
      this.$bus.$emit('getUserInfo', userID);
    },
    resolveName() {
      switch (true) {
        case this.dynamic['author'] === this.userInfo['userID']:
          return this.userInfo['username'];
        default:
          return this.dynamic['author'];
          break;
      }
    },
    resolveAvatar() {
      switch (true) {
        case this.dynamic['author'] === this.userInfo['userID']:
          return this.userInfo['avatar'];
        default:
          return '';
          break;
      }
    },
    resolveTime() {
      let date = new Date(this.dynamic['pdate']);
      let now = Date.now();
      let today = new Date(now);
      let day = 24 * 60 * 60 * 1000;
      let week = 7 * day;
      if (now - this.dynamic['pdate'] > week) {
        return [date.getFullYear(), tofix(date.getMonth() + 1), tofix(date.getDate())].join('-');
      } else if (today.getDate() - date.getDate()) {
        return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()];
      } else {
        return [date.getHours(), tofix(date.getMinutes())].join(':');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .ant-breadcrumb-separator {
  display: inline-flex;
  justify-content: center;
  margin: 0;
  font-size: 12px;
  text-align: center;
}
@keyframes ani-liked {
  0% {
    transform: rotate(20deg) scale(1.1);
  }
}
.liked {
  color: goldenrod;
  animation: ani-liked 400ms;
}
.dynamic-launch-item {
  padding: 6px;
  border-bottom: 8px solid #f0f2f5;
  .right-meta {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
  .dynamic-header {
    display: flex;
    align-items: center;
    position: relative;
  }
  .dynamic-time {
    color: #c8c8c8;
  }
  .operation {
    float: right;
    margin-right: 20px;
    position: relative;
    .trigger {
      width: 25px;
    }
    .operation-list {
      position: absolute;
      right: 25px;
    }
  }
  .dynamic-descrption {
  }
  .dynamic-albums {
    display: flex;
    align-items: center;
    margin: 0 1%;
    flex-wrap: wrap;
    .dynamic-album-item {
      width: calc(97% / 3);
      margin: 0 0.5%;
      flex-grow: 1;
      padding: 2px;
      max-height: 240px;
    }
  }
  .dynamic-footer {
    .dynamic-meta {
      display: flex;
      align-items: center;
      position: relative;
      .like-btn,
      .message-btn {
        font-size: 18px !important;
        margin: 4px;
        cursor: pointer;
      }
      .like-list {
        max-width: 240px;
        .like-item {
          color: currentColor;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>