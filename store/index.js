export const state = () => ({
  showSubNav: false
})

export const mutations = {
  showSubNav(state, val) {
    state.showSubNav = val
  }
}