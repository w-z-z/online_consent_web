/*
 * @Descripttion:表单校验
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-20 12:39:09
 * @LastEditors: ranli
 * @LastEditTime: 2020-02-20 15:19:24
 */
let rlues = {
  phone: /1\d{10}/,
  code: /\d{4}/,
}
//验证手机
export let phoneValidator = (val, name) => {
  return new Promise((resolve, reject) => {
    if (rlues.phone.test(val)) {
      resolve(true);
    } else {
      reject({
        name: name,
        status: false,
        msg: "手机号格式有误"
      })
    }
  });
}
//验证验证码
export let codeValidator = (val, name) => {
  return new Promise((resolve, reject) => {
    if (rlues.code.test(val)) {
      resolve(true);
    } else {
      reject({
        name: name,
        status: false,
        msg: "验证码有误"
      })
    }

  });
}
