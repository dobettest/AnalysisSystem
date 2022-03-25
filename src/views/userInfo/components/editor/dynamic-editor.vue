<template>
  <a-card class="editor scroll-bar" :bordered="null">
    <div slot="title" class="top">
      <div class="cancel" @click="$emit('change', 'normal')">
        <a-icon type="left" style="float: left"></a-icon><span>取消</span>
      </div>
      <h3 class="title">发说说</h3>
      <a-button type="primary" :disabled="disabled" class="publish" @click="publish">发表</a-button>
    </div>
    <a-textarea v-model="content" :rows="12" placeholder="分享新鲜事..." class="none-border scroll-bar"> </a-textarea>
    <footer>
      <ul class="upload-img-list clearfix">
        <li class="upload-img-item" v-for="(item, idx) in albumList" :key="idx">
          <img v-lazy="item['download_url']" alt="" />
          <div class="img-btn flex-box">
            <a-icon type="zoom-in" style="font-size: 20px; padding: 6px"></a-icon>
            <a-icon
              type="delete"
              style="font-size: 20px; padding: 6px"
              @click.native="albumList.splice(idx, 1)"
            ></a-icon>
          </div>
        </li>
        <li class="upload-img-item upload-btn flex-box" v-if="albumList.length < 12">
          <label>
            <div style="text-align: center; cursor: pointer">
              <a-icon type="camera" style="font-size: 32px; padding: 6px"></a-icon>
              <p style="font-size: 13px">图片/视频</p>
              <input
                type="file"
                style="display: none"
                accept="image/jpeg,image/png,video/mp4"
                multiple
                @change="uploadFile"
              />
            </div>
          </label>
        </li>
      </ul>
      <p class="tag-list">
        <a-tooltip>
          <template slot="title">点中标签使用,不超过6个</template>
          <span style="padding-right: 8px" class="text-underline label-key">
            热门标签
            <a-icon type="tag" style="font-size: 18px"></a-icon>
          </span>
        </a-tooltip>
        <a-tag :key="idx" :color="color(idx)" :closable="true" v-for="(item, idx) in tags" @close="removeTag(idx)">
          {{ item }}
        </a-tag>
        <template v-if="tags.length <= 6">
          <a-input
            v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag v-else style="background: #fff; borderstyle: dashed" @click="showInput">
            <a-icon type="plus" /> 自定义
          </a-tag>
        </template>
      </p>
      <div class="secret clearfix">
        <p style="float: left" @click="getPosition">
          <span style="padding-right: 8px" class="text-underline label-key">
            添加地点
            <a-icon type="environment" style="font-size: 18px" />
          </span>
          <span>{{ position }}</span>
        </p>
        <p style="float: left; margin-left: 8px">
          <span class="text-underline label-key"> 访问权限 </span>
          <span>{{ permission }}</span>
        </p>
      </div>
    </footer>
  </a-card>
</template>

<script>
import { createBlog } from '@/api/vblog';
import axios from 'axios';
const colors = ['pink', 'red', 'orange', 'cyan', 'blue', 'purple', '#2db7f5', '#f50', '#87d068'];
export default {
  data() {
    return {
      content: '',
      albumList: [],
      tags: ['旅游', '时光', '校园', '青春', '愉悦', '晴天'],
      position: '未知',
      permission: '公开',
      inputVisible: false,
      inputValue: ''
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.accountInfo;
    },
    disabled() {
      return this.content === '' && this.albumList.length === 0;
    }
  },
  methods: {
    publish() {
      var form = new FormData();
      // let now = new Date().valueOf();
      // this.$store
      //   .dispatch('cloudbase/create', {
      //     name: 'vblog',
      //     params: {
      //       data: this.content,
      //       albumList: this.albumList,
      //       likelist: [],
      //       tags: this.tags,
      //       pdate: now,
      //       author: this.userInfo['userID'],
      //       position: this.position,
      //       permission: this.permission,
      //       commentlist: []
      //     }
      //   })
      //   .then(() => {
      //     this.$message.success('发表成功');
      //     this.$emit('change', 'normal');
      //   });
    },
    removeTag(idx) {
      this.tags.splice(idx, 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      });
    },
    color(idx) {
      //   let index = idx || Math.round((Math.random() * 100) % 10);
      return colors[idx % 9];
    },
    checkType(file) {
      // return /image\/(png|jpe?g)/.test(file['type']);
      return true;
    },
    checkSize(file) {
      // return file['size'] < 20 * Math.pow(1024, 3);
      return true;
    },
    uploadFile(e) {
      let files = e.target.files;
      files.forEach(file => {
        if (this.checkType(file)) {
          if (this.checkSize(file)) {
            var form = new FormData();
            form.append('file', file);
            createBlog(form);
          } else {
            this.$message.error(`${file['name']}超出12MB`);
          }
        } else {
          this.$message.error(`${file['name']}不是图片或视频文件`);
        }
      });
    },
    getPosition() {
      try {
        console.log('getPosition start');
        var options = {
          enableHighAccuracy: true,
          timeout: 200000
        };

        function success(pos) {
          var crd = pos.coords;

          console.log('Your current position is:');
          console.log('Latitude : ' + crd.latitude);
          console.log('Longitude: ' + crd.longitude);
          console.log('More or less ' + crd.accuracy + ' meters.');
        }

        function error(err) {
          console.error('ERROR(' + err.code + '): ' + err.message);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
      } catch (error) {
        console.log('error', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.editor {
  height: 100%;
  position: relative;
  overflow: auto;
  .top {
    display: flex;
    align-items: center;
    .title {
      text-align: center;
      flex-grow: 1;
    }
    .cancel {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  .upload-img-list {
    .upload-img-item {
      float: left;
      padding: 4px;
      cursor: pointer;
      width: 115px;
      height: 115px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .img-btn {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        color: hsla(0, 0%, 100%, 0.9);
        background-color: rgba(#121212, 0.5);
      }
      &:hover {
        .img-btn {
          display: flex;
        }
      }
    }
    .upload-btn {
      color: #888;
      background-color: #f4f4f4;
    }
  }
  .tag-list {
    padding: 6px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    color: #555;
  }
  .secret {
    padding: 6px;
    height: 28px;
    line-height: 28px;
  }
}
</style>