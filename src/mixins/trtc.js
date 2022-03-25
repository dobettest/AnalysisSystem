import { mapState } from "vuex";
import trtc from '@/lib/trtc-calling.js';
import { debounce } from '@/utils/index.js';
import msg from "../assets/audio/9478.mp3";
export default {
    name: 'trtc-mx',
    data() {
        return {
            player: null
        }
    },
    computed: {
        ...mapState({
            needNotice: state => state.needNotice
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.player = new Audio(msg);
        })
    },
    created() {
        console.log('trtc', this.userSig)
    },
    methods: {
        async trtcLogin({ userID, userSig }) {
            await trtc.login({ userID, userSig })
        }
    },
}