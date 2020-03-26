<!--
 * @Descripttion: getMask
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-26 19:16:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-04 14:32:58
 -->
<template>
  <div class="getMask">
    <div class="m-header">
      <van-nav-bar fixed
        :title="$route.meta.title"></van-nav-bar>
    </div>
    <div class="active-detail">
      <div class="top">
        <img src="../../../assets/img/active/huodomg1.png"
          alt="">
      </div>
      <div class='other'>
        <div class="info">
          <div>
            <h3>- 活动说明 -</h3>
            <p>
              受疫情影响，今年中国人民过了一个史无前例的不便之年。新型冠状病毒的肆虐对人们正常的生产和生活带来诸多不便。比如出行困难、开 工延迟等等。居民在家担惊受怕，国家投入大量人力物力财力，全国人民众志成城共同抗击疫情。

            </p>
            <br>
            <p>
              作为医疗企业，四川精准医疗科技有限责任公司为回馈社会和一直以来关心、支持本公司的顾客和朋友，特推出新型冠状病毒预防、检测产品赠送和优惠活动，为抗击疫情贡献一份力
            </p>
            <h4>
              活动规则 ：
            </h4>
            <ul>
              <li>
                1、凡在四川精准医疗科技有限责任公司已储存免疫细胞的顾客（不分储存年限）均可在我司赠送口罩平台或扫描领取口罩二维码申请领取赠送口罩5只。
              </li>
              <br />
              <li>
                2、赠送口罩平台网址
                <a href="http://kz.pms.sc.cn/#/getMask">http://kz.pms.sc.cn/#/getMask</a> 领取口罩二维码，在我司微信公众号（公众号：MyHealth我的健康）查询。
              </li>
              <br />
              <li>
                3、在本页面下方按要求填写姓名、身份证号等信息，后台审核通过后可到店自取或邮寄至指定地址(快递到付)
              </li>
              <br />
              <li>
                结束时间：即日起至政府宣布疫情结束之日截止，或口罩赠送完毕为止。
              </li>
              <br />
              <li>
                自取地址：成都市天府新区湖畔路北段366号天府新经济产业园A区4栋
              </li>
            </ul>

            <p class="info-bottom">
              *本活动最终解释权归四川精准医疗科技有限责任公司所有
            </p>
          </div>
        </div>
        <div class="info">
          <div>
            <h3>- 填写收货信息 -</h3>
            <van-form @submit="onSubmit"
              @failed='failed'
              validate-trigger='onChange'
              class="activeForm">

              <div v-for="(item,index) in baseInfoFromConfig"
                :key="index">
                <div v-if="item.type==='input'">
                  <van-field v-model="baseInfoFrom[index]"
                    :name="index"
                    v-bind="[...item]"
                    :label="baseInfoFromConfig[index].label"
                    :placeholder="baseInfoFromConfig[index].placeholder"
                    :rules="baseInfoFromConfig[index].rules" />
                </div>

                <div v-if="item.type==='tel'">
                  <van-field v-model="baseInfoFrom[index]"
                    :name="index"
                    v-bind="[...item]"
                    :label="baseInfoFromConfig[index].label"
                    :placeholder="baseInfoFromConfig[index].placeholder"
                    :rules="baseInfoFromConfig[index].rules" />
                </div>

                <div v-if="item.type==='select'">
                  <van-field :name="index"
                    v-bind="[...item]"
                    :value="baseInfoFrom[index]"
                    :label="baseInfoFromConfig[index].label"
                    :placeholder="baseInfoFromConfig[index].placeholder"
                    :rules="baseInfoFromConfig[index].rules"
                    @click="isShowArea()" />
                  <van-popup v-model="showArea"
                    position="bottom">
                    <van-area :area-list="areaList"
                      @confirm="onConfirm"
                      @cancel="showArea = false" />
                  </van-popup>
                </div>
              </div>

              <div style="margin:20px 0;text-align:center;">
                <van-button class='Button'
                  round
                  native-type="submit">
                  提交
                </van-button>
              </div>
            </van-form>
          </div>

        </div>

      </div>
      <p>&copy;四川精准医疗科技有限责任公司</p>

    </div>

  </div>
</template>

