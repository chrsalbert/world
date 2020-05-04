export const state = () => ({
    id: 'foo'
})
  
export const mutations = {
    changeId(state, val) {
        state.id = val
    }
}