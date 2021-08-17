<template>
  <div class="userInfo-wrapper">
    <a-row :gutter="16">
      <a-col :span="7">
        <a-card :hoverable="true" :bordered="false">
          <div class="accountInfo">
            <img :src="accountInfo['avatar']" alt="" class="accountImg" />
            <div class="username">{{ accountInfo.username }}</div>
          </div>
          <a-divider />
          <div class="accountMajor">
            <p>{{ $t('common.baseInfo') }}</p>
            <template v-for="(v, k) in accountInfo">
              <div
                class="major-wrapper"
                :key="k"
                v-if="['username', 'role', 'date', 'text', 'id', 'avatar', 'key'].indexOf(k) === -1"
              >
                <svg-icon :icon="k" class="vertical-bottom" />
                <span class="major-name">{{ v }}</span>
              </div>
            </template>
          </div>
          <a-divider />
          <div class="tabList">
            <p>{{ $t('common.tag') }}</p>
            <template v-for="item in tagList">
              <a-tag :key="item.title" style="margin-bottom: 6px" closable :color="item.color">
                {{ item.title }}
              </a-tag>
            </template>
            <a-input
              v-if="addInputShow"
              ref="input"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              v-model="tagValue"
              @blur="inputConfirm"
              @keyup.enter="inputConfirm"
            />
            <a-tag v-else style="cursor: pointer" @click="writeInput"> <a-icon type="plus" /> New Tag </a-tag>
          </div>
          <a-divider />
          <div class="skillList">
            <p>{{ $t('common.skill') }}</p>
            <div class="skill-wrapper" v-for="item in skillList" :key="item.title">
              {{ item.title }}
              <a-progress :percent="item.value" :status="item.status" />
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="17">
        <a-tabs v-model="currentTab" class="tab-container">
          <a-tab-pane v-for="item in tabList" :key="item.key" :tab="$t('common.' + item.tab)">
            <keep-alive>
              <component :is="item.key"></component>
            </keep-alive>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { articlePage, dynamicPage } from './components';
export default {
  name: 'userInfo',
  components: { dynamicPage, articlePage },

  data() {
    return {
      tabList: [
        {
          key: 'dynamicPage',
          tab: 'dynamic'
        },
        {
          key: 'articlePage',
          tab: 'article'
        }
      ],
      skillList: [
        {
          title: 'Vue',
          value: 95,
          status: 'active'
        },
        {
          title: 'Ant design vue',
          value: 75,
          status: 'active'
        },
        {
          title: 'Echarts',
          value: 60,
          status: 'active'
        },
        {
          title: 'ESLint',
          value: 100,
          status: 'success'
        },
        {
          title: 'Node',
          value: 100,
          status: 'exception'
        }
      ],
      tagList: [
        {
          title: '美食爱好者',
          color: '#1890FF'
        },
        {
          title: '学习',
          color: '#52C41A'
        },
        {
          title: '减肥',
          color: '#F5222D'
        },
        {
          title: '赚钱',
          color: '#1890FF'
        }
      ],
      addInputShow: false,
      tagValue: '',
      currentTab: 'dynamicPage'
    };
  },
  computed: {
    ...mapState({
      accountInfo: state => state.user.accountInfo
    })
  },
  methods: {
    inputConfirm() {
      const value = this.tagValue.trim();
      let tagList = this.tagList;
      if (value && this.tagList.findIndex(item => item.title == value) == -1) {
        tagList = [...tagList, { title: value, color: '#1890FF' }];
      }
      Object.assign(this, {
        tagValue: '',
        tagList: tagList,
        addInputShow: false
      });
    },
    writeInput() {
      this.addInputShow = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.accountInfo {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  .accountImg {
    width: 96px;
    height: 96px;
    border-radius: 50%;
  }
  .username {
    color: rgba(0, 0, 0, 0.9);
    font-weight: 500;
    font-size: 1.7rem;
    margin: 12px 0 3px 0;
  }
  .userRole {
    color: #999;
    font-size: 0.8rem;
  }
}
.major-wrapper {
  margin-bottom: 5px;
  .major-name {
    margin-left: 10px;
  }
}
.skill-wrapper {
  margin-bottom: 10px;
}
.tab-container {
  background-color: #fff;
  padding: 0 10px;
}
</style>