<script>
import { Area, Field, Form, Button, NavBar, Toast, Popup, Dialog } from 'vant'
import { validate } from '@/utils/validate'
import { areaList } from '@/utils/selectData.js'
export default {
  name: 'getMask',
  components: {
    [Area.name]: Area,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      showArea: false,
      areaList,
      baseInfoFrom: {
        true_name: '',
        id_card: '',
        mobile: '',
        area: '',
        address: ''
      },
      baseInfoFromConfig: {
        true_name: {
          label: '客户姓名',
          type: 'input',
          placeholder: '请填写真实姓名',
          rules: [
            { message: '姓名不能为空', required: true }
            // { validator: validate.verifyChinsesName, message: '姓名格式错误' }
          ]
        },
        id_card: {
          label: '身份证号',
          type: 'input',
          maxLength: '18',
          placeholder: '用于检测报告身份识别',
          rules: [
            { message: '身份证号不能为空', required: true },
            { validator: validate.verifyIdcard, message: '身份证号错误' }
          ]
        },
        mobile: {
          label: '手机号码',
          type: 'tel',
          placeholder: '方便快递联系您',
          maxLength: '11',
          rules: [
            { message: '手机号码不能为空', required: true },
            { validator: validate.verifyPhone, message: '手机号码格式错误' }
          ]
        },
        area: {
          label: '所在地区',
          type: 'select',
          placeholder: '请点击选择',
          readonly: true,
          rules: [{ message: '请选择所在地区', required: true }]
        },
        address: {
          label: '联系地址',
          type: 'input',
          placeholder: '详细到街道单元门牌号',
          rules: [{ message: '联系地址不能为空', required: true }]
        }
      }
    }
  },
  methods: {
    isShowArea(e) {
      this.showArea = true
    },
    //验证失败事件
    failed(value) {
      Toast(value.errors[0].message)
    },
    // 提交表单
    onSubmit(values) {
      Toast.loading({
        message: '正在识别身份信息...',
        forbidClick: true,
        duration: 0, // 持续展示 toast,
        className: 'modifyTaost',
        overlay: true,
        icon: require('../../../assets/img/active/jiance.png')
      })
      this.$api['receive_mask'](this.baseInfoFrom)
        .then(res => {
          Toast.clear()
          Dialog.alert({
            title: '领取成功！',
            message: '请您耐心等待快递小哥送货上门吧！',
            confirmButtonText: '好的',
            confirmButtonColor: '#23bca2',
            width: '256px',
            className: 'tipDialog'
          }).then(() => {
            this.baseInfoFrom = {}
          })
        })
        .catch(err => {
          Toast.clear()
          Dialog.alert({
            message: err,
            confirmButtonText: '好的',
            confirmButtonColor: '#23bca2',
            width: '256px',
            className: 'tipDialog1'
          }).then(() => {})
        })
    },
    //地区
    onConfirm(values) {
      this.baseInfoFrom.area = [...new Set(values.map(item => item.name))].join(
        '/'
      )
      this.showArea = false
    }
  },
  created() {}
}
</script>

<style lang="less">
.getMask {
  background: #e2f6ef;
  .van-nav-bar__title {
    font-size: 34px;
  }
  .active-detail {
    margin-top: 94px;
    padding: 70px 0;
    .top {
      img {
        width: 100%;
      }
    }
    .other {
      padding: 0 20px;
      .info {
        background: #43afb3;
        padding: 15px;
        border-radius: 14px;
        margin-top: 30px;
        & > div {
          border: 2px solid rgba(6, 109, 114, 1);
          border-radius: 14px;
          padding: 35px 30px 0;
          color: #fff;
          font-size: 28px;
          li {
            a {
              color: #fff;
            }
          }
          h3,
          h4 {
            color: #fdd642;
            font-size: 34px;
            text-align: center;
            margin-bottom: 30px;
          }
          h4 {
            text-align: left;
            font-size: 28px;
            margin-top: 30px;
            margin-bottom: 20px;
          }
          p {
            text-indent: 2em;
          }

          .info-bottom {
            font-size: 22px;
            text-align: center;
            margin: 30px 0;
            color: #318b8d;
            text-indent: 0;
          }
          .activeForm {
            input {
              color: #fff;
              &::placeholder {
                color: #8dd7de !important;
                line-height: 40px;
              }
              &:focus {
                box-shadow: none !important;
              }
            }

            .van-field__error-message {
              display: none;
            }
            & > div {
              &:last-child {
                .van-cell :last-child {
                  border: 0;
                }
              }
            }
            .van-cell {
              font-size: 26px;
              align-items: baseline;
              padding: 30px;
              background: #43afb3;
              border-bottom: 1px solid #5bc1c7;
              color: #fff;
              font-size: 26px;

              &:not(:last-child):after {
                border: 0;
              }
            }
            .Button {
              width: 90%;
              height: 88px;
              line-height: 88px;
              background: #d7f8f4;
              box-shadow: inset 5px 5px 45px #78d1c1;
              border: 0;
              .van-button__text {
                font-size: 30px;
                color: #45c2ac;
              }
            }
          }
        }
      }
    }
    & > p {
      color: #999;
      text-align: center;
      padding: 50px 0 0;
      font-size: 24px;
    }
  }
}
// 弹窗
.tipDialog,
.tipDialog1 {
  .van-dialog__header {
    font-size: 32px;
    padding: 50px 0 20px;
    color: #333;
    .van-dialog__message {
      color: #999;
      font-size: 26px;
      line-height: 80px;
    }
  }
  .van-dialog__footer {
    padding: 16px 0;
    .van-button__text {
      font-size: 28px;
    }
  }
}
.tipDialog1 {
  .van-dialog__message {
    color: #666;
    font-size: 26px;
    line-height: 38px;
    padding: 40px 60px;
    &::before {
      content: '';
      display: block;
      width: 116px;
      height: 92px;
      margin: 0 auto 20px;
      background: url('../../../assets/img/active/shibai.png') no-repeat;
      background-size: 100%;
    }
  }
}
.modifyTaost {
  width: 512px;
  border-radius: 20px;
  background: #fff;
  padding: 60px 0;
  .van-toast__icon {
    font-size: 88px;
  }
  .van-toast__text {
    color: #666;
    font-size: 26px;
    margin-top: 30px;
  }
}
</style>


