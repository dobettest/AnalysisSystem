import BMap from './src/index.vue'
import Vue from 'vue';
const BMapModal = Vue.extend({
    data: function () {
        return {
            visible: false
        }
    },
    render(h) {
        return h('a-modal', {
            props: {
                title: '地图组件',
                width: 600,
                visible: this.visible,
                footer: null,
                bodyStyle: {
                    padding: '6px'
                }
            },
            on: {
                cancel: this.hide
            },
        }, [
            h('BMap', {
                props: {
                    params: {
                        ak: 'Wc62kF8LBWTNT3xOEgGOqE2diqqtPQNy',
                        type: 'webgl',
                        v: '1.0'
                    }
                }
            })
        ])
    },
    methods: {
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false;
        }
    }
})
BMapModal.install = function (vue) {
    vue.component(BMap['name'], BMap)
    vue.prototype.$BMap = new BMapModal({
        el: document.createElement('div')
    })
}
export default BMapModal;