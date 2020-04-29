export const state = () => ({
    showSubNav: false,
    currentNav: 'default'
  })

export const mutations = {
    showSubNav(state, val) {
        state.showSubNav = val
    },
    changeNav(state, val) {
        state.currentNav = val
    }
}