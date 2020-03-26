<!--
 * @Descripttion: 下载app的h5界面
 * @version: 
 * @Author: ranli
 * @Date: 2020-03-19 10:10:18
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-24 11:09:04
 -->

<template>
  <div class="downLoadApp flexColumn">
    <!-- <p> isAndroid:{{browser.isAndroid()}}</p>
    <br>
    <p> isMobileQQ:{{browser.isMobileQQ()}}</p>
    <br>

    <p> isIOS:{{browser.isIOS()}}</p>
    <br>

    <p> isWx:{{browser.isWx()}}</p>
    <br>

    <p> isChrome:{{browser.isChrome()}}</p>
    <br>

    <van-button @click="downLoad"
      type="default">点击下载</van-button> -->
    <div class="backImg">
      <img :src="downLoadBg2"
        alt="downLoadBg2">
    </div>
    <div class="inside flexColumn">
      <div class="downLoadBtn">
        <div @click="downLoad('isAndroid')"
          class="Btn">
          <div class="pImg">
            <img :src="android"
              alt="android">
          </div>

          <span>安卓版下载</span>
        </div>
        <div @click="downLoad('isIOS')"
          class="Btn">
          <div class="pImg">
            <img :src="ios"
              alt="ios">
          </div>
          <span>iOS版下载</span>
        </div>
      </div>
    </div>
    <div class="backImg">
      <img :src="downLoadBg"
        alt="downLoadBg">
    </div>
    <div v-if="needGuide"
      class="guide">
      <ul class="guideList">
        <li>
          <span class="num">1</span>
          <span>点击右上角 ··· 按钮 </span>
        </li>
        <li>
          <span class="num">2</span>
          <span>
            <span>在</span>
            <span class="clientIcon">
              <img src="../../assets/img/downLoad/client.png"
                alt="">
            </span>
            <span>浏览器中打开</span>
          </span>
        </li>
        <li>
          <span class="num">3</span>
          <span>打开网页后点击按钮 </span>
        </li>
        <li class="down">
          <img src="../../assets/img/downLoad/down.png"
            alt="down">
        </li>
      </ul>
      <div class="up">
        <img src="../../assets/img/downLoad/up.png"
          alt="up">
      </div>

    </div>

  </div>
</template>

<script>
var browser = {
  isAndroid: function() {
    return navigator.userAgent.match(/Android/i) ? true : false
  },
  isMobileQQ: function() {
    var ua = navigator.userAgent
    return (
      /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua) ||
      /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua)
    )
  },
  isIOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false
  },
  isWx: function() {
    return navigator.userAgent.match(/micromessenger/i) ? true : false
  },
  isChrome: function() {
    return navigator.userAgent.match(/chrome/i) ? true : false
  }
}
import { Button } from 'vant'
import downLoadBg from '@images/downLoad/downLoadBg.png'
import downLoadBg2 from '@images/downLoad/downLoadBg@2x.png'
import android from '@images/downLoad/android.png'
import ios from '@images/downLoad/ios.png'
export default {
  name: 'downLoadApp',
  data() {
    return {
      browser,
      needGuide: false,
      downLoadBg,
      downLoadBg2,
      android,
      ios,
      appUrl: {
        isAndroid: 'http://file.pms.sc.cn/android_e.apk',
        isIOS:
          'https://apps.apple.com/cn/app/%E7%B2%BE%E5%87%86e%E7%94%9F/id1503309932'
      }
    }
  },
  components: {
    [Button.name]: Button
  },
  created() {
    this.jumpToapp()
  },
  methods: {
    jumpToapp() {
      var isAndroid = function() {
        return navigator.userAgent.match(/Android/i) ? true : false
      }
      var isIOS = function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false
      }
      if (isIOS()) {
        window.location.href = 'sxz://sxz.com' //伪协议scheme
      } else if (isAndroid()) {
        var ifr = document.createElement('iframe')
        ifr.src = 'sxz://sxz.com' //伪协议scheme
        ifr.style.display = 'none'
        document.body.appendChild(ifr)
      }
    },
    createIframe() {
      var iframe
      return function() {
        if (iframe) {
          return iframe
        } else {
          iframe = document.createElement('iframe')
          iframe.style.display = 'none'
          document.body.appendChild(iframe)
          return iframe
        }
      }
    },
    downLoad(k) {
      if (k === 'isIOS') {
        if (browser.isIOS()) {
          window.location.href = this.appUrl['isIOS']
        } else if (browser.isAndroid()) {
          this.$showMsg('与您当前的系统不匹配！')
        }
      } else {
        if (browser.isIOS()) {
          this.$showMsg('与您当前的系统不匹配！')
        } else if (browser.isAndroid()) {
          //安卓下载链接
          if (browser.isWx()) {
            this.needGuide = true
            // this.$showMsg('请在浏览器中打开')
            return false
          }
          window.location.href = this.appUrl['isAndroid']
        }
      }
    }
  }
}
</script>

<style  lang='less' scoped>
.flexColumn {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.downLoadApp {
  position: relative;
  min-height: 1000px;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(194, 244, 255, 1),
    rgba(248, 253, 255, 1)
  );
  .backImg {
    img {
      width: 100%;
    }
  }
  color: white;
  box-sizing: border-box;
  text-align: center;
  .inside {
    flex: 1;
    justify-content: center;
    .downLoadBtn {
      padding-top: 30px;
      .Btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: 100%;
        height: 83px;
        margin: 25px auto;
        width: 457px;
        border-radius: 42px;
        font-size: 25px;
        border: 1px solid rgba(120, 208, 192, 1);
        background: linear-gradient(
          45deg,
          rgba(120, 208, 193, 1) 0%,
          rgba(107, 214, 187, 1) 100%
        );
        box-shadow: 0px 4px 14px 0px rgba(120, 208, 193, 0.49);

        .pImg {
          width: 28px;
          margin-right: 19px;
          height: 28px;
          img {
            height: 100%0;
            width: 100%;
          }
        }
        span {
          padding-top: 7px;
        }
      }
    }
  }

  .guide {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    .guideList {
      position: relative;
      margin: 137px auto;
      width: max-content;
      font-size: 32px;
      text-align: left;
      li {
        margin-bottom: 38px;
        span {
          vertical-align: middle;
        }
        .clientIcon {
          width: 38px;
          height: 38px;
          display: inline-block;
          vertical-align: middle;
          margin: 0 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .num {
          width: 42px;
          height: 42px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          font-size: 42px;
          border-radius: 50%;
          background-color: white;
          color: rgba(0, 0, 0, 0.6);
          margin-right: 22px;
        }
      }
    }
    .up {
      position: absolute;
      right: 42px;
      top: 33px;
      width: 112px;
      height: 104px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .down {
      position: absolute;
      right: calc(0px - 60px);
      bottom: calc(0px -140px);
      width: 48px;
      height: 111px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
