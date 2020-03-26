<!--
 * @Descripttion: getMask
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-26 19:16:28
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-20 10:09:22
 -->
<template>
  <div class="surveyForm">
    <div class="m-header">
      <van-nav-bar fixed
        :title="$route.meta.title"></van-nav-bar>
    </div>
    <div class="active-detail">
      <div class="companyInfo">
        <div class="logo">
          <img :src="logo"
            alt="logo">
        </div>
      </div>
      <div class='other'>
        <div class="info">
          <div>
            <h3>- 登记信息 -</h3>
            <van-form scroll-to-error
              @submit="onSubmit"
              @failed='failed'
              validate-trigger='onChange'
              class="activeForm">

              <div v-for="(item,index) in baseInfoFromConfig"
                :key="index">
                <div v-if="item.type==='input'||item.type==='digit'||item.type==='tel'">
                  <van-field v-model="baseInfoFrom[index]"
                    :name="index"
                    v-bind="[...item]"
                    :label="baseInfoFromConfig[index].label"
                    :placeholder="baseInfoFromConfig[index].placeholder"
                    :rules="baseInfoFromConfig[index].rules" />
                </div>
                <div v-if="item.type==='sex'">
                  <van-field :name="index"
                    readonly
                    clickable
                    v-bind="[...item]"
                    :value="baseInfoFrom[index]"
                    :label="baseInfoFromConfig[index].label"
                    :placeholder="baseInfoFromConfig[index].placeholder"
                    :rules="baseInfoFromConfig[index].rules"
                    @click="isShowSex()" />
                  <van-popup v-model="showSex"
                    position="bottom">
                    <van-picker show-toolbar
                      :columns="['男','女']"
                      @cancel="showSex = false"
                      @confirm="onConfirmSex"
                      :default-index="2" />
                  </van-popup>
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
                <div v-if="item.type==='selectTime'">
                  <van-field :name="index"
                    v-bind="[...item]"
                    :value="baseInfoFrom[index]"
                    :label="baseInfoFromConfig[index].label"
                    :placeholder="baseInfoFromConfig[index].placeholder"
                    :rules="baseInfoFromConfig[index].rules"
                    @click="isShowRegisterTime()" />
                  <van-popup v-model="register_date"
                    position="bottom">
                    <van-datetime-picker @cancel="register_date = false"
                      @confirm="onConfirmRegisterTime"
                      v-model="getTime"
                      type="date"
                      :min-date="minDate"
                      :max-date="maxDate" />
                  </van-popup>
                </div>
              </div>
              <div class="otherInfo">
                <div class="questions">
                  <p class="label">1:过去14天到现在，您是否有以下症状?</p>
                  <div class="chooseData">
                    <van-checkbox @change="checkednoHaseSymptom"
                      checked-color="#fdd642"
                      name="无"
                      v-model="noHaseSymptom"
                      key='无'>无</van-checkbox>
                    <van-checkbox-group ref="checkboxGroup"
                      checked-color="#fdd642"
                      @change="checkedSymptom"
                      v-model="baseInfoFrom.symptom">
                      <van-checkbox v-for="item in symptomData"
                        :name="item"
                        :key='item'>{{item}}</van-checkbox>
                    </van-checkbox-group>
                  </div>
                  <div v-if="baseInfoFrom.symptom.indexOf('其他')>=0">
                    <van-field :rules="otherRlues['other_symptom']"
                      v-model="baseInfoFrom.other_symptom"
                      label="其他症状：" />
                  </div>
                </div>
                <div class="questions">
                  <p class="label">2:是否是湖北返蓉人员?</p>
                  <div class="chooseData">
                    <van-radio-group checked-color="#fdd642"
                      v-model="baseInfoFrom.back">
                      <van-radio name="是">是</van-radio>
                      <van-radio name="否">否</van-radio>
                    </van-radio-group>
                  </div>

                </div>
                <div class="questions">
                  <p class="label">3:过去14天内是否接触有过新型冠状病毒感染的肺炎病例?</p>
                  <div class="chooseData">
                    <van-radio-group checked-color="#fdd642"
                      v-model="baseInfoFrom.contact">
                      <van-radio name="是">是</van-radio>
                      <van-radio name="否">否</van-radio>
                    </van-radio-group>
                  </div>
                </div>
                <div class="questions">
                  <p class="label">4:是否在十四天内离开过成都（大成都范围）?</p>
                  <div class="chooseData">
                    <van-radio-group checked-color="#fdd642"
                      v-model="baseInfoFrom.leave">
                      <van-radio name="是">是</van-radio>
                      <van-radio name="否">否</van-radio>
                    </van-radio-group>
                  </div>
                  <div v-if="baseInfoFrom.leave=='是'">
                    <div>
                      <van-field clickable
                        :rules="otherRlues['leave_place']"
                        v-model="baseInfoFrom.leave_place"
                        label="离开地点：" />
                    </div>
                    <div>
                      <van-field readonly
                        clickable
                        :rules="otherRlues['back_time']"
                        @click="showBackTime=true"
                        :value="baseInfoFrom.back_time"
                        label="返回时间：" />
                      <van-popup v-model="showBackTime"
                        position="bottom">
                        <van-datetime-picker @cancel="showBackTime = false"
                          @confirm="onConfirmBackTime"
                          v-model="getBackTime"
                          type="date"
                          :min-date="minDate"
                          :max-date="maxDate" />
                      </van-popup>
                    </div>
                  </div>

                </div>
                <div class="questions">
                  <p class="label">5:过去14天内是否与湖北等地区人员有接触史?</p>
                  <div class="chooseData">
                    <van-radio-group checked-color="#fdd642"
                      v-model="baseInfoFrom.contact_hubei">
                      <van-radio name="是">是</van-radio>
                      <van-radio name="否">否</van-radio>
                    </van-radio-group>
                  </div>
                  <div v-if="baseInfoFrom.contact_hubei=='是'">
                    <van-field readonly
                      clickable
                      :rules="otherRlues['contact_time']"
                      :value="baseInfoFrom.contact_time"
                      label="接触时间："
                      @click="showTouchTime=true" />
                    <van-popup v-model="showTouchTime"
                      position="bottom">
                      <van-datetime-picker @cancel="showTouchTime = false"
                        @confirm="onConfirmTouchTime"
                        v-model="getTouchTime"
                        type="date"
                        :min-date="minDate"
                        :max-date="maxDate" />
                    </van-popup>
                  </div>
                </div>
              </div>
              <div class="singBox">
                <van-checkbox-group checked-color="#fdd642"
                  v-model="sing">
                  <van-checkbox name="a">本人承诺:
                    为疫情防控，本人及其家人同意以上信息依法提交所在辖区疫情防控部门统筹管理。 </van-checkbox>
                  <van-checkbox name="b">本人对信息内容的真实性和完整性负责。如果信息有误或缺失，本人愿承担相应的法律责任。同时，本人及家人保证遵守防疫管控的各项规定，配合并听从各项措施和要求。</van-checkbox>
                </van-checkbox-group>
              </div>
              <div style="margin:20px 0;text-align:center;">
                <van-button class='Button'
                  round
                  native-type="submit">
                  提交信息
                </van-button>
              </div>
            </van-form>
          </div>

        </div>

      </div>
      <p class="footer">&copy;四川精准医疗科技有限责任公司</p>

    </div>

  </div>
</template>

<script>
import {
  Area,
  Field,
  Form,
  Button,
  NavBar,
  Toast,
  Popup,
  Dialog,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Picker,
  Radio,
  DatetimePicker
} from 'vant'
import { validate } from '@/utils/validate'
import { areaList } from '@/utils/selectData.js'
import logo from '../../assets/img/login/logo-down.png'
export default {
  name: 'surveyForm',
  components: {
    [Area.name]: Area,
    [Form.name]: Form,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [NavBar.name]: NavBar,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker
  },
  data() {
    return {
      showArea: false,
      showSex: false,
      register_date: false,
      showBackTime: false,
      getBackTime: new Date(),
      getTime: new Date(),
      minDate: new Date(2019, 1, 1),
      maxDate: new Date(2025, 10, 1),
      showTouchTime: false,
      getTouchTime: new Date(),
      noHaseSymptom: true,
      logo,
      sing: [],
      areaList,
      baseInfoFrom: {
        // true_name: '王佳佳',
        // id_card: '511321199510064705',
        // mobile: '18382357031',
        // area: '四川省/成都市/天府新区',
        // community: '中和',
        // sex: '女',
        // address: '空',
        // register_date: '',
        // age: '20',

        true_name: '',
        id_card: '',
        mobile: '',
        area: '',
        community: '',
        sex: '',
        address: '',
        register_date: '',
        age: '',
        symptom: [],
        other_symptom: '',
        back: '否',
        back_time: '',
        contact: '否',
        leave: '否',
        leave_place: '',
        contact_hubei: '否',
        contact_time: ''
      },
      symptomData: [
        '发热（>37.3℃）',
        '咳嗽',
        '胸闷',
        '呼吸困难',
        '恶心呕吐',
        '腹泻',
        '其他'
      ],
      baseInfoFromConfig: {
        true_name: {
          label: '姓名',
          type: 'input',
          placeholder: '请填写真实姓名',
          rules: [{ message: '姓名不能为空', required: true }]
        },
        sex: {
          label: '性别',
          type: 'sex',
          placeholder: '请点击选择',
          readonly: true,
          rules: [{ message: '请选择性别', required: true }]
        },
        age: {
          label: '年龄',
          type: 'digit',
          maxLength: '3',
          placeholder: '请输入年龄',
          rules: [
            { message: '请输入年龄', required: true },
            { validator: validate.verifyIsAge, message: '请输入正确的年龄' }
          ]
        },
        id_card: {
          label: '身份证号',
          type: 'input',
          maxLength: '18',
          placeholder: '请填写身份证号',
          rules: [
            { message: '身份证号不能为空', required: true },
            { validator: validate.verifyIdcard, message: '身份证号错误' }
          ]
        },
        mobile: {
          label: '手机号码',
          type: 'tel',
          placeholder: '请填写手机号码',
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
        register_date: {
          label: '到访时间',
          type: 'selectTime',
          placeholder: '请点击选择',
          readonly: true,
          rules: [{ message: '请选择到访时间', required: true }]
        },
        community: {
          label: '所在社区',
          type: 'input',
          placeholder: '所在社区',
          rules: [{ message: '所在社区', required: true }]
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
  computed: {
    otherRlues() {
      let otherRlues = {}
      let { symptom, leave, contact_hubei } = this.baseInfoFrom
      if (symptom.indexOf('其他') >= 0) {
        otherRlues['other_symptom'] = [
          { message: '请填写其他症状', required: true }
        ]
      }
      if (leave === '是') {
        otherRlues['leave_place'] = [
          { message: '请填写离开地点', required: true }
        ]
        otherRlues['back_time'] = [
          { message: '请填写返回时间', required: true }
        ]
      }
      if (contact_hubei === '是') {
        otherRlues['contact_time'] = [
          { message: '请填写接触时间', required: true }
        ]
      }
      return otherRlues
    }
  },
  methods: {
    isShowArea() {
      this.showArea = true
    },
    //验证失败事件
    failed(value) {
      Toast(value.errors[0].message)
    },
    isShowSex() {
      this.showSex = true
    },
    isShowRegisterTime() {
      this.register_date = true
    },
    onConfirmSex(value) {
      this.baseInfoFrom.sex = value
      this.showSex = false
    },
    onConfirmRegisterTime(value) {
      this.baseInfoFrom.register_date = this.getFormat(
        'yyyy-MM-dd',
        value.getTime()
      )
      this.register_date = false
    },
    onConfirmBackTime(value) {
      this.baseInfoFrom.back_time = this.getFormat(
        'yyyy-MM-dd',
        value.getTime()
      )
      this.showBackTime = false
    },
    onConfirmTouchTime(value) {
      this.baseInfoFrom.contact_time = this.getFormat(
        'yyyy-MM-dd',
        value.getTime()
      )
      this.showTouchTime = false
    },
    getFormat(fmt = 'yyyy-MM-dd', time = new Date().getTime()) {
      let newTime = new Date(time)
      let o = {
        'M+': newTime.getMonth() + 1, // 月份
        'd+': newTime.getDate(), // 日
        'h+': newTime.getHours(), // 小时
        'm+': newTime.getMinutes(), // 分钟
        's+': newTime.getSeconds(), // 秒
        'q+': Math.floor((newTime.getMonth() + 3) / 3), // 季度
        S: newTime.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (newTime.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return fmt
    },
    // 提交表单
    onSubmit() {
      if (this.sing.length !== 2) {
        this.$showMsg('请勾选本人承诺选项！')
        return false
      }
      let newObj = this._.cloneDeep(this.baseInfoFrom)

      //无
      if (this.noHaseSymptom) {
        newObj.symptom = '无'
      } else {
        newObj.symptom = newObj.symptom
          .toString()
          .replace('其他,', '')
          .replace('其他', '')
        if (newObj.symptom.length <= 0) {
          newObj.symptom = '无'
        }
      }
      newObj.age = Number(newObj.age)
      let loading = Toast.loading({
        message: '正在提交信息...',
        forbidClick: true,
        duration: 0, // 持续展示 toast,
        className: 'modifyTaost',
        overlay: true
      })
      this.$api['health_register'](newObj)
        .then(() => {
          loading.clear()
          Dialog.alert({
            message: '',
            confirmButtonText: '提交成功！',
            confirmButtonColor: '#23bca2',
            width: '256px',
            className: 'tipDialog1'
          }).then(() => {
            //清空数据
            this.$router.go(0)
          })
        })
        .catch(err => {
          loading.clear()
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
    },
    checkednoHaseSymptom(value) {
      if (value === true) {
        this.baseInfoFrom.symptom = []
      }
    },
    checkedSymptom(value) {
      if (value.length >= 1) {
        this.noHaseSymptom = false
      } else {
        this.noHaseSymptom = true
      }
    }
  },
  created() {}
}
</script>

<style lang="less">
.surveyForm {
  background: #e2f6ef;
  .van-nav-bar__title {
    font-size: 34px;
  }
  .active-detail {
    margin-top: 94px;
    padding: 20px 0;
    .companyInfo {
      max-width: 400px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .other {
      padding: 0 20px;
      .info {
        background: #43afb3;
        padding: 15px;
        border-radius: 14px;
        margin-top: 30px;
        //表单
        & > div {
          border: 2px solid rgba(6, 109, 114, 1);
          border-radius: 14px;
          padding: 35px 30px 0;
          font-size: 28px;
          h3,
          h4 {
            color: #fdd642;
            font-size: 34px;
            text-align: center;
            margin-bottom: 30px;
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
        //选择问题
        .otherInfo {
          padding: 10px 0;
          .questions {
            padding: 15px 0;
            .label {
              font-size: 30px;
            }
            .van-checkbox__label,
            .van-radio__label {
              line-height: 50px;
              font-size: 28px;
              padding-left: 10px;
            }
          }
        }
      }
    }
    .singBox {
      padding: 20px 10px;
      .van-checkbox__label {
        line-height: 40px;
        font-size: 20px;
        padding: 10px 10px 10px 30px;
      }
    }
    .footer {
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
      background: url('../../assets/img/active/shibai.png') no-repeat;
      background-size: 100%;
    }
  }
}
// 提交中..
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
  .van-toast__loading {
    color: #fdd642;
  }
}
</style>


