<template>
  <div class="clearfix">
    <a-upload
      action="http://localhost:3100/mock/user/uploadAvatar"
      list-type="picture-card"
      :showUploadList="false"
      class="avatar-upload-cover"
      :before-upload="beforeUpload"
      @change="handleChange"
      accept="image/*"
      :style="_style"
    >
      <!-- 默认上传 -->
      <template>
        <template v-if="avatarUrl">
          <div class="cl-upload__cover">
            <!-- 图片 -->
            <img v-lazy="avatarUrl" />
          </div>

          <!-- 功能按钮 -->
          <div class="cl-upload__actions">
            <span class="cl-upload__actions-preview" @click.stop="handlePreview(avatarUrl)">
              <a-icon type="zoom-in"></a-icon>
            </span>

            <span class="cl-upload__actions-delete" @click.stop="handleAvatar('')">
              <a-icon type="delete"></a-icon>
            </span>
          </div>
        </template>

        <!-- 空态 -->
        <template v-else>
          <a-icon type="plus"></a-icon>
        </template>
      </template>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: 'avatar-upload',
  data() {
    return {
      loading: false,
      previewVisible: false,
      previewImage: ''
    };
  },
  props: {
    avatarUrl: {
      type: [String],
      default: ''
    },
    size: {
      type: [Number, String],
      default: 96
    }
  },
  computed: {
    _style() {
      let arr = [];
      if (Array.isArray(this.size)) {
        arr = [...this.size];
      } else {
        arr = [this.size, this.size];
      }
      let [width, height] = arr.map(n => {
        return /^(\d+)$/g.test(n) ? n + 'px' : n;
      });
      return {
        width,
        height
      };
    }
  },
  methods: {
    handleAvatar(imageUrl) {
      this.$emit('change', imageUrl);
    },
    async handlePreview() {
      //var isImage=/\.(png|jpeg|jpg)$/;
      this.previewImage = this.avatarUrl;
      this.previewVisible = true;
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.loading = false;
          this.handleAvatar(imageUrl);
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-upload-cover {
  /deep/.ant-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;

    i {
      font-size: 28px;
      color: #8c939d;
    }

    .cl-upload__cover {
      position: relative;

      img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }

    .cl-upload__actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      -webkit-transition: opacity 0.3s;
      transition: opacity 0.3s;

      &::after {
        display: inline-block;
        content: '';
        height: 100%;
        vertical-align: middle;
      }

      span {
        display: none;
        cursor: pointer;
      }

      span + span {
        margin-left: 15px;
      }

      i {
        color: #fff;
        font-size: 20px;
      }
    }

    &:hover {
      border-color: $color-primary;

      .cl-upload__actions {
        opacity: 1;

        span {
          display: inline-block;
        }
      }
    }
  }
}
</style>
