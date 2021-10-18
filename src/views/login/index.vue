<template>
  <div class="login-container" id="loginContainer">
    <header class="header">
      <div class="logo-wrapper">
        <svg-icon class="logo-img" icon="logo" :style="{ fontSize: 56 + 'px' }"></svg-icon>
        <div class="logo-title">微云台</div>
      </div>
      <div class="header-right">
        <a-button type="primary" @click="show = true"> 登录 </a-button>
      </div>
    </header>
    <main class="main">
      <a-carousel :autoplay="true">
        <div class="carousel-item">
          <img src="../../assets/login/carsoul/one.jpg" class="carousel-img" />
        </div>
        <div class="carousel-item">
          <img src="../../assets/login/carsoul/two.jpg" class="carousel-img" />
        </div>
      </a-carousel>
      <div class="part part-one">
        <h1 class="part-title">项目介绍</h1>
        <div class="project">
          <div class="row">
            <div class="row-item">
              <img src="../../assets/login/system.png" alt="产品图" class="img-wrapper" />
            </div>
            <div class="row-item">
              <dl class="Intro">
                <dt class="Intro-title">
                  <h1 class="main-title">系统概要</h1>
                  <h2 class="sub-title">a brief about system.</h2>
                </dt>
                <dd class="Intro-item">
                  <svg-icon icon="permission-manage"></svg-icon>
                  <span>权限管理</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="member-manage"></svg-icon>
                  <span>用户管理</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="storage"></svg-icon>
                  <span>存储空间</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="graph"></svg-icon>
                  <span>图表展示</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="Nginx"></svg-icon>
                  <span>高性能服务器</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="cdn"></svg-icon>
                  <span>CDN部署</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="https"></svg-icon>
                  <span>https加密</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="blog"></svg-icon>
                  <span>个人空间</span>
                </dd>
              </dl>
            </div>
          </div>
          <div class="row">
            <div class="row-item">
              <img src="../../assets/login/advantage.svg" alt="产品图" class="img-wrapper" />
            </div>
            <div class="row-item">
              <dl class="Intro">
                <dt class="Intro-title">
                  <h1 class="main-title">强大优势</h1>
                  <h2 class="sub-title">what's our advantages ?</h2>
                </dt>
                <dd class="Intro-item">
                  <svg-icon icon="permission-manage"></svg-icon>
                  <span>权限管理</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="member-manage"></svg-icon>
                  <span>用户管理</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="storage"></svg-icon>
                  <span>存储空间</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="graph"></svg-icon>
                  <span>图表展示</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="Nginx"></svg-icon>
                  <span>高性能服务器</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="cdn"></svg-icon>
                  <span>CDN部署</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="https"></svg-icon>
                  <span>https加密访问</span>
                </dd>
                <dd class="Intro-item">
                  <svg-icon icon="graph"></svg-icon>
                  <span>图表展示</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="part part-two">
        <h1 class="part-title">依托社区</h1>
        <div class="community">
          <div class="community-item">
            <img class="community-item-img" src="../../assets/logo/tencent.svg" />
            <p class="community-name">腾讯云</p>
          </div>
          <div class="community-item">
            <img class="community-item-img" src="../../assets/logo/webpack.svg" />
            <p class="community-name">webpack</p>
          </div>
          <div class="community-item">
            <img class="community-item-img" src="../../assets/logo/vue.svg" />
            <p class="community-name">vuejs</p>
          </div>
          <div class="community-item">
            <img class="community-item-img" src="../../assets/logo/nodejs.svg" />
            <p class="community-name">nodejs</p>
          </div>
          <div class="community-item">
            <img class="community-item-img" src="../../assets/logo/scss.svg" />
            <p class="community-name">scss</p>
          </div>
          <div class="community-item">
            <img class="community-item-img" src="../../assets/logo/linux.svg" />
            <p class="community-name">linux</p>
          </div>
        </div>
      </div>
      <login-form-modal :show="show" @hide="show = false"></login-form-modal>
    </main>
    <footer class="footer">
      <div class="relative-info">
        <div class="relative-link">
          <dl class="link-row">
            <dt class="link-item link-title">友情链接--</dt>
            <dd class="link-item"><a href="https://cloud.tencent.com/">腾讯云</a></dd>
            <dd class="link-item"><a href="https://www.iconfont.cn/">阿里图库</a></dd>
            <dd class="link-item"><a href="https://www.jb51.net/">脚本之家</a></dd>
            <dd class="link-item"><a href="">模板之家</a></dd>
          </dl>
        </div>
      </div>
      <div class="beian">
        <a
          target="_blank"
          class="beian-link"
          href="http://www.beian.gov.cn/portal/registersystemIntro?recordcode=36010602000065"
        >
          <img src="../../assets/login/beian.png" class="beian-img" />
          <p class="beian-info">赣公网安备 36010602000065号</p>
          <p class="beian-info">|</p>
          <p class="beian-info">赣ICP备19014139号</p>
        </a>
        <div class="copyright clearfix">
          <p class="copyright-item">Copyright © 2019 - {{ new Date().getFullYear() }} Dobettest.</p>
          <p class="copyright-item">All Rights Reserved. 都贝斯特 版权所有</p>
        </div>
      </div>
      <div class="contact">
        <!-- <p>联系方式</p> -->
        <img src="../../assets/login/wxqrcode.png" class="contact-img" />
        <!-- <p><a-icon type="phone"></a-icon><span style="fontStyle:italic">17770831435</span></p> -->
      </div>
    </footer>
  </div>
</template>

<script>
import loginFormModal from './components/loginFormModal.vue';
export default {
  components: {
    loginFormModal
  },
  data() {
    return {
      show: false
    };
  }
};
</script>
<style lang="scss">
.login-container {
  .header {
    background-color: #354060;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 70px;
    z-index: 999;
    .logo-wrapper {
      .logo-img,
      .logo-title {
        display: inline-block;
        vertical-align: middle;
        font-size: 32px;
      }
    }
    .header-right {
      height: 70px;
      line-height: 70px;
      float: right;
      margin-right: 32px;
    }
  }
  .main {
    .ant-carousel {
      margin-top: 70px;
      .slick-slide {
        height: 420px;
        .carousel-item {
          overflow: hidden;
          .carousel-img {
            height: 420px;
            width: 100%;
          }
        }
      }
    }
    .part {
      .part-title {
        font-size: 36px;
        text-align: center;
      }
      &.part-one {
        .project {
          .row {
            text-align: center;
            .row-item {
              display: inline-block;
              vertical-align: middle;
              .img-wrapper {
                padding: 10px;
                width: 480px;
                height: 480px;
              }
              .Intro {
                margin: 0;
                text-align: center;
                color: #000;
                width: 450px;
                .Intro-title {
                  margin-bottom: 20px;
                  .main-title {
                    font-size: 30px;
                    border-bottom: 0.5px solid rgba(0, 0, 0, 0.4);
                    margin: 0;
                  }
                }
                .Intro-item {
                  float: left;
                  display: flex;
                  width: 96px;
                  flex-direction: column;
                  align-items: center;
                  padding: 6px;
                  margin: 2px;
                  .svgClass {
                    font-size: 32px !important;
                  }
                }
              }
            }
          }
        }
      }
      &.part-two {
        margin-bottom: 25px;
        .community {
          width: 436px;
          margin: 0 auto;
          text-align: center;
          .community-item {
            padding: 6px;
            display: inline-block;
            .community-item-img {
              width: 60px;
              height: 60px;
            }
            .community-name {
              font-weight: 600;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .footer {
    position: relative;
    background-color: #354060;
    color: #fff;
    height: 132px;
    overflow: hidden;
    .relative-info {
      position: relative;
      height: 60px;
      .relative-link {
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        .link-row {
          margin: 0;
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.7);
          .link-item {
            padding: 0 6px;
            font-size: 12px;
            cursor: pointer;
            float: left;
            white-space: nowrap;
            &:hover {
              color: #fff;
            }
            a {
              &:link,
              &:visited,
              &:active {
                color: rgba(255, 255, 255, 0.7);
              }
            }
          }
          .link-title {
            padding: 0;
            font-weight: 600;
            font-size: 14px;
          }
        }
      }
    }
    .contact {
      text-align: center;
      margin-right: 20px;
      position: absolute;
      right: 10px;
      bottom: 25px;
      .contact-img {
        width: 80px;
      }
    }
    .beian {
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      padding: 10px;
      white-space: nowrap;
      .beian-link {
        display: block;
        color: #fff;
        .beian-img,
        .beian-info {
          display: inline-block;
          vertical-align: middle;
          padding: 2px;
        }
      }
      .copyright {
        padding: 2px;
        text-align: center;
        .copyright-item {
          float: left;
        }
      }
    }
  }
}
</style>
