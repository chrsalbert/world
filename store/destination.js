import destinations from '~/static/data/destinations.json';
import places from '~/static/data/places.json';
import countries from '~/static/data/countries.json';

export const state = () => ({
    destinations: destinations,
    places: places,
    countries: countries,
    currentDestinationIndex: 0
  })

export const getters = {
    getPlaces: (state) => {
        return state.places
    },
    getCountries: (state) => {
        return state.countries
    },
    getDestinations: (state) => {
        return state.destinations
    },
    getCurrentDestination: (state, getters) => {
        return state.destinations[getters.getCurrentDestinationIndex]
    },
    getCurrentDestinationIndex: (state) => {
        return state.currentDestinationIndex
    },
    getDestinationsCount: (state) => {
        return state.destinations.length
    },
    getCurrentDestinationStep: (state) => {
        let index = state.currentDestinationIndex
        index++
        return index < 10 ?  `0${index}` : index
    },
    getPrevDestinationIndex: (state) => {
        return state.currentDestinationIndex === 0 ? state.destinations.length - 1 : state.currentDestinationIndex - 1
    },
    getNextDestinationIndex: (state) => {
        return state.currentDestinationIndex === (state.destinations.length - 1) ? 0 : state.currentDestinationIndex + 1
    },
    getNextDestinationUrl: (state, getters) => {
        return `/destination/${state.destinations[getters.getNextDestinationIndex].id}`
    },
    getPrevDestinationUrl: (state, getters) => {
        return `/destination/${state.destinations[getters.getPrevDestinationIndex].id}`
    }
}

export const mutations = {
    SET_CURRENT_DESTINATION(state, val) {
        let currentDestinationIndex = state.destinations.findIndex(destination => destination.id === val)
        state.currentDestinationIndex = currentDestinationIndex > 0 ? currentDestinationIndex : 0
    }
}