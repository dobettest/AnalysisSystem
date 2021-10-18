<template>
  <div class="userInfo-container" ref="userInfo">
    <div class="header" v-if="userInfo">
      <div class="bgi">
        <img src="../../../assets/guide-cover.jpg" alt="" srcset="" class="bgi-cover" />
        <div class="edit-cover" v-if="isSelf">
          <label style="cursor: pointer">
            <a-icon type="camera"></a-icon>
            <span class="edit-cover-title"> 上传封面 </span>
            <input type="file" id="uploadCover" style="display: none" />
          </label>
        </div>
      </div>
      <div class="userInfo-wrapper clearfix">
        <div class="user-avatar-wrapper">
          <img v-lazy="userInfo['avatar']" alt="" class="user-avatar" />
          <label class="edit-userAvatar" v-if="isSelf">
            <a-icon type="camera" class="upload-avatar"></a-icon>
            <p>修改我的头像</p>
            <input type="file" id="upload-avatar" style="display: none" accept="image/*" @change="uploadAvatar" />
          </label>
          <label class="edit-userAvatar" v-else @click="previewVisible = true">
            <a-icon type="plus" class="upload-avatar"></a-icon>
            <p>放大预览</p>
          </label>
          <a-modal :visible="previewVisible" title="预览" :footer="null" @cancel="previewVisible = false">
            <img alt="example" style="width: 100%" :src="userInfo['avatar']" />
          </a-modal>
        </div>
        <div class="user-info">
          <h2 class="user-name">{{ userInfo['userID'] }}</h2>
          <div class="user-info-detail">
            <div class="row clearfix">
              <div class="row-item">
                <span class="row-key">城市:</span>
                <span class="row-value">{{ userInfo['location'] }}</span>
              </div>
              <div class="row-item">
                <span class="row-key">职位:</span>
                <span class="row-value">{{ userInfo['job'] }}</span>
              </div>
              <div class="row-item">
                <span class="row-key">权限:</span>
                <span class="row-value">开发部</span>
              </div>
            </div>
            <div class="row clearfix secret-info" v-if="noSecret">
              <div class="row-item">
                <span class="row-key"><a-icon type="phone"></a-icon></span>
                <span class="row-value">{{ userInfo['phone'] || '暂无' }}</span>
              </div>
              <div class="row-item">
                <span class="row-key"><a-icon type="mail"></a-icon></span>
                <span class="row-value">{{ userInfo['mail'] || '暂无' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="edit-button-wrapper">
          <button type="button" class="edit-button" v-if="isSelf">
            <a-icon type="edit" style="margin-right: 4px"></a-icon>编辑个人资料
          </button>
          <div class="edit-button-group" v-else>
            <div class="edit-button" title="互相关注,才可以发送消息哦">
              <a-icon type="check" style="margin-right: 4px"></a-icon>加为关注
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main clearfix" v-if="userInfo">
      <div class="card-container">
        <summary-card :summary="userInfo['summary']"></summary-card>
        <skill-card :canEdit="isSelf" :skills="userInfo['skills']"></skill-card>
      </div>
      <div class="dynamic-article-container">
        <dynamic-article-tab :userID="userInfo['userID']"></dynamic-article-tab>
      </div>
    </div>
  </div>
</template>

<script>
import { skillCard, summaryCard, dynamicArticleTab } from './components/index.js';
import { getInfo, updateUserInfo } from '@/api/user.js';
import { getBase64 } from '@/utils/index.js';
export default {
  data() {
    return {
      userInfo: null,
      previewVisible: false
    };
  },
  components: { skillCard, summaryCard, dynamicArticleTab },
  methods: {
    async getUserInfo() {
      let { userID } = this.$route.query;
      const { data } = await getInfo({ userID });
      if (data['info']) {
        this.userInfo = data['info'];
      }
    },
    uploadAvatar(ev) {
      let files = ev.target.files;
      if (files.length) {
        let file = files[0];
        if (/image\/(png|jpe?g)/.test(file.type)) {
          if (file.size < 2 * 1024 * 1024) {
            getBase64(file, imageUrl => {
              updateUserInfo({
                userID: this.userInfo['userID'],
                avatar: imageUrl
              }).then(() => {
                this.$store.dispatch('user/getUserInfo');
              });
            });
          } else {
            this.$message.error('头像文件不能大于2MB');
          }
        } else {
          this.$message.error('请选择png|jpg格式文件');
        }
      }
    }
  },
  watch: {
    isSelf: {
      handler(nl, ol) {
        nl ? (this.userInfo = this.$store.state.user['accountInfo']) : this.getUserInfo();
      },
      immediate: true
    },
    userInfo: {
      handler(nl, ol) {
        if (!nl) {
          this.$nextTick(() => {
            this.$loading.show({
              getContainer: () => {
                return this.$refs.userInfo;
              }
            });
          });
        } else {
          this.$loading.hide();
        }
      },
      immediate: true
    }
  },
  computed: {
    noSecret() {
      return true;
    },
    isSelf() {
      return this.$route.query['userID']
        ? this.$route.query['userID'] === this.$store.state.user.accountInfo['userID']
        : true;
    }
  }
};
</script>

<style lang="scss">
.userInfo-container {
  background: #f0f2f5;
  padding: 15px;
  // overflow: auto;
  .header {
    background-color: #fff;
    padding: 10px;
    .bgi {
      height: 240px;
      background-color: #fff;
      position: relative;
      .bgi-cover {
        height: 100%;
        width: 100%;
      }
      .edit-cover {
        position: absolute;
        right: 25px;
        top: 25px;
        color: hsla(0, 0%, 100%, 0.7);
        font-size: 18px;
        border: 1px solid hsla(0, 0%, 100%, 0.24);
        padding: 10px;
        &:hover {
          color: #fff;
        }
      }
    }
    .userInfo-wrapper {
      position: relative;
      .user-avatar-wrapper {
        position: relative;
        border: 4px solid #fff;
        border-radius: 8px;
        width: 160px;
        height: 160px;
        margin-top: -80px;
        margin-left: 15px;
        float: left;
        .user-avatar {
          border-radius: 2px;
          width: 100%;
          height: 100%;
        }
        &:hover {
          .edit-userAvatar {
            display: flex;
          }
        }
        .edit-userAvatar {
          cursor: pointer;
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          color: hsla(0, 0%, 100%, 0.9);
          background-color: rgba(#121212, 0.5);
          .upload-avatar {
            font-size: 36px;
            margin-bottom: 10px;
          }
        }
      }
      .user-info {
        margin-left: 175px;
        padding-left: 10px;
        .user-info-detail {
          .row {
            .row-item {
              float: left;
              padding: 4px;
              .row-key {
                margin-right: 4px;
              }
              .row-value {
              }
            }
          }
        }
      }
      .edit-button-wrapper {
        position: absolute;
        right: 10px;
        bottom: 0;
        padding: 4px;
        .edit-button {
          // color: #06f;
          // border: 1px solid #06f;
          height: 32px;
          display: flex;
          align-items: center;
          padding: 1px 6px;
          color: $color-primary;
          border: 1px solid $color-primary;
          cursor: pointer;
          outline: none;
          background-color: #fff;
        }
      }
    }
  }
  .main {
    margin-top: 10px;
    display: flex;
    .card-container {
      .summary-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 348px;
        background-color: #fff;
        padding: 10px;
        .summary-item {
          width: 120px;
          text-align: center;
          cursor: pointer;
          .summary-num {
            padding: 4px;
            font-family: Tahoma;
            color: #333;
            &:hover {
              color: #eb7350;
            }
          }
          .summary-name {
            color: #808080;
          }
        }
      }
      .skill-card-container {
        background-color: #fff;
        width: 348px;
        margin-top: 10px;
        .skill-echart,
        .skill-edit-container {
          height: 300px;
          width: 300px;
        }
        .skill-edit-container {
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 4px;
          }
          &:hover {
            &::-webkit-scrollbar-thumb {
              background-color: #ccc;
            }
          }
          .skill-item {
            height: 32px;
            display: flex;
            align-items: center;
            .skill-name {
              width: 60px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .skill-progress-bar {
              flex: 1;
              flex-grow: 1;
              cursor: pointer;
              outline: none;
              margin: 0 4px;
            }
            .skill-dele-btn {
              font-size: 18px;
              color: red;
              cursor: pointer;
            }
          }
          .add-skill {
            margin-top: 10px;
            border: 1px solid #c1b1c1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 32px;
            cursor: pointer;
          }
        }
      }
    }
    .dynamic-article-container {
      margin-left: 10px;
      padding: 10px;
      background-color: #fff;
      flex-grow: 1;
    }
  }
}
</style>