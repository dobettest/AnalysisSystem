<template>
  <a-table
    :columns="columns"
    :data-source="source"
    :pagination="{
      pageSize: 5
    }"
    bordered
    class="file-list"
  >
    <div slot="index" slot-scope="text, record, index">
      {{ index + 1 }}
    </div>
    <div class="ftype" slot="ftype" slot-scope="ftype, record" @click="$emit('itemClick', record)">
      <my-svg-icon :icon="ftype" :style="{ fontSize: 32 + 'px', cursor: 'pointer' }"></my-svg-icon>
    </div>
    <div slot="filesize" slot-scope="filesize">
      <span>{{ filesize | format }}</span>
    </div>
    <div slot="fname" slot-scope="fname, item">
      <a-input v-if="item['editable']" v-model="item['fname']"> </a-input>
      <template v-else>
        {{ fname }}
      </template>
    </div>
    <div slot="action" slot-scope="text, record">
      <a-button type="primary" size="small" style="margin: 0 4px" @click="$emit('move', record)">移动</a-button>
      <a-button type="danger" size="small" style="margin: 0 4px" @click="$emit('del', record)"> 删除 </a-button>
      <a-button type="primary" size="small" style="margin: 0 4px" @click="rename(record)"> 重命名 </a-button>
    </div>
  </a-table>
</template>

<script>
// import { n2s } from '@/lib/cloudbase.js';
export default {
  name: 'file-table',
  data() {
    return {
      columns: [
        {
          dataIndex: 'index',
          title: '序号',
          width: 65,
          align: 'center',
          scopedSlots: {
            customRender: 'index'
          }
        },
        {
          dataIndex: 'ftype',
          title: '类型',
          width: 120,
          align: 'center',
          scopedSlots: { customRender: 'ftype' }
        },
        {
          dataIndex: 'filesize',
          title: '大小',
          width: 100,
          scopedSlots: { customRender: 'filesize' },
          sorter: (a, b) => {
            return a['filesize'] - b['filesize'];
          }
        },
        {
          dataIndex: 'fname',
          title: '文件名',
          width: 180,
          align: 'center',
          ellipsis: true,
          scopedSlots: {
            customRender: 'fname'
          }
        },
        {
          dataIndex: 'creator',
          title: '创建者',
          align: 'center'
        },
        {
          dataIndex: 'cdate',
          title: '创建时间',
          align: 'center',
          sorter: (a, b) => {
            let tempA = a['cdate'].split('/');
            let tempB = b['cdate'].split('/');
            for (let i = 0; i < 3; i++) {
              if (tempA[i] > tempB[i]) {
                return true;
              }
            }
            return false;
          }
        },
        {
          key: 'action',
          title: '操作',
          align: 'center',
          width: 260,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ]
    };
  },
  props: {
    source: {
      type: Array,
      required: true
    }
  },
  methods: {
    rename(record) {
      this.$set(record, 'editable', true);
    }
  },
  filters: {
    format(text) {
      // return n2s(text);
    }
  }
};
</script>

<style>
</style>