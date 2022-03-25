<template>
  <div class="userInfo-container" ref="userInfo" @getUserInfo="getUserInfo">
    <div class="header" v-if="userInfo">
      <div class="bgi">
        <img src="../../assets/guide-cover.jpg" alt="" srcset="" class="bgi-cover" />
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
            <div class="edit-button flex-box" title="互相关注,才可以发送消息哦">
              <span style="margin-right: 4px">发私信</span><a-icon type="mail" style="font-size: 18px"></a-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-if="userInfo">
      <div>
        <summary-card :summary="userInfo['summary']" @change="setView"></summary-card>
        <skill-card :canEdit="isSelf" :skills="userInfo['skills']"></skill-card>
      </div>
      <div class="view-box">
        <dynamic-editor v-if="viewKey === 'dynamic-editor'" @change="setView"></dynamic-editor>
        <article-editor v-else-if="viewKey === 'article-editor'" @change="setView"></article-editor>
        <dynamic-article-tab v-else :userID="userInfo['userID']"></dynamic-article-tab>
      </div>
    </div>
  </div>
</template>

<script>
import { skillCard, summaryCard, dynamicArticleTab, dynamicEditor, articleEditor } from './components/index.js';
import { getUserInfo, updateUserInfo } from '@/api/user.js';
export default {
  data() {
    return {
      previewVisible: false,
      loading: false,
      userInfo: null,
      viewKey: 'normal'
    };
  },
  components: { skillCard, summaryCard, dynamicArticleTab, dynamicEditor, articleEditor },
  methods: {
    setView(viewKey) {
      this.viewKey = viewKey;
    },
    async getUserInfo(userID) {
      try {
        switch (Boolean(userID)) {
          case true:
            this.userInfo = await getUserInfo({ userID });
            break;
          default:
            this.userInfo = this.$store.getters.userInfo;
            break;
        }
      } catch (error) {}
    },
    async uploadAvatar(ev) {
      let files = ev.target.files;
      if (files.length) {
        let file = files[0];
        if (/image\/(png|jpe?g)/.test(file.type)) {
          if (file.size < 2 * 1024 * 1024) {
            var form=new FormData();
            form.append('file',file);
            // let cloudPath = ['avatar', this.userInfo['userID'], file['name']].join('/');
            // let { fileID } = await app.uploadFile({
            //   cloudPath,
            //   filePath: file,
            //   onUploadProgress: function (progressEvent) {
            //     this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //   }
            // });
            // let { fileList } = await app.getTempFileURL({
            //   fileList: [fileID]
            // });
            // console.log(fileID, fileList);
            // updateUserInfo({
            //   userID: this.userInfo['userID'],
            //   avatar: fileList[0]['download_url']
            // }).then(() => {
            //   this.$store.dispatch('user/getUserInfo');
            //   this.getUserInfo();
            // });
          } else {
            this.$message.error('头像文件不能大于2MB');
          }
        } else {
          this.$message.error('请选择png|jpg格式文件');
        }
      }
    }
  },
  created() {
    console.log(this.$store.getters.userInfo);
    this.getUserInfo();
    this.$bus.$on('getUserInfo', this.getUserInfo);
  },
  computed: {
    noSecret() {
      return true;
    },
    isSelf() {
      return this.userInfo['userID'] === this.$store.getters.userInfo['userID'];
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
          height: 32px;
          line-height: 32px;
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
    .view-box {
      margin-left: 10px;
      background-color: #fff;
      flex-grow: 1;
    }
  }
}
</style>