<template>
  <common-card mainTitle="公司介绍">
    <template slot="descrption">
      海致BDP由海致网络技术（北京）有限公司出品，核心团队成员来自百度、微软、IBM、EMC、硅谷等地的资深互联网与IT专家，目前已为数千家知名企业提供基于云端的可视化大数据分析服务,
      是中国企业大数据服务领跑者。海致BDP现已完成C轮3000万美元融资，以2.5亿美元估值成为中国估值最高的大数据创业公司。此次投资由君联资本领投、IDG资本、晨兴创投以及中国领先的金融数据服务企业万得咨询跟投。这也是海致继2014年接受高瓴资本、IDG资本、晨兴创投等多家国内外顶级风投注资后，再一次获得资本市场追捧。
    </template>
    <div
      slot="footer"
      class="text-center"
    >
      <span
        class="btn-animation btn-submit"
        @click="visible=true"
      >
        <p class="flex-box btn-tip">
          <a-icon
            type="mail"
            class="btn-icon"
          /><span> 投递简历 </span>
        </p>
      </span>
    </div>
  </common-card>
</template>

<script>
import commonCard from './commonCard.vue';
export default {
  name: 'companyCard',
  components: { commonCard }
};
</script>

<style lang="scss" scoped>
.descrption-tip {
  text-align: center;
  display: block;
  width: 128px;
  height: 42px;
  line-height: 42px;
  color: $color-primary;
  margin-top: 24px;
  font-size: 16px;
  letter-spacing: 0;
  box-shadow: 0 0 0 2px #5182e4;
  transition: 0.1s all 0s ease-in-out;
  &::before {
    background: $color-primary;
  }
  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0 2px transparent;
  }
  .descrption-detail {
    position: relative;
    font-size: 16px;
    font-weight: 700;
  }
}
.btn-submit {
  width: 120px;
  height: 45px;
  line-height: 45px;
  //   border: 2px solid $color-primary;
  box-shadow: 0 0 0 2px #5182e4;
  color: $color-primary;
  font-size: 16px;
  &::before {
    background-color: $color-primary;
  }
  &:hover {
    color: #fff;
    box-shadow: 0 0 0 2px #fff;
  }
  .btn-tip {
    position: relative;
    font-weight: 700;
    .btn-icon {
      font-size: 20px;
      padding: 4px;
    }
  }
}
</style>