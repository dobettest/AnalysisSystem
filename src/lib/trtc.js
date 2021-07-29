import TRTCCalling from 'trtc-calling-js'

let options = {
  SDKAppID:1400337794
}
const trtcCalling = new TRTCCalling(options)
// 4 无日志级别
trtcCalling.setLogLevel(4)

export default trtcCalling
