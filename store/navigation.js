export const state = () => ({
    isMenuVisible: false,
})

export const getters = {
    showMenu: (state) => {
        return state.isMenuVisible
    }
}

export const mutations = {
    SET_IS_MENU_VISIBLE(state, val) {
        state.isMenuVisible = val
    }
}

export const actions = {
    toggleMenu({ state, commit }) {
        commit('SET_IS_MENU_VISIBLE', !state.isMenuVisible)
    }
}