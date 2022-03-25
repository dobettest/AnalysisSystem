<template>
  <a-dropdown class="navUser-wrppaer">
    <div class="flex-box">
      <a-badge :status="status" :offset="[-4, 12]">
        <img v-lazy="accountInfo['avatar']" class="userImg" alt="" />
      </a-badge>
      <span class="userTitle">{{ accountInfo['userName'] }}</span>
      <a-icon type="caret-down" style="margin-left: 5px" />
    </div>

    <a-menu slot="overlay">
      <a-menu-item>
        <router-link to="/userInfo">个人中心</router-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click.self="logout">
        <span>退出登录 </span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'navUser',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      accountInfo: state => state.user.accountInfo,
      status: state => state.tim.status
    })
  },
  created() {
    this.$store.dispatch('role/getServices');
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout');
      await this.$store.dispatch('tagsView/clearTag');
      this.$router.replace({
        path: '/home'
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.userImg {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  display: inline-block;
}
.userTitle {
  margin-left: 8px;
  font-weight: 700;
  font-size: 1rem;
  display: inline-block;
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
