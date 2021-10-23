<template>
  <div class="storage-container">
    <div class="file-header">
      <div class="file-header-tool">
        <div class="path-list">
          <p class="path-title">当前路径:</p>
          <a-breadcrumb separator="/" class="over-box">
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
          <a-radio-group v-model="showMode" button-style="solid" @change="changeView" class="file-header-extra-item">
            <a-radio-button value="table"><a-icon type="table" style="margin: 0 4px" />表格</a-radio-button>
            <a-radio-button value="list"><a-icon type="profile" style="margin: 0 4px" />列表</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="storage-resume">
        <a-progress :percent="percent" :strokeWidth="20" class="storage-progress" :show-info="false"></a-progress>
        <!-- <svg-icon icon="storage" class="storage-icon"></svg-icon> -->
        <div class="storage-info">
          <span class="storage-num">{{ consumed }}</span>
          <span class="storage-split">/</span>
          <span class="storage-num">{{ total }}</span>
        </div>
      </div>
    </div>
    <div class="file-container" ref="file">
      <ul class="file-list" v-if="hasFiles && showMode === 'table'" @click="itemClick">
        <li
          v-for="(item, idx) in current['files']"
          :key="idx"
          :data-index="idx"
          :class="['file-item', { multiple, selected: multiple && selectedArr[idx]['flag'] }]"
        >
          <svg-icon :icon="resolveType(item.ftype)" class="file-type"></svg-icon>
          <div class="file-name">{{ item.fname }}</div>
        </li>
      </ul>
      <a-table
        v-if="hasFiles && showMode === 'list'"
        :columns="columns"
        :data-source="current['files']"
        :pagination="{
          pageSize: 5
        }"
        bordered
        class="file-list"
      >
        <div slot="index" slot-scope="text, record, index">
          {{ index + 1 }}
        </div>
        <div class="ftype" slot="ftype" slot-scope="ftype, record, index" @click="itemClick" :data-index="index">
          <svg-icon :icon="ftype" :style="{ fontSize: 32 + 'px', cursor: 'pointer' }"></svg-icon>
        </div>
        <div slot="filesize" slot-scope="filesize">
          <span>{{ filesize | format }}</span>
        </div>
        <div slot="action">
          <a-button type="primary" size="small" style="margin: 0 4px">移动</a-button>
          <a-button type="danger" size="small" style="margin: 0 4px"> 删除 </a-button>
          <a-button type="primary" size="small" style="margin: 0 4px"> 重命名 </a-button>
        </div>
      </a-table>
      <div class="empty-container" v-if="empty"></div>
      <upload-list-dg v-if="visibleUF" @close="visibleUF = false" :upList="upList"></upload-list-dg>
    </div>
    <createFolder
      :visible="visible"
      :creator="userInfo['userID']"
      @close="visible = false"
      @update="update"
      :current="current"
      v-if="visible"
    ></createFolder>
  </div>
</template>

<script>
import { app, files, upList, isAuth, total, s2n, n2s, resizePath, trash } from '@/lib/storage.js';
import { getCloudBaseAuth } from '@/api/user';
import createFolder from './component/createFolder.vue';
import uploadListDg from './component/uploadList.vue';
import cloneDeep from 'lodash/cloneDeep';
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
    uploadListDg
  },
  data() {
    return {
      currentPath: 'root',
      current: null,
      visible: false,
      ready: false,
      visibleUF: false, //上传列表窗口,
      upList,
      showMode: 'table',
      rowSelection,
      multiple: false,
      selectedArr: [],
      columns: [
        {
          dataIndex: 'index',
          title: '序号',
          width:65,
          align:'center',
          scopedSlots: {
            customRender: 'index'
          }
        },
        {
          dataIndex: 'ftype',
          title: '类型',
          width: 120,
          align: 'center',
          scopedSlots: { customRender: 'ftype' }
        },
        {
          dataIndex: 'filesize',
          title: '大小',
          width: 100,
          scopedSlots: { customRender: 'filesize' },
          sorter: (a, b) => {
            return a['filesize'] - b['filesize'];
          }
        },
        {
          dataIndex: 'fname',
          title: '文件名',
          width: 180,
          align: 'center',
          ellipsis: true
        },
        {
          dataIndex: 'creator',
          title: '创建者',
          align: 'center'
        },
        {
          dataIndex: 'cdate',
          title: '创建时间',
          align: 'center',
          sorter: (a, b) => {
            let tempA = a['cdate'].split('/');
            let tempB = b['cdate'].split('/');
            for (let i = 0; i < 3; i++) {
              if (tempA[i] > tempB[i]) {
                return true;
              }
            }
            return false;
          }
        },
        {
          key: 'action',
          title: '操作',
          align: 'center',
          width:260,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      total,
      used: 0
    };
  },
  filters: {
    format(text) {
      return n2s(text);
    }
  },
  mounted() {
    if (!isAuth.get()) {
      let { userID } = this.userInfo;
      getCloudBaseAuth(userID).then(({ data: ticket }) => {
        app.auth().customAuthProvider().signIn(ticket);
        isAuth.set(true);
      });
    }
    if (upList.length && upList.some(u => u['percent'] !== 100)) {
      this.visibleUF = true;
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.accountInfo;
    },
    hasFiles() {
      return (this.current && this.current.files.length) || false;
    },
    empty() {
      //单独通过文件长度来判断是否显示空内容会导致先空白再显示文件的闪烁，因为初始hasFile必定为false
      return !this.hasFiles && this.ready;
    },
    paths() {
      let { currentPath } = this;
      return currentPath.indexOf('/') !== -1 ? currentPath.split('/') : [currentPath];
      //return this.currentPath.match(/([^\/]+\/?)/g);
    },
    percent() {
      let num = this.used / (s2n(total) / 100);
      return Math.floor(num);
    },
    consumed() {
      return n2s(this.used);
    }
  },
  methods: {
    mutiSelect() {
      let { multiple, current } = this;
      this.multiple = !multiple;
      if (this.multiple) {
        this.selectedArr = current['files'].map(f => {
          return {
            flag: false
          };
        });
      }
    },
    changeView(e) {
      this.multiple = false;
      this.showMode = e.target.value;
    },
    resolveType(ftype) {
      let type;
      switch (true) {
        case /(png|jpe?g|svg)/i.test(ftype):
          type = 'album';
          break;
        case /(docx?|txt|md)/i.test(ftype):
          type = 'docx';
          break;
        case /(pptx?)/i.test(ftype):
          type = 'pptx';
          break;
        case /(rar|zip|7z|tar)/i.test(ftype):
          type = 'zip';
          break;
        case /(exe)/i.test(ftype):
          type = 'exe';
          break;
        case /folder/.test(ftype):
          type = 'folder';
          break;
        default:
          type = 'unknow';
          break;
      }
      return type;
    },
    goto(idx) {
      this.currentPath = this.paths.slice(0, ++idx).join('/');
    },
    handleFiles(ev) {
      const files = ev.target.files;
      if (!files) return;
      if (!this.visibleUF) {
        this.visibleUF = true;
      }
      const FileList = Array.prototype.slice.call(files);
      let { currentPath, userInfo, paths, current } = this;
      let copyedCurrent = cloneDeep(current);
      FileList.forEach(f => {
        this.up2space(f, { currentPath, userInfo, paths, copyedCurrent });
      });
    },
    up2space(file, self) {
      let { currentPath, userInfo, paths, copyedCurrent } = self;
      let cloudPath = [currentPath, file['name']].join('/');
      let obj = {
        filename: file['name'],
        percent: 0
      };
      upList.push(obj);
      app
        .uploadFile({
          cloudPath,
          filePath: file,
          onUploadProgress: function (progressEvent) {
            obj['percent'] = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        })
        .then(({ fileID }) => {
          //数据库操作
          this.uploadFile(file['name'], fileID, file['size'], { currentPath, userInfo, paths, copyedCurrent });
        });
    },
    uploadFile(fname, fileID, fileSize, self) {
      let { currentPath: startPath, userInfo, paths, copyedCurrent } = self;
      let reg = /\.([a-zA-Z]+)$/;
      let ftype = '';
      let arr = fname.match(reg);
      if (arr) {
        ftype = arr[1];
      }
      let now = new Date();
      let obj = {
        cdate: [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        creator: userInfo['userID'],
        ftype,
        fname,
        fileID,
        filesize: fileSize
      };
      copyedCurrent['files'].push(obj);
      files
        .where({ dirname: startPath })
        .update({ files: copyedCurrent['files'] })
        .then(() => {
          let { currentPath } = this;
          if (currentPath === startPath) {
            this.getFileList();
          }
          this.used += fileSize;
        });
      resizePath(paths, fileSize);
    },
    itemClick(event) {
      let e = event.srcElement || event.target;
      let idx = -1;
      switch (e.tagName.toLowerCase()) {
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
      if (this.multiple === true && idx !== -1) {
        this.selectedArr[idx]['flag'] = !this.selectedArr[idx]['flag'];
        return;
      }
      if (idx !== -1) {
        let item = this.current['files'][idx];
        if (item['ftype'] === 'folder') {
          this.currentPath = [this.currentPath, '/', item['fname']].join('');
        } else {
          //处理文件类型逻辑
          app.downloadFile({
            fileID: item['fileID']
          });
        }
      }
    },
    async update() {
      await this.getFileList();
      this.visible = false;
    },
    setCurrentPath(path) {
      this.currentPath = path;
    },
    getFileList(currentPath) {
      this.ready = false; //解决文件加载中加载闪烁问题
      this.multiple = false;
      currentPath = currentPath || this.currentPath;
      files
        .where({
          dirname: currentPath
        })
        .get()
        .then(({ data: fileList }) => {
          let current = fileList[0];
          if (current['dirname'] === 'root') {
            this.used = current['files'].reduce((a, b) => {
              return a + b['filesize'];
            }, 0);
          }
          this.selectedArr = current['files'].map(f => {
            return {
              flag: false
            };
          });
          this.current = current;
          this.ready = true;
        });
    },
    async deleteFile() {
      let { current, currentPath, paths } = this;
      let deleteArr = current['files'].filter((f, k) => {
        return this.selectedArr[k]['flag'];
      });
      if (deleteArr.length) {
        let dirs = deleteArr.filter(f => f['ftype'] === 'folder');
        let fileArr = deleteArr.filter(f => f['ftype'] !== 'folder').map(f => f['fileID']);
        let arr = current['files'].filter((f, k) => {
          return this.selectedArr[k]['flag'] === false;
        });
        await trash(currentPath, dirs, fileArr);
        let size = deleteArr.reduce((a, b) => {
          return a + b['filesize'];
        }, 0);
        await resizePath(paths, size, -1);
        //更新当前目录
        files
          .where({
            dirname: currentPath
          })
          .update({
            files: arr
          });
        this.used -= deleteArr.reduce((a, b) => {
          return a + b['filesize'];
        }, 0);
        if (currentPath === this.currentPath) {
          this.getFileList();
        }
      } else {
        this.$message.warning('请至少选择一个文件');
      }
    }
  },
  watch: {
    currentPath: {
      handler(nl, ol) {
        if (nl && nl !== ol) {
          this.getFileList();
        }
      },
      immediate: true
    },
    ready: {
      handler(nl, ol) {
        if (nl === false) {
          this.$nextTick(() => {
            this.$loading.show({
              getContainer: () => {
                return this.$refs.file;
              }
            });
          });
        } else {
          this.$loading.hide();
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.storage-container {
  height: 100%;
  padding: 4px 8px;
  border: 15px solid #f0f2f5;
  border-bottom-width: 22px;
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
        .over-box {
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
      .storage-progress {
      }
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
    .file-list {
      height: 100%;
      .file-item {
        float: left;
        width: 80px;
        height: 80px;
        text-align: center;
        cursor: pointer;
        margin: 6px;
        position: relative;
        .file-type {
          font-size: 56px !important;
        }
        .file-name {
          user-select: none;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &.multiple {
          background-color: #f1f1f1;
          &::before {
            position: absolute;
            top: 4px;
            left: 4px;
            display: block;
            width: 16px;
            height: 16px;
            content: '';
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
        }
        &.selected {
          background-color: #fafafa;
          &::before {
            position: absolute;
            top: 4px;
            left: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            content: '✓';
            border: 1px solid #fff;
            color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            background-color: $color-primary;
          }
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