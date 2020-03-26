<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-19 14:47:16
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-04 16:09:40
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    // this.$api['GetNowTime']().then(res => {
    //   console.log(res);
    // })
    // this.test()
  },
  methods: {
    test() {
      let appid = 'wx643de80a40b71a3f'
      let redirect_uri = 'https://www.baidu.com/'
      window.location =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        appid +
        '&redirect_uri=' +
        redirect_uri +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect' //引导用户授权
    }
  }
}
</script>

<style lang="less">
// @media screen and (max-width: 780px) {
@import './assets/css/reset.css';
@import '~@/assets/css/theme.less';
@import '~@/assets/css/vant.less';
// }
</style>



