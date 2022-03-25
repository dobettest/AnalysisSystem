<template>
  <a-modal title="移动文件(夹)" @cancel="$emit('hide')" :visible="visible" okText="确定" cancelText="取消" :bodyStyle="{'padding':'4px'}">
    <a-tree :load-data="onLoadData" :tree-data="treeData" />
  </a-modal>
</template>

<script>
export default {
  name: 'move-file',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      treeData: [],
      dirname: ''
    };
  },
  mounted() {
    // this.getFileList();
    console.log('movefile');
  },
  methods: {
    async getFileList() {
      // let { dirname } = this;
      // let data = await this.$store.dispatch('cloudbase/access', {
      //   name: 'files',
      //   params: {
      //     dirname
      //   }
      // });
      // let arr = data[0]['files'].filter(v => {
      //   return v['ftype'] === 'folder';
      // });
      // this.treeData = arr.map(v => {
      //   return {
      //     title: v['fname'],
      //     key: v['fileID']
      //   };
      // });
      // console.log('data', this.treeData);
    },
    onLoadData(treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        setTimeout(() => {
          treeNode.dataRef.children = [
            { title: 'Child Node', key: `${treeNode.eventKey}-0` },
            { title: 'Child Node', key: `${treeNode.eventKey}-1` }
          ];
          this.treeData = [...this.treeData];
          resolve();
        }, 1000);
      });
    }
  }
};
</script>
