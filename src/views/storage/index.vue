<template>
  <div class="storage-container">
    <div class="file-header">
      <dl class="file-header-path" @click="goto">
        <dt class="path-title">当前路径:</dt>
        <dd v-for="(item, idx) in paths" :key="idx" class="path-item">
          <span class="path-name" :data-index="idx">{{ item }} </span
          ><span class="path-split" v-if="idx < paths.length - 1">/</span>
        </dd>
      </dl>
      <div class="file-header-extra">
        <a-button type="primary" class="file-header-extra-item" icon="upload">上传文件</a-button>
        <a-button type="primary" class="file-header-extra-item" icon="folder-add" @click="visible = true"
          >创建文件夹</a-button
        >
        <a-button type="danger" class="file-header-extra-item" icon="delete">删除文件</a-button>
        <a-button type="primary" class="file-header-extra-item" icon="drag">批量移动</a-button>
      </div>
    </div>
    <div class="file-container">
      <ul class="file-list" v-if="hasFiles" @click="itemClick">
        <li class="file-item" v-for="(item, idx) in current['files']" :key="idx" :data-index="idx">
          <svg-icon :icon="item.ftype" class="file-type"></svg-icon>
          <div class="file-name">{{ item.fname }}</div>
        </li>
      </ul>
      <div class="empty-container" v-if="empty"></div>
    </div>
    <createFolder
      :visible="visible"
      @close="visible = false"
      @update="update"
      :current="current"
      v-if="visible"
    ></createFolder>
  </div>
</template>

<script>
import { app, files } from '@/lib/storage.js';
import { mapState } from 'vuex';
import { getCloudBaseAuth } from '@/api/user';
import createFolder from './component/createFolder.vue';
export default {
  components: {
    createFolder
  },
  data() {
    return {
      currentPath: 'root',
      current: null,
      visible: false,
      ready: false
    };
  },
  mounted() {
    if (!this.isAuth) {
      let { userID } = this.userInfo;
      getCloudBaseAuth(userID).then(({ data: ticket }) => {
        app.auth().customAuthProvider().signIn(ticket);
        const loginState = app.auth().hasLoginState();
        this.$store.dispatch('user/SET_CLOUDBASEAUTH', loginState);
      });
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.accountInfo,
      isAuth: state => state.user.cloudbaseAuth
    }),
    hasFiles() {
      return (this.current && this.current.files.length) || false;
    },
    empty() {
      //单独通过文件长度来判断是否显示空内容会导致先空白再显示文件的闪烁，因为初始hasFile必定为false
      console.log(!this.hasFiles && this.ready, this.hasFiles, this.ready);
      return !this.hasFiles && this.ready;
    },
    paths() {
      let { currentPath } = this;
      return currentPath.indexOf('/') !== -1 ? currentPath.split('/') : [currentPath];
      //return this.currentPath.match(/([^\/]+\/?)/g);
    }
  },
  methods: {
    goto(event) {
      let e = event.srcElement || event.target;
      let idx = -1;

      if (e.parentNode.tagName.toLowerCase() === 'dd' && e.className.indexOf('path-name') !== -1) {
        idx = parseInt(e.getAttribute('data-index'));
      }
      if (idx !== -1 && idx !== this.paths.length - 1) {
        this.currentPath = this.paths.slice(0, ++idx).join('/');
      }
    },
    uploadFile() {
      app
        .uploadFile({
          cloudPath: 'test-admin.jpeg',
          filePath: document.getElementById('file').files[0],
          onUploadProgress: function (progressEvent) {
            console.log(progressEvent);
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        })
        .then(result => {
          // 上传结果
        });
    },
    itemClick(event) {
      let e = event.srcElement || event.target;
      let idx = -1;
      switch (e.tagName) {
        case 'li':
          idx = e.getAttribute('data-index');
          break;
        case 'div':
          idx = e.parentNode.getAttribute('data-index');
          break;
        case 'use':
          idx = e.parentNode.parentNode.getAttribute('data-index');
          break;
        default:
          break;
      }
      if (idx !== -1) {
        let item = this.current['files'][idx];
        if (item['ftype'] === 'folder') {
          this.currentPath = [this.currentPath, '/', item['fname']].join('');
        } else {
          //处理文件类型逻辑
          console.log('download', [this.currentPath, item['fname']].join(''));
          const download = document.createElement('a');
          download.src = [this.currentPath, item['fname']].join('');
          download.click();
        }
      }
    },
    update() {
      this.getFileList().then(() => {
        this.visible = false;
      });
    },
    setCurrentPath(path) {
      this.currentPath = path;
    },
    async getFileList() {
      this.ready = false; //解决文件加载中加载闪烁问题
      const { data: fileList } = await files
        .where({
          dirname: this.currentPath
        })
        .get();
      this.current = fileList[0];
      this.ready = true;
    }
  },
  watch: {
    currentPath: {
      handler(nl, ol) {
        if (nl) {
          console.log('nl', nl);
          this.getFileList();
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
.storage-container {
  height: 100%;
  padding: 25px;
  .file-header {
    display: flex;
    align-items: center;
    padding: 8px 0;
    height: 52px;
    border-bottom: 0.5px solid #ccc;
    .file-header-path {
      user-select: none;
      flex-grow: 1;
      margin: 0;
      font-size: 18px;
      .path-title {
        float: left;
        margin-right: 6px;
      }
      .path-item {
        cursor: pointer;
        margin: 0;
        float: left;
        text-align: center;
        .path-name {
          display: inline-block;
          margin: 0;
        }
        .path-split {
          margin: 0 5px;
        }
        &:not(:last-child) {
          &:hover {
            .path-name {
              color: $color-primary;
            }
          }
        }
      }
    }
    .file-header-extra {
      float: right;
      .file-header-extra-item {
        margin: 0 4px;
      }
    }
  }
  .file-container {
    height: calc(100% - 52px);
    padding-top: 15px;
    position: relative;
    .file-list {
      height: 100%;
      .file-item {
        float: left;
        width: 80px;
        height: 90px;
        text-align: center;
        cursor: pointer;
        .file-type {
          font-size: 56px !important;
        }
        .file-name {
          user-select: none;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .empty-container {
      height: 100%;
      background: center/contain url('~@/assets/empty.svg') no-repeat;
    }
  }
}
</style>