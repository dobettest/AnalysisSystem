<template>
  <common-card mainTitle="重大事件">
    <p slot="descrption">
      <template>
        <a-timeline mode="alternate">
          <a-timeline-item>公司成立 2019-11-03</a-timeline-item>
          <a-timeline-item color="green">
            上线第一个公司产品 2020-03-01
          </a-timeline-item>
          <a-timeline-item>
           成交第一笔百万订单 2020-09-06
          </a-timeline-item>
          <a-timeline-item color="red">
            团队扩招到千人团队 2020-12-03
          </a-timeline-item>
          <a-timeline-item>……</a-timeline-item>
        </a-timeline>
      </template>

    </p>
  </common-card>
</template>

<script>
import commonCard from './commonCard.vue'
export default {
    name:'eventList',
    components:{commonCard}
};
</script>

<style>
</style>