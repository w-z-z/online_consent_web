/*
 * @Description: active
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-05 09:53:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-14 09:43:40
 */
let active = [{
  meta: {
    title: '健康信息登记',
  },
  name: 'surveyForm',
  path: '/surveyForm',
  component: () => import('@/views/surveyForm/index.vue'),
}, ]
export default active