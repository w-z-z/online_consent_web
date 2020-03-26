/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-03 16:55:20
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-03 17:43:23
 */
import Vue from 'vue'
import router from '../../router/index'
const state = {
  userInfo: {},
  editAddress: {}
}
const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data
  },
  INCREMENT_CHANGEUSERINFO(state, data) {
    state.userInfo = data
  },
  EDIT_ADDRESS(state, data) {
    state.editAddress = data
  }
}
const actions = {
  setUserInfo({
    commit
  }, data) {
    return new Promise((resolve) => {
      commit('SET_USER_INFO', data)
      resolve()
    })
  },

  editAddress({
    commit
  }, data) {
    commit('EDIT_ADDRESS', data)
  },
  //清空用户数据
  clearAllUserData({
    commit
  }, data = null) {
    commit('INCREMENT_CHANGEUSERINFO', data)
    Vue.prototype.$showMsg("登录失效")
    //回到登录页
    router.push({
      name: 'login'
    })
  },

}

export default {
  state,
  mutations,
  actions
}