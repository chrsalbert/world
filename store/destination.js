export const state = () => ({
    currentDestination: null,
  })

export const mutations = {
    SET_CURRENT_DESTINATION(state, val) {
        state.currentDestination = val
    }
}