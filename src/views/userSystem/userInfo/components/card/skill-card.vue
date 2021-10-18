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
          <input type="range" v-model="item['value']" max="100" class="skill-progress-bar" />
          <a-icon type="delete" class="skill-dele-btn" @click="deleteSkill(idx)"></a-icon>
        </div>
        <div class="skill-item" v-if="adding">
          <a-input class="skill-name" ref="skillName" v-model="newSkill['name']" allow-clear @change="check"></a-input>
          <input type="range" v-model="newSkill['value']" max="100" class="skill-progress-bar" />
          <a-icon type="delete" class="skill-dele-btn" @click="adding = false"></a-icon>
        </div>
        <div class="add-skill" @click="addSkill">
          <a-icon type="plus"></a-icon>
        </div>
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
      required: true
    },
    skills: {
      type: [Array, String],
      required: true
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