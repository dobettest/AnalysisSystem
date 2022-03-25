// 注册一个全局自定义指令 `v-loading`
import Vue from 'vue';
import "./style/index.scss";
import loadingComponent from '@/components/loading/index.vue';
const loadingConstructor = Vue.extend(loadingComponent);
const config = {
    text: '正在加载中...',
    textColor: '#000',
    background: 'rgba(0,0,0,0)',
    spin: 'rect',
    showText: false,
    show: false
};
const map = new Map();
let uid = 0;
Vue.directive('loading', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el, binding, vnode) {
        const instance = new loadingConstructor({
            el: document.createElement('div')
        });
        if (_.isObject(binding['value'])) {
            for (var prop in config) {
                if (_.has(binding['value'], prop)) {
                    instance[prop] = binding['value'][prop]
                }
            }
        } else {
            instance.show = binding['value']
        }
        el.appendChild(instance.$el);
        el.setAttribute("uid", uid);
        map.set("" + uid++, instance);
        el.classList.add('v-loading-container');
    },
    update(el, binding) {
        let uid = el.getAttribute("uid");
        if (_.isObject(binding['value'])) {
            if (!binding['value']['show']) {
                map.get(uid).show = false;
            }
        } else {
            if (!binding['value']) {
                map.get(uid).show = false;
                map.delete(uid);
            }
        }
    },
    unbind(el) {
        el.classList.remove('v-loading-container');
    }
})