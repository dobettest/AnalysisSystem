<template>
  <section>
    <a-carousel :autoplay="true">
      <div class="carousel-item">
        <img src="../../assets/login/carsoul/3.jpg" class="carousel-img" />
      </div>
      <div class="carousel-item">
        <img src="../../assets/login/carsoul/two.jpg" class="carousel-img" />
      </div>
    </a-carousel>
    <dl class="reason-list">
      <dt class="reason-header">
        <h1 class="text-center reason-title">为什么选择我们的产品?</h1>
        <p class="brief">
          海致BDP为企业提供一站式的大数据分析平台，帮助企业高效率、低成本的建立数据应用体系，其灵活、易用、高性能和一站式的特性，让企业轻松实现数据驱动的精细化运营，全面激活业务增长，提升经营绩效！
        </p>
      </dt>
      <dd class="reason-item">
        <p class="grow">
          <img class="descrption-img" src="../../assets/image/home/0.png" alt="" />
        </p>
        <div class="grow">
          <div class="descrption">
            <h1 class="descrption-title">一站式数据管理和分析平台</h1>
            <p class="sub-descrption">
              从数据接入整合，到数据处理、分析、挖掘，再到多终端可视化，对数据进行全价值链管理。
            </p>
            <a class="descrption-tip btn-animation"><span class="descrption-detail">了解详情</span></a>
          </div>
        </div>
      </dd>
      <dd class="reason-item">
        <p class="grow"><img class="descrption-img" src="../../assets/image/home/4.png" alt="" /></p>
        <div class="grow">
          <div class="descrption">
            <h1 class="descrption-title">独立信道的内部通讯</h1>
            <p class="sub-descrption">
              无需任何预处理即可对数据做任意维度的多维分析，简单拖拽即可通过数据获得业务洞察，业务人员也能自助分析数据。
            </p>
            <a class="descrption-tip btn-animation"><span class="descrption-detail">了解详情</span></a>
          </div>
        </div>
      </dd>
      <dd class="reason-item">
        <p class="grow"><img class="descrption-img" src="../../assets/image/home/storage.svg" alt="" /></p>
        <div class="grow">
          <div class="descrption">
            <h1 class="descrption-title">稳定私密的文件系统</h1>
            <p class="sub-descrption">
              无需任何预处理即可对数据做任意维度的多维分析，简单拖拽即可通过数据获得业务洞察，业务人员也能自助分析数据。
            </p>
            <a class="descrption-tip btn-animation"><span class="descrption-detail">了解详情</span></a>
          </div>
        </div>
      </dd>
      <dd class="reason-item">
        <p class="grow"><img class="descrption-img" src="../../assets/image/home/4.png" alt="" /></p>
        <div class="grow">
          <div class="descrption">
            <h1 class="descrption-title">快速交付的业务定制</h1>
            <p class="sub-descrption">
              无需任何预处理即可对数据做任意维度的多维分析，简单拖拽即可通过数据获得业务洞察，业务人员也能自助分析数据。
            </p>
            <a class="descrption-tip btn-animation"><span class="descrption-detail">了解详情</span></a>
          </div>
        </div>
      </dd>
      <dd class="reason-item">
        <p class="grow"><img class="descrption-img" src="../../assets/image/home/4.png" alt="" /></p>
        <div class="grow">
          <div class="descrption">
            <h1 class="descrption-title">完善的服务体系</h1>
            <p class="sub-descrption">
              BDP提供完善的售前支持和售后服务体系，7X24小时专属客服响应，保证您稳定、流畅的使用BDP。
            </p>
            <a class="descrption-tip btn-animation"><span class="descrption-detail">了解详情</span></a>
          </div>
        </div>
      </dd>
    </dl>
  </section>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      key: 'login'
    };
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
  }
}
::v-deep .ant-carousel {
  .slick-slide {
    .carousel-item {
      height: 520px;
      overflow: hidden;
      .carousel-img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
