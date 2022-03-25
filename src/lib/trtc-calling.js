import TRTCCalling from 'trtc-calling-js'
const trtcCalling = new TRTCCalling({
  SDKAppID: 1400586279
})

// 4 无日志级别
trtcCalling.setLogLevel(0)

export default trtcCalling
