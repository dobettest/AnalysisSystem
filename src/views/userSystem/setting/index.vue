<template>
  <div class="setting-container">
    <account-base />
    <security-setting />
  </div>
</template>

<script>
import accountBase from './components/accountBase';
import securitySetting from './components/securitySetting';
export default {
  name: 'setting',
  components: { accountBase, securitySetting },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.setting-container {
  /deep/ .ant-form-item-label {
    font-weight: 600;
  }
  .card-container {
    background-color: #fff;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
    .card-head {
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0 26px;
      border-bottom: 1px solid #e8e8e8;
      background-color: rgba(0, 0, 0, 0.01);
      .card-extra {
        float: right;
        .svgClass {
          cursor: pointer;
        }
      }
      .card-title {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        flex: 1;
      }
    }
    .card-body {
      width: 100%;
      height: calc(100% - 56px);
      padding: 24px;
    }
    .mask {
      &::before {
        display: block;
        content: ' ';
        z-index: 1;
        position: absolute;
        left: 0;
        top: 56px;
        width: 100%;
        height: calc(100% - 56px);
        background-color: rgba(0, 0, 0, 0.01);
      }
    }
  }
}
</style>
