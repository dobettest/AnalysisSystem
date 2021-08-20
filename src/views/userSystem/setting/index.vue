<template>
  <div class="setting-container">
    <a-card :hoverable="true" :bordered="false">
      <a-card :title="$t('common.baseInfo')" :bordered="false">
        <account-base />
      </a-card>
      <a-card :title="$t('common.secureSetting')" :bordered="false">
        <security-setting />
      </a-card>
    </a-card>
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
<style lang="scss" scoped>
.setting-container {
  /deep/ .ant-form-item-label {
    font-weight: 600;
  }
}
</style>
