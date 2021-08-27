<template>
  <a-modal
    :title="currentRow ? '编辑' : '新建'"
    :visible="visible"
    :confirm-loading="loading"
    okText="确认"
    cancelText="取消"
    @ok="handleOk"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
  >
    <a-form-model :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" ref="groupForm" hideRequiredMark>
      <a-form-model-item prop="name" label="群名称" hasFeedback>
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item prop="type" label="群类型" hasFeedback>
        <a-select :options="types" :value="form.type" @change="selectType"></a-select>
      </a-form-model-item>
      <a-form-model-item prop="avatar" label="群头像" hasFeedback>
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card">
          <a-icon type="plus" />
        </a-upload>
      </a-form-model-item>
      <a-form-model-item prop="groupInfo" label="群介绍" hasFeedback>
        <a-textarea placeholder="请输入" row="4" :value="form.introduction"></a-textarea>
      </a-form-model-item>
      <a-form-model-item prop="groupNotice" label="群公告" hasFeedback>
        <a-textarea placeholder="请输入" row="4" :value="form.notification"></a-textarea>
      </a-form-model-item>
      <a-form-model-item prop="groupNotice" label="加群方式" hasFeedback>
        <a-radio-group :options="radios" :value="form.joinOption"></a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
//import tim from '@/lib/tim';
export default {
  props: {
    currentRow: [Object, null],
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      form: {
        type: 'Private',
        joinOption: 'FreeAccess'
      },
      types: [
        {
          key: 'Private',
          title: '工作群'
        },
        {
          key: 'Public',
          title: '公开群'
        },
        {
          key: 'ChatRoom',
          title: '会议群'
        },
        {
          key: 'AVChatRoom',
          title: '直播群'
        }
      ],
      radios: [
        {
          label: '自由加群',
          value: 'FreeAccess'
        },
        {
          label: '需要验证',
          value: 'NeedPermission'
        },
        {
          label: '禁止加群',
          value: 'DisableApply'
        }
      ]
    };
  },
  mounted() {
    this.form = this.currentRow ? { ...this.currentRow } : { type: 'Private', joinOption: 'FreeAccess' };
  },
  methods: {
    getOptions() {
      // let options = {
      //   ...this.form
      // };
      // if (
      //   [this.TIM.TYPES.GRP_WORK, this.TIM.TYPES.GRP_AVCHATROOM, this.TIM.TYPES.GRP_MEETING].includes(this.form.type)
      // ) {
      //   delete options.joinOption;
      // }
      // return options;
    },
    async handleOk() {
      // const res = await tim.createGroup(this.getOptions());
      // console.log('res', res);
    },
    selectType(type) {
      console.log('type', type);
      this.form.groupType = type;
    }
  }
};
</script>

<style></style>
