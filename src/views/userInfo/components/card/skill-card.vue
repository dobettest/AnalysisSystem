<template>
  <a-card class="skill-card-container" title="我的技能">
    <div slot="extra" v-if="canEdit">
      <a-icon
        :type="editMode ? 'save' : 'edit'"
        :style="{ fontSize: 24 + 'px', cursor: 'pointer' }"
        @click.native="changeMode"
      ></a-icon>
    </div>
    <div class="skill-body">
      <div class="skill-edit-container" v-show="editMode">
        <div class="skill-item" v-for="(item, idx) in copyedSkills" :key="idx">
          <span class="skill-name">{{ item.name }}</span>
          <span>{{ item['value'] }}</span>
          <input type="range" v-model="item['value']" max="100" class="skill-progress-bar" />
          <a-icon type="close" class="skill-dele-btn" @click="deleteSkill(idx)"></a-icon>
        </div>
        <div class="skill-item" v-if="adding">
          <a-input class="skill-name" ref="skillName" v-model="newSkill['name']" allow-clear @change="check"></a-input>
          <input type="range" v-model="newSkill['value']" max="100" class="skill-progress-bar" />
          <a-icon type="close" class="skill-dele-btn" @click="adding = false"></a-icon>
        </div>
        <a-button class="add-skill" @click="addSkill" icon="plus" block> 新增技能 </a-button>
      </div>
      <div class="skill-echart" ref="skillCard" v-show="!editMode"></div>
    </div>
  </a-card>
</template>

<script>
import echarts from 'echarts';
import { debounce } from '@/utils/index.js';
export default {
  name: 'skill-card',
  data() {
    return {
      editMode: false,
      defaultSkills: [
        {
          name: '技能一',
          value: '60'
        },
        {
          name: '技能二',
          value: '70'
        },
        {
          name: '技能三',
          value: '80'
        },
        {
          name: '技能四',
          value: '90'
        },
        {
          name: '技能五',
          value: '100'
        }
      ],
      adding: false,
      newSkill: {
        name: '',
        value: 50
      }
    };
  },
  computed: {
    copyedSkills() {
      return this.skills ? [...this.skills] : this.defaultSkills;
    }
  },
  props: {
    canEdit: {
      type: Boolean,
      default: true
    },
    skills: {
      type: Array
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    changeMode() {
      this.editMode = !this.editMode;
      this.adding = false;
      if (!this.editMode) {
        this.initEchart();
      }
    },
    genData() {
      let indicator = [];
      let value = [];
      this.copyedSkills.forEach(s => {
        indicator.push({
          text: s['name'],
          max: 100
        });
        value.push(s['value']);
      });
      return {
        indicator,
        value
      };
    },
    initEchart() {
      let echart = echarts.init(this.$refs.skillCard);
      const { indicator, value } = this.genData();
      echart.setOption(
        {
          tooltip: {
            trigger: 'axis'
          },
          radar: [
            {
              indicator,
              radius: 80
            }
          ],
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: 'item'
              },
              areaStyle: {
                color: '#1890ff'
              },
              lineStyle: {
                color: 'blue'
              },
              itemStyle: {
                color: '自适应'
              },
              data: [
                {
                  value,
                  name: '技能'
                }
              ]
            }
          ]
        },
        true
      );
    },
    addSkill() {
      this.adding = true;
      this.$nextTick(() => {
        let { newSkill } = this;
        if (!newSkill['name']) {
          this.$refs.skillName.focus();
        }
      });
    },
    deleteSkill(idx) {
      this.copyedSkills.splice(idx, 1);
    },
    check: debounce(function () {
      let { newSkill } = this;
      if (newSkill['name']) {
        this.copyedSkills.push(newSkill);
        this.newSkill = {
          name: '',
          value: 50
        };
        this.adding = false;
      }
    }, 1000)
  }
};
</script>
<style lang="scss" scoped>
.skill-card-container {
  background-color: #fff;
  width: 348px;
  margin-top: 10px;
  .skill-echart,
  .skill-edit-container {
    height: 300px;
    width: 300px;
  }
  .skill-edit-container {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #ccc;
      }
    }
    .skill-item {
      height: 32px;
      display: flex;
      align-items: center;
      .skill-name {
        width: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .skill-progress-bar {
        flex: 1;
        flex-grow: 1;
        cursor: pointer;
        outline: none;
        margin: 0 4px;
      }
      .skill-dele-btn {
        font-size: 18px;
        color: red;
        cursor: pointer;
      }
    }
    .add-skill {
      margin-top: 10px;
      border: 1px solid #c1b1c1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      cursor: pointer;
    }
  }
}
</style>