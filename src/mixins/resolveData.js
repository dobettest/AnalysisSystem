import options_map from '@/type';
export default {
  data() {
    return {
      data: [],
      config: ''
    };
  },
  computed: {
    options() {
      let { type } = this.config;
      return options_map[type];
    }
  },
  mounted() {
    //console.log('resolveData mounted');
    console.log('2');
  },
  methods: {
    filter: function() {
      let { data } = this;
      let { cash } = this.config;
      let arr = cash.split('&');
      data = data.filter(v => {
        return arr.every(v1 => {
          let [key, value] = v1.split(':');
          return v[key] === value;
        });
      });
      this.data = data;
    },
    group: function() {
      if (this.config['range']) {
        return '';
      }
      let { data } = this;
      let { key } = this.config;
      var map = {};
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var value = map[obj[key]];
        if (value !== undefined) {
          var temp = Array.isArray(value) ? [...value, obj] : [value, obj];
          map[obj[key]] = temp;
        } else {
          map[obj[key]] = obj;
        }
      }
      this.data = map;
    },
    rangeBy: function() {
      let { data } = this;
      let { type } = this.config;
      let source = [];
      let { range, key } = this.config;
      if (!range) {
        Object.keys(data).forEach(v => {
          if (type == 'wordcloud') {
            source.push([{ name: v, value: data[v].length }]);
          } else source.push([v, data[v].length]);
        });
      }
      if (type == 'wordcloud') {
        //this.options['series'][0]['data'] = source;
      } else this.options['dataset']['source'] = source;
      //console.log('this.options', this.options);
    }
  },
  watch: {
    async config(oldVal, newVal) {
      await this.filter();
      await this.group();
      await this.rangeBy();
    }
  }
};
