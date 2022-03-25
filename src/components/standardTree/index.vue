<template>
  <a-tree checkable :tree-data="treeData" @check="handleSelect" :checkedKeys="checkKeyList" />
</template>

<script>
import { mapGetters } from 'vuex';
// import { asyncRoutes } from '@/router';
import { getRole } from '@/api/role';
export default {
  name: 'standardTree',
  props: {
    role: {
      type: String,
      default: 'admin'
    }
  },
  data() {
    return {
      treeData: [],
      checkKeyList: [],
      // asyncRoutes
    };
  },
  computed: {
    ...mapGetters(['asyncRoute'])
  },
  created() {
    // const data = this.asyncRoutes[0].children;
    // this.treeData = this.generateRoutes(data);
    // this.getRoles();
  },
  methods: {
    async getRoles() {
      if (this.role) {
        const { data: checkKeyList } = await getRole({ role: this.role });
        this.checkKeyList = checkKeyList;
      }
    },
    generateRoutes(routes) {
      const res = [];
      routes.forEach(item => {
        const temp = {
          key: item.path,
          title: item.meta.title
        };
        if (item.children) {
          temp.children = this.generateRoutes(item.children);
        }
        res.push(temp);
      });
      return res;
    },

    handleSelect(selectedKeys) {
      this.checkKeyList = selectedKeys;
      this.$emit('change', selectedKeys);
    }
  }
};
</script>
<style lang="scss" scoped></style>
