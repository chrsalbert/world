export const state = () => ({
    isSubNavVisible: false,
    context: 'default'
  })

export const mutations = {
    toggleSubNav(state, val) {
        state.isSubNavVisible = val
    },
    changeContext(state, val) {
        state.context = val
    }
}