import { html2canvasCDN } from '@/plugins/cdn';
import remoteLoad from '@/utils/remoteLoad';
export default {
    data() {
        myChart: null
    },
    methods: {
        async screenshot(name) {
            const html2canvas = await remoteLoad(html2canvasCDN);
            html2canvas(this.myChart).then((res) => {
                var dataUrl = res.toDataURL('image/jpeg', 1.0);
                var a = document.createElement('a');
                a.href = dataUrl;
                a.download = `${name}.png`;
                a.click();
            })
        }
    }
}
