import { debounce } from '@/utils/index.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      myChart: null,
      resizeHandler: null
    };
  },
  computed: {
    ...mapState({
      open: state => state.setting.open,
      layout: state => state.setting.layout
    })
  },
  mounted() {
    this.resizeHandler = debounce(() => {
      if (this.myChart) {
        this.myChart.resize();
      }
    }, 100);
    this.initResizeEvent();
  },

  methods: {
    //监听resize
    initResizeEvent() {
      window.addEventListener('resize', this.resizeHandler, {
        passive: true
      });
    },
    //移除resize
    destroyResizeEvent() {
      window.removeEventListener('resize', this.resizeHandler);
    }
  },

  beforeDestroy() {
    this.destroyResizeEvent();
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart.off('click');
    this.myChart = null;
  },

  activated() {
    this.initResizeEvent();
    if (this.myChart) {
      this.myChart.resize();
    }
  },

  deactivated() {
    this.destroyResizeEvent();
  },
  watch: {
    open() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
    layout() {
      if (this.myChart) {
        this.myChart.resize();
      }
    }
  }
};
