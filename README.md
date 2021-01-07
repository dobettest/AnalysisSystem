# AnalysisSystem
# 技术方案
一、调用方式
1）api调用：https://www.dobettest.cn:8000/node-api/analysic?site=xxx&username=xxx
2) sdk调用:引入->analysic(site,username);不暴露密码安全设计待解决
*站长访问:https://www.dobettest.cn:8000/node-api/analysic/index.html(需登录校验,默认展示本主网站的流量统计信息)
二、数据库设计
1)、选型:redis||mongodb 待定

2)、表字段设计
1、sites:
site string
username string 
logintime Array =>访问量=长度
2、users:
site string
username string
password string
3)、数据库语句
1、统计当前网站:
select * from where site=xxx;
2、站长登录
select * from users where site=`site` and user=`user` and password=`password`;(主网站站长的账号不等同数据库管理账号)

三、注意事项
1)、git后期操作规范
开发代码开发完先提交到本地,当天有修改则合并提交;
提交标示规范:"+新增 -删除 m修改 fix修补bug号";
2)、网站的并发访问设计
3)、数据库的备份容灾设计
4)、基础性能优化参考某团某宝网:设备判别，访问协议,懒加载,长列表优化等等
5)、数据操作的异步回调

