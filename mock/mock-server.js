const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')
const websocket = require("./controller/websocket")
const app = require('express')();
var multipart = require('connect-multiparty');
var uploadDir = path.resolve(__dirname, "./assets");
var multipartMiddleware = multipart({ uploadDir });
var cors = require('my-cors')
var oss = require('tencent-oss')
var fs = require('fs')
/**
 *
 * @param app
 * @returns {{mockStartIndex: number, mockRoutesLength: number}}
 */
const registerRoutes = (app) => {
  const { mocks } = require('./index.js')
  const mocksForServer = mocks.map((route) => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
  }
}

/**
 *
 * @param url
 * @param type
 * @param respond
 * @returns {{response(*=, *=): void, type: (*|string), url: RegExp}}
 */
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.status(200)
      if (JSON.stringify(req.body) !== '{}') {
        console.log(chalk.green(`> 请求地址：${req.path}`))
        console.log(chalk.green(`> 请求参数：${JSON.stringify(req.body)}\n`))
      } else {
        console.log(chalk.green(`> 请求地址：${req.path}\n`))
      }
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond)
      )
    },
  }
}
/**
 *
 * @param app
 */
const Server = (app) => {
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(multipartMiddleware)
  app.all("*", cors());
  app.get("/test", (req, res) => {
    res.send("test")
  })
  app.post("/api/v1/upload", new oss({
    cos1: {
      credential: {
        SecretId: 'AKIDd4FBsKHgeP1PcaEkxyjETSCgusd8NxJQ',
        SecretKey: '1nKhogIeldGdp69xXsypQ1Tm1YFk02qP'
      }
    }
  }), async function (req, res, next) {
    let file = req.files.file;
    const name = 'goods/' + path.basename(file.name);
    //console.log(req.tencentOSS.get("cos1"),req.tencentOSS,await req.tencentOSS.get("cos1"))
    //res.send("upload");
    //return ;
    const options = {
      Region: 'ap-guangzhou',
      Bucket: 'egg-1257758405'
    };
    let result;
    try {
      let data = fs.createReadStream(file.path)
      let client = await req.tencentOSS.get("cos1");
      result = await client.putObject({
        Bucket: options.Bucket, // 必须
        Region: options.Region,    // 必须
        Key: name,        // 必须
        StorageClass: 'STANDARD',
        Body: data, // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData))
        }
      })
    } finally {
      // remove tmp files and don't block the request's response
      // cleanupRequestFiles won't throw error even remove file io error happen
      let { Location } = result;
      res.send({
        code: 200,
        message: '上传成功',
        data: Location
      })
    }
  })
  websocket(app);
  registerRoutes(app);
}
/*const startServer = (app) => {
  app.listen(3100, function () {
    console.log("server running on 3100");
  })
};*/
module.exports = Server;