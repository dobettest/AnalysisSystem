<template>
  <section class="home-container">
    <header-bar @openModal="openModal" />
    <main class="main" ref="main">
      <router-view />
    </main>
    <footer class="footer">
      <div class="relative-info">
        <div class="relative-link">
          <dl class="link-row">
            <dt class="link-item link-title">{{ $t('common.relative') }}--</dt>
            <dd class="link-item"><a href="https://www.iconfont.cn/">其他产品</a></dd>
            <dd class="link-item"><a href="https://www.iconfont.cn/">用户条例</a></dd>
            <dd class="link-item"><a href="https://www.iconfont.cn/">隐私政策</a></dd>
            <dd class="link-item"><a href="https://www.jb51.net/">更新日志</a></dd>
          </dl>
        </div>
      </div>
      <div class="beian">
        <a
          target="_blank"
          class="beian-link"
          href="http://www.beian.gov.cn/portal/registersystemIntro?recordcode=36010602000065"
        >
          <img src="../assets/login/beian.png" class="beian-img" />
          <p class="beian-info">赣公网安备 36010602000065号</p>
          <p class="beian-info">|</p>
          <p class="beian-info">赣ICP备19014139号</p>
        </a>
        <div class="copyright clearfix">
          <p class="copyright-item">Copyright © 2019 - {{ new Date().getFullYear() }} Dobettest.</p>
          <p class="copyright-item">All Rights Reserved. 郝美雅 版权所有</p>
        </div>
      </div>
      <div class="additional">
        <!-- <p>联系方式</p> -->
        <img src="../assets/login/wxqrcode.png" class="contact-img" />
        <!-- <p><a-icon type="phone"></a-icon><span style="fontStyle:italic">17770831435</span></p> -->
      </div>
    </footer>
    <mini-kefu />
    <login v-if="loginVisible" initKey="login" :visible="loginVisible" @close="loginVisible = false"></login>
    <register v-if="registerVisible" :visible="registerVisible" @close="registerVisible = false"></register>
  </section>
</template>

<script>
import login from './components/login';
import register from './components/register';
import headerBar from './components/header';
import miniKefu from './components/kefu';
export default {
  components: {
    login,
    headerBar,
    register,
    miniKefu
  },
  data() {
    return {
      registerVisible: false,
      loginVisible: false
    };
  },
  methods: {
    openModal(key) {
      switch (key) {
        case 'login':
          this.loginVisible = true;
          break;
        case 'register':
          this.registerVisible = true;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (min-width: 769px) and (max-width: 992px) {
  .main .reason-list .reason-item {
    .descrption-img {
      width: 90%;
    }
    .descrption {
      width: 320px;
      .sub-descrption {
        font-size: 14px;
      }
      .descrption-title {
        font-size: 24px;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .main .reason-list .reason-item {
    height: 600px;
    .grow {
      width: 100%;
    }
    p[class='grow'] {
      height: auto;
      .descrption-img {
        margin: 36px auto !important;
        width: 80%;
        height: 263px;
      }
    }
    div[class='grow'] {
      top: 330px;
      height: auto;
      .descrption {
        text-align: center;
        margin: 0 auto !important;
        width: 100%;
        .sub-descrption {
          font-size: 14px;
        }
        .descrption-title {
          font-size: 24px;
        }
        .descrption-tip {
          margin: 24px auto;
        }
      }
    }
  }
}
.reason-list {
  .reason-header {
    height: 234px;
    color: #333;
  }
  .reason-title {
    font-size: 32px;
    margin: 64px 0 16px 0;
  }
  .brief {
    width: 80%;
    max-width: 760px;
    margin: 0 auto;
    color: #585d65;
    font-size: 16px;
    line-height: 30px;
  }
  .reason-item {
    height: 440px;
    position: relative;
    &:nth-child(even) {
      background-color: #eff3fd;
      p[class='grow'] {
        right: 0;
        .descrption-img {
          margin: 88px 0 0 72px;
        }
      }
      div[class='grow'] {
        left: 0;
        .descrption {
          margin-top: 120px;
          margin-right: 72px;
          float: right;
        }
      }
    }
    &:nth-child(odd) {
      p[class='grow'] {
        left: 0;
        .descrption-img {
          margin: 59px 135px 0 auto;
        }
      }
      div[class='grow'] {
        right: 0;
        .descrption {
          margin-top: 120px;
          margin-left: 72px;
          float: left;
        }
      }
    }
  }
  .grow {
    position: absolute;
    height: 100%;
    width: 50%;
  }
  .grow .descrption-img {
    display: block;
    width: 470px;
    transition: 1s all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .grow .descrption {
    width: 440px;
    transition: 1s all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    .descrption-title {
      color: #1d1d1d;
      font-size: 30px;
    }
    .sub-descrption {
      margin-top: 32px;
      font-size: 16px;
      color: #6e6f74;
      line-height: 28px;
    }
  }
}
.descrption-tip {
  text-align: center;
  display: block;
  width: 128px;
  height: 42px;
  line-height: 42px;
  color: $color-primary;
  margin-top: 24px;
  font-size: 16px;
  letter-spacing: 0;
  box-shadow: 0 0 0 2px #5182e4;
  transition: 0.1s all 0s ease-in-out;
  &::before {
    background: $color-primary;
  }
  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0 2px transparent;
  }
  .descrption-detail {
    position: relative;
    font-size: 16px;
    font-weight: 700;
  }
}
.login-box {
  .forget-password {
    float: left;
    line-height: 40px;
    cursor: pointer;
  }
}
.home-container {
  position: relative;
  .main {
    // padding-top: 70px;
    .ant-carousel {
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
    // overflow: hidden;
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
    .additional {
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
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      padding: 10px;
      white-space: nowrap;
      overflow: hidden;
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
          display: inline-block;
        }
      }
    }
  }
}
</style>
