import { mapState } from "vuex";
import { auth } from "../lib/cloudbase";
export default {
    name: 'cloudbase-plugin',
    computed: {
        ...mapState({
            ready: state => state.cloudbase.ready,
            // userInfo: state => state.user.accountInfo
        })
    },
    watch: {
        ready: {
            handler: function (nl, ol) {
                console.log("userInfo cloudbase", this.userInfo, nl, ol, auth.hasLoginState())
                /*防止因为注销导致的重登录 */
                if (nl === false && this.userInfo) {
                    this.$store.dispatch('cloudbase/login', {
                        userID: this.userInfo['userID']
                    })
                }
            }
        }
    }
}