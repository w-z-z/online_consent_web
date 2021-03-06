const state = {
  headerShow: true
  // defaultImg: 'this.src="' + require('@assets/images/default-img.png') + '"', // 默认图片
  // defaultHeadImg:
  //   'this.src="' + require('@assets/images/default-head.svg') + '"', // 默认头像
}
const mutations = {
  TOGGLE_HEADER: (state, isShow) => {
    state.headerShow = isShow
  }
}
const actions = {
  ToggleHeader ({ commit }, isShow) {
    commit('TOGGLE_HEADER', isShow)
  }
}
export default {
  state,
  mutations,
  actions
}
