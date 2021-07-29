const bodyParser = require('body-parser')
const path = require('path')
const express = require('express');
const app = express();
var multipart = require('connect-multiparty');
var uploadDir = path.resolve(__dirname, "./assets");
var multipartMiddleware = multipart({ uploadDir });
var cors = require('my-cors')
var oss = require('tencent-oss')
var sms = require('tencent-sms')
var userRouter = require("./routes/user")
var roleRouter = require("./routes/role")
var lotteryRouter = require("./routes/lottery")
var dashboardRouter = require("./routes/dashboard")
const initMiddleware = (app) => {
  app.all("*", cors());
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(multipartMiddleware);
  app.use(new sms({
    s1: {
      credential: {
        secretId: 'AKIDd4FBsKHgeP1PcaEkxyjETSCgusd8NxJQ',
        secretKey: '1nKhogIeldGdp69xXsypQ1Tm1YFk02qP'
      },
      region: "ap-guangzhou",
      profile: {
        httpProfile: {
          endpoint: "sms.tencentcloudapi.com",
        }
      }
    }
  }))
  app.use(new oss({
    cos1: {
      credential: {
        SecretId: 'AKIDd4FBsKHgeP1PcaEkxyjETSCgusd8NxJQ',
        SecretKey: '1nKhogIeldGdp69xXsypQ1Tm1YFk02qP'
      }
    }
  }))
}
const initRoutes = (app) => {
  app.use("/mock/user", userRouter)
  app.use("/mock/role", roleRouter)
  app.use("/mock/lottery", lotteryRouter)
  app.use("/mock/dashboard", dashboardRouter);
}
const startServer = (app) => {
  try {
    initMiddleware(app);
    initRoutes(app);
    app.listen(3100);
  } catch (error) {
    console.log(error)
  }
}
startServer(app);
module.exports = startServer