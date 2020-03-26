/*
 * @Description: active
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-05 09:53:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-16 11:56:59
 */
let errorPage = [{
  meta: {
    title: '404',
  },
  name: '404',
  path: '/404',
  component: () => import('@/views/errorPage/index.vue'),
}, ]
export default errorPage