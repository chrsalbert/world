export const state = () => ({
    showAside: true
  })
  
  export const mutations = {
    showAside(state, val) {
      state.showAside = val
    }
  }