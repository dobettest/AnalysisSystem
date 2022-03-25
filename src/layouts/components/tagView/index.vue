<template>
  <div class="tagView-wrapper">
    <a-icon type="left" class="tag_btn" style="left: 0" @click="handleScroll(240)" v-show="hanldeBtn" />
    <div class="scroll-outer" ref="scrollOuter">
      <div class="scroll-body" ref="scrollBody">
        <router-link
          class="tag-item flex-box"
          :to="item.path"
          v-for="(item, index) in tagList"
          :key="item.path"
          :class="isActive(item.path) ? 'activeTag' : ''"
          ref="tagWrapper"
        >
          <span class="tag-title">{{ $t('route.' + item.meta.title) }}</span>
          <my-svg-icon
            icon="close"
            v-if="index != 0"
            class="verticalMiddle tag-icon"
            :size="14"
            @click.prevent.stop.native="closeTag(item.path)"
          />
        </router-link>
      </div>
    </div>

    <a-icon type="right" class="tag_btn" style="right: 0" @click="handleScroll(-240)" v-show="hanldeBtn" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'tagView',
  data() {
    return {
      tagBodyLeft: 0,
      hanldeBtn: false
    };
  },
  computed: {
    ...mapState({
      tagList: state => state.tagsView.tagList
    }),
    outerWidth() {
      if (this.hanldeBtn) {
        return {
          left: '30px',
          right: '34px'
        };
      }
      return {
        left: '15px',
        right: '15px'
      };
    }
  },
  mounted() {},

  methods: {
    isActive(path) {
      return path == this.$route.path;
    },
    addTag() {
      const { path, meta } = this.$route;
      this.$store.dispatch('tagsView/addTag', { path, meta });
    },
    closeTag(path) {
      this.$store.dispatch('tagsView/removeTag', path).then(data => {
        if (this.isActive(path)) {
          this.$router.push({
            path: data[data.length - 1].path
          });
        }
      });
    },
    handleScroll(val) {
      const scrollOuterWidth = this.$refs.scrollOuter.offsetWidth;
      const scrollBodyWidth = this.$refs.scrollBody.offsetWidth;
      if (val > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + val);
      } else {
        this.tagBodyLeft = Math.max(this.tagBodyLeft + val, scrollOuterWidth - scrollBodyWidth);
      }
    },
    changeTagWidth() {
      const scrollOuterWidth = this.$refs.scrollOuter.offsetWidth;
      const scrollBodyWidth = this.$refs.scrollBody.offsetWidth;
      if (scrollBodyWidth >= scrollOuterWidth - 50) {
        this.hanldeBtn = true;
      } else {
        this.hanldeBtn = false;
      }
    },
    moveToTag() {
      this.$nextTick(() => {
        const index = this.tagList.findIndex(item => item.path == this.$route.path);
        const eleWidth = this.$refs.tagWrapper[index].$el.offsetWidth;
        const eleLeft = this.$refs.tagWrapper[index].$el.offsetLeft;
        const scrollOuterWidth = this.$refs.scrollOuter.offsetWidth;

        //标签在左边
        if (eleLeft == 0 && index == 0) {
          return; //首页
        }
        if (eleLeft < -this.tagBodyLeft) {
          this.tagBodyLeft = -eleLeft + 4;
        } else if (eleLeft > -this.tagBodyLeft && eleLeft + eleWidth < -this.tagBodyLeft + scrollOuterWidth) {
          this.tagBodyLeft = Math.min(0, scrollOuterWidth - eleWidth - eleLeft - 4);
        } else {
          this.tagBodyLeft = -(eleLeft - (scrollOuterWidth - 4 - eleWidth));
        }
      });
    }
  },
  watch: {
    $route: {
      handler(nl) {
        this.addTag();
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
$height: 46px;

.tagView-wrapper {
  height: $height;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 25px;
  position: relative;
  background-color: #fff;
  .tag_btn {
    width: 26px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
    position: absolute;
    cursor: pointer;
  }
  .scroll-outer {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 1;
    .scroll-body {
      transition: left 0.3s ease;
      z-index: 1;
      display: flex;
      align-items: center;
      height: 100%;
      width: calc(100% - 8px);
      line-height: $height;
      position: absolute;
      .tag-item {
        height: 32px;
        text-align: center;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 0 8px;
        margin-right: 10px;
        cursor: pointer;
        user-select: none;
        float: left;

        .tag-title {
          height: 32px;
          line-height: 32px;
          color: #666;
        }
        .tag-icon {
          &:hover {
            color: #fff;
            background: #495060;
            border-radius: 50%;
          }
        }
      }
      .activeTag {
        background: #1890ff;
        color: #fff;
        .tag-title {
          margin-right: 0 !important;
          color: #fff;
        }
        .tag-icon {
          margin-left: 6px;
        }
        &:before {
          content: '';
          background: #fff;
          height: 8px;
          width: 8px;
          display: inline-block;
          border-radius: 50%;
          margin-right: 4px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
