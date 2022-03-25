<template>
  <common-card mainTitle="客户案例">
    <ul slot="descrption" class="customer-list">
      <li
        class="customer-item"
        v-for="item in customerList"
        :key="item['id']"
      >
        <img
          :src="item['logo']"
          alt=""
        >
      </li>
    </ul>
  </common-card>
</template>

<script>
import commonCard from './commonCard.vue';
export default {
  name: 'customerCard',
  data() {
    return {
      customerList: [
        {
          id: '1',
          name: '新东方',
          logo: 'https://main.qcloudimg.com/raw/2833767c4f8c015714020185c6d02b5e.png'
        },
        {
          id: '2',
          name: '同城旅游',
          logo: 'https://main.qcloudimg.com/raw/1582931a4de2929d6f5d6eb7362070a0.png'
        },
        {
          id: '3',
          name: '荔枝',
          logo: 'https://main.qcloudimg.com/raw/c73926adc408a0c72e7fdede808ace9b.png'
        },
        {
          id: '4',
          name: '全民K歌',
          logo: 'https://main.qcloudimg.com/trisys/assets/product/images/dQ00OcTb-v1h7WWf6n_DJ.jpg'
        },
        {
          id: '5',
          name: '人民网',
          logo: 'https://main.qcloudimg.com/raw/9ad6bbf39dbe9d29b376bc17d8ac9c82.png'
        },
        {
          id: '6',
          name: '绝地求生',
          logo: 'https://main.qcloudimg.com/raw/820db8ee8476add3083b49eeed19c972.png'
        },
        {
          id: '7',
          name: '新东方',
          logo: 'https://main.qcloudimg.com/raw/2833767c4f8c015714020185c6d02b5e.png'
        },
        {
          id: '8',
          name: '同城旅游',
          logo: 'https://main.qcloudimg.com/raw/1582931a4de2929d6f5d6eb7362070a0.png'
        }
      ]
    };
  },
  components: {
    commonCard
  }
};
</script>

<style lang="scss" scoped>
.customer-list{
    text-align: center;
    .customer-item{
        display: inline-block;
        width: 200px;
        height: 100px;
        box-shadow: 0 0 0 2px #f8f8f8;
        margin: 0 4px 8px 4px;
        padding: 8px;
        >img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>