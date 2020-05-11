export const state = () => ({
    isSubNavVisible: false,
  })

export const mutations = {
    toggleSubNav(state, val) {
        state.isSubNavVisible = val
    }
}