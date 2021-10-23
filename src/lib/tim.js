import TIM from 'tim-js-sdk/tim-js-friendship.js';
import TIMUploadPlugin from 'tim-upload-plugin';
import Vue from 'vue';
import TRTCCalling from 'trtc-calling-js';//音视频服务
export const trtcCalling = new TRTCCalling({
  SDKAppID: 1400586279
})
// 4 无日志级别
trtcCalling.setLogLevel(4);

// 初始化 SDK 实例

const tim = TIM.create({
  SDKAppID: 1400586279
});
Vue.prototype.TIM = TIM;

// 无日志级别
tim.setLogLevel(4);
// 注册 cos
tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
export default tim;
