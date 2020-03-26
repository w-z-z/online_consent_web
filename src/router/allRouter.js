/*
 * @Description: 所有的路由配置
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-20 21:25:48
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-19 10:35:34
 */

//所有路由信息
import active from './model/active'
import surveyForm from './model/surveyForm'
import errorPage from './model/errorPage'
import downLoadApp from './model/downLoadApp'

// let status = 2 //1 "onlyActive";  number 2 登记表
let RouterMap = []
RouterMap = [
  ...active, ...surveyForm, ...errorPage, ...downLoadApp
]
//拼接路由
RouterMap.push({
  name: '',
  path: '*',
  redirect: '/404'
})
export default RouterMap