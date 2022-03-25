<template>
  <section class="storage-container">
    <div class="file-header">
      <div class="file-header-tool">
        <div class="path-list">
          <p class="path-title">当前路径:</p>
          <a-breadcrumb separator="/" class="text-elipise">
            <a-breadcrumb-item v-for="(item, idx) in paths" :key="idx" class="path-item" @click.native="goto(idx)">
              {{ item }}
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="file-header-extra">
          <a-button type="primary" class="file-header-extra-item" icon="control" @click="mutiSelect">批量操作</a-button>
          <a-button type="primary" class="file-header-extra-item">
            <label
              ><a-icon type="upload" style="margin-right: 8px" />上传文件<input
                type="file"
                multiple
                style="display: none"
                @change="handleFiles"
            /></label>
          </a-button>
          <a-button type="primary" class="file-header-extra-item" icon="folder-add" @click="visible = true"
            >创建文件夹</a-button
          >
          <a-button type="danger" class="file-header-extra-item" icon="delete" @click="deleteFile">删除文件</a-button>
          <a-radio-group v-model="tabKey" button-style="solid" @change="changeView" class="file-header-extra-item">
            <a-radio-button value="list"><a-icon type="table" style="margin: 0 4px" />列表</a-radio-button>
            <a-radio-button value="table"><a-icon type="profile" style="margin: 0 4px" />表格</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="storage-resume">
        <a-progress :percent="percent" :strokeWidth="20" class="storage-progress" :show-info="false"></a-progress>
        <div class="storage-info">
          <span class="storage-num">{{ consumed }}</span>
          <span class="storage-split">/</span>
          <span class="storage-num">{{ storageInfo['total'] }}</span>
        </div>
        <a-button type="primary" icon="plus">扩容</a-button>
      </div>
    </div>
    <div class="file-container" ref="file" v-loading="loading">
      <file-list :source="current['files']" v-if="tabKey === 'list'" @itemClick="itemClick"></file-list>
      <file-table :source="current['files']" v-else @itemClick="itemClick" @del="del"></file-table>
      <upload-list-dg v-if="visibleUF" @close="visibleUF = false"></upload-list-dg>
    </div>
    <createFolder
      :visible="visible"
      :creator="userInfo['userID']"
      @close="visible = false"
      @create="createFolder"
      :current="current"
      v-if="visible"
    ></createFolder>
    <move-file :visible="moveable" @hide="moveable = false"></move-file>
  </section>
</template>

<script>
import { resolveType, n2s, s2n } from '@/lib/cloudbase';
import createFolder from './component/createFolder.vue';
import uploadListDg from './component/uploadList.vue';
import moveFile from './component/move-file.vue';
import fileList from './component/list.vue';
import fileTable from './component/table.vue';
import { getStorageInfo } from '@/api/storage';
import { getDir } from '@/api/folder';
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};
export default {
  components: {
    createFolder,
    uploadListDg,
    moveFile,
    fileTable,
    fileList
  },
  data() {
    return {
      current: {
        files: []
      },
      visible: false,
      loading: false,
      visibleUF: false, //上传列表窗口,
      tabKey: 'list',
      rowSelection,
      multiple: false,
      selectedArr: [],
      moveable: false,
      storageInfo: {
        total: '5GB',
        consume: 0,
        storageID: ''
      },
      paths: []
    };
  },
  filters: {
    format(text) {
      return n2s(text);
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.accountInfo;
    },
    currentPath: {
      get() {
        return this.$store.state.cloudbase.currentPath;
      },
      set(val) {
        this.$store.dispatch('cloudbase/setCurrentPath', val);
      }
    },
    percent() {
      let num = this.storageInfo['consume'] / (s2n(this.storageInfo['total']) / 100);
      return Math.floor(num);
    },
    consumed() {
      return n2s(this.storageInfo['consume']);
    }
  },
  async created() {
    this.loading = true;
    let data=await getStorageInfo({
      creator: this.userInfo['userID']
    });
    this.loading = false;
    this.storageInfo = data;
    this.currentPath = data['storageID'];
    let dir = await getDir({
      folderID: this.currentPath
    });
    this.paths.push(dir['folderName']);
    this.current = dir;
    let test=await new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve('test')
      },16000);
    })
    console.log(test)
  },
  methods: {
    async del(record) {},
    deleteFile() {},
    move(record) {
      this.moveable = true;
    },
    handleRename(record) {
      this.$set(record, 'editable', true);
    },
    mutiSelect() {},
    changeView(e) {
      // this.multiple = false;
      // this.tabKey = e.target.value;
    },
    goto(idx) {
      // this.currentPath = this.paths.slice(0, ++idx).join('/');
    },
    handleFiles(ev) {},
    createFolder(currentPath, folder) {},
    itemClick(item) {},
    async update() {
      // await this.getFileList();
      // this.visible = false;
    },
    async getFileList() {}
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  position: relative;
  height: 40px;
  .tab-item {
    text-align: center;
    display: inline-block;
    cursor: pointer;
    min-width: 120px;
    height: 36px;
    line-height: 36px;
  }
  .tab-link {
    border-bottom: 1px solid #e5e5e6;
    .tab-active {
      width: 0;
      height: 2px;
      background-color: $color-primary;
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.storage-container {
  height: 100%;
  padding: 4px 8px;
  border: 15px solid #f0f2f5;
  .file-header {
    height: 90px;
    .file-header-tool {
      height: 52px;
      display: flex;
      align-items: center;
      border-bottom: 0.5px solid #e7e7e7;
      .path-list {
        display: flex;
        align-items: center;
        flex-grow: 1;
        .text-elipise {
          width: 320px;
        }
        .path-title {
          font-size: 18px;
          margin-right: 4px;
          white-space: nowrap;
        }
        .path-item {
          font-size: 18px;
          cursor: pointer;
          &:hover {
            &:not(:last-child) {
              color: $color-primary !important;
            }
          }
        }
      }
      .file-header-extra {
        .file-header-extra-item {
          margin: 0 4px;
        }
      }
    }
    .storage-resume {
      display: flex;
      align-items: center;
      height: 32px;
      .storage-info {
        margin: 0 4px;
        .storage-num,
        storage-split {
          font-style: italic;
          font-weight: 700;
          margin: 0 3px;
        }
      }
    }
  }
  .file-container {
    height: calc(100% - 90px);
    position: relative;
    overflow: auto;
  }
}
</style>