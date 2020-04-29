export const state = () => ({
    countries: []
})
  
export const mutations = {
    addCountries(state, val) {
        state.countries = val
    }
}