import Vue from 'vue';
import "@/components/style.js";
import "@/directives/loading";
import { Badge, scrollBar, loading, BMap, svgIcon, Emojis} from '@/components';
[Badge, scrollBar, loading, BMap, svgIcon, Emojis].forEach(v => {
    Vue.use(v)
})