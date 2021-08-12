<template>
  <div :id="id" class="markdownEditor"></div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad';
import { tuiEditor } from '@/plugins/cdn.js';
const styles = [
  'https://uicdn.toast.com/tui-editor/latest/tui-editor.css',
  'https://uicdn.toast.com/tui-editor/latest/tui-editor-contents.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css'
];
export default {
  name: 'markdownEditor',
  props: {
    height: {
      type: [Number, String],
      default: '420'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''),
      editor: null
    };
  },
  async mounted() {
    await this.initScript()
      .then(() => {
        this.initEditor();
      })
      .catch(err => {
        console.log(err);
        this.$message.error('tuiEditor加载失败');
      });
  },
  destroyed() {
    this.destroyEditor();
  },
  methods: {
    async initScript() {
      if (!window.tui) {
        await remoteLoad(tuiEditor);
        const fragment = document.createDocumentFragment();
        styles.forEach(styl => {
          let el = document.createElement('link');
          el.href = styl;
          el.rel = 'stylesheet';
          fragment.appendChild(el);
        });
        document.getElementsByTagName('head').item(0).appendChild(fragment);
      }
    },
    initEditor() {
      this.editor = new window.tui.Editor({
        el: document.getElementById(this.id),
        minHeight: '200px',
        height: this.height + 'px',
        language: 'zh_CN',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: false,
        hideModeSwitch: true,
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'task',
          'indent',
          'outdent',
          'divider',
          'table',
          'image',
          'link',
          'divider',
          'code',
          'codeblock'
        ]
      });
      if (this.value) {
        this.editor.setValue(this.value);
      }
      this.editor.on('change', () => {
        this.$emit('input', this.editor.getValue());
      });
    },
    setValue(value) {
      this.editor.setValue(value);
    },
    getValue() {
      return this.editor.getValue();
    },
    destroyEditor() {
      if (!this.editor) return;
      this.editor.off('change');
      this.editor.remove();
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.markdownEditor {
  /deep/ {
    .te-md-container {
      background: #fff !important;
    }
    .te-preview {
      min-width: 400px !important;
    }
  }
}
</style>
