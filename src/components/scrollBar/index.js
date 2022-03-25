import scrollBar from "./src/index.vue";
import './src/index.scss';
scrollBar.install = function (vue) {
    vue.component(scrollBar['name'], scrollBar)
}
export default scrollBar;