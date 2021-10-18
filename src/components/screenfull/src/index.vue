<script>
export default {
  name: 'screen-full',
  render(h) {
    const el = <div ref="container" class="screenfull-container"></div>;
    return el;
  },
  data() {
    return {
      isExist: false
    };
  },
  methods: {
    toggle() {
      if (!this.isExist) {
        const fragment = document.createDocumentFragment();
        fragment.appendChild(this.$refs.container);
        document.body.appendChild(fragment);
        this.isExist = true;
      } else {
      }
    }
  }
};
</script>

<style>
.screenfull-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>