export const state = () => ({
    isMenuVisible: false,
  })

export const mutations = {
    SET_IS_MENU_VISIBLE(state, val) {
        state.isMenuVisible = val
    }
}