export const state = () => ({
    currentDestination: null,
    currentDestinationIndex: null
  })

export const mutations = {
    SET_CURRENT_DESTINATION(state, val) {
        state.currentDestination = val
    },
    SET_CURRENT_DESTINATION_INDEX(state, val) {
        state.currentDestinationIndex = val
    }
}