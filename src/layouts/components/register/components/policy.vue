<template>
  <section class="policy-container">
    <div v-loading="loading">
      <iframe :src="src" frameborder="1" scrolling="auto" class="policy" id="fr"></iframe>
    </div>
    <footer class="step-bottom-group">
      <a-checkbox v-model="agree"
        >我已阅读并接受
        <a class="policy-item theme-text" href @click.prevent="setKey(0)"><span class="del-text">用户条例</span></a>
        <a class="policy-item theme-text" href @click.prevent="setKey(1)"
          ><span class="del-text">隐私政策</span></a
        ></a-checkbox
      >
      <a-button type="primary" :disabled="!agree" class="next-step-btn" @click="$emit('next')">下一步</a-button>
    </footer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      agree: false,
      key: 0,
      src: '',
      loading: false,
      loading1: true
    };
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById('fr').addEventListener('load', this.load);
    });
  },
  methods: {
    setKey(key) {
      this.key = key;
    },
    load() {
      this.loading = false;
    }
  },
  watch: {
    key: {
      handler(nl, ol) {
        if (nl === ol) {
          return;
        }
        this.loading = true;
        setTimeout(() => {
          switch (nl) {
            case 0:
              this.src =
                'http://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud201902141711_54837.html?spm=5176.19720258.J_9220772140.89.6fa62c4aNiGcxs';
              break;
            case 1:
              this.src =
                'https://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud201712130944_39600.html';
              break;
            default:
              this.src =
                'http://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud201902141711_54837.html?spm=5176.19720258.J_9220772140.89.6fa62c4aNiGcxs';
              break;
          }
        }, 300);
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.policy {
  width: 100%;
  height: 320px;
  overflow: auto;
}
.policy-item {
  padding: 0 2px;
}
.step-bottom-group {
  display: flex;
  align-items: center;
  height: 48px;
  border-top: 1px solid #e8e8e8;
  position: relative;
  .next-step-btn {
    position: absolute;
    right: 0px;
  }
}
</style>