<template>
  <section class="about-us-container">
    <company-card />
    <event-card />
    <customer-card />
    <modal
      :visible="visible"
      @close="visible=false"
    ></modal>
  </section>
</template>

<script>
import modal from './components/modal.vue';
import companyCard from './companyCard.vue';
import customerCard from './customerCard.vue';
import eventCard from './eventCard.vue';
export default {
  data() {
    return {
      visible: false
    };
  },
  components: { modal, customerCard, eventCard, companyCard }
};
</script>

<style lang="scss" scoped>
.about-us-container {
  padding-top: 70px;
}
</style>