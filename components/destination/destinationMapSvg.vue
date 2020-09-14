<template>
    <svg viewBox="0 0 1000 429" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke-width="1" fill="none">
            <g class="visually-hidden">
                <template v-for="country in countries">
                    <component 
                        :id="country.id" 
                        :key="country.id" 
                        :is="country.tag"
                        :d="country.d"
                        :points="country.points"
                        vector-effect="non-scaling-stroke"
                        />
                </template>
            </g>
            <g id="allCountries">
                <template v-for="country in countries">
                    <use 
                        class="country"
                        :key="country.id"
                        :xlink:href="`#${country.id}`"  />
                </template>
            </g>
            <g id="activeCountries">
                <template v-for="map in countries">
                    <transition name="country--active" :key="map.id">
                        <use 
                            class="country country--active"
                            v-if="map.id === currentDestination.countryId"
                            :xlink:href="`#${map.id}`"  />
                    </transition>
                </template>
            </g>
            <g id="route" transform="translate(2, 2)">
                <polyline
                    class="route"
                    :points="routePoints"
                    vector-effect="non-scaling-stroke"></polyline>
            </g>
            <g id="activeRoute" transform="translate(2, 2)">
                <transition name="route--active">
                    <polyline 
                        class="route route--active"
                        :key="currentRoutePoints"
                        :points="currentRoutePoints"
                        vector-effect="non-scaling-stroke"></polyline>
                </transition>
            </g>
            <g id="places" transform="translate(2, 2)">
                <circle v-for="place in places"
                    :key="`${place.cx}${place.cy}`"
                    :cx="place.cx"
                    :cy="place.cy"
                    class="place"
                    :class="{ 'place--active': placeInCurrentDestination(place.id) }"
                    vector-effect="non-scaling-stroke"
                />
            </g>
        </g>
    </svg>
</template>
<script>
export default {
    props: {
        places: {
            type: Array,
            required: true
        },
        countries: {
            type: Array,
            required: true
        },
        destinations: {
            type: Array,
            required: true
        },
        currentDestination: {
            type: Object,
            required: true
        },
        currentDestinationIndex: {
            type: Number,
            required: true
        }
    },
    computed: {
        route() {
            return this.destinations.map(el => el.route).flat()
        },
        routePoints() {
            return this.getRoutePoints(this.route)
        },
        prevRoutePoints() {
            let index = this.destinations.findIndex(el => el.id === this.currentDestination.id)
            let route = []
            for(let i = 0; i <= index; i++) {
                if(!this.destinations[i].route) continue
                route.push(this.destinations[i].route)
            }
            route = route.flat()
            return this.getRoutePoints(route)
        },
        currentRoutePoints() {
            let prevDestinationId = this.currentDestinationIndex === 0 ? this.destinations.length - 1 : this.currentDestinationIndex - 1
            let prevStop = this.destinations[prevDestinationId].route.slice(-1)
            let prevStopPoints = this.getRoutePoints(prevStop)

            let nextDestinationId = this.currentDestinationIndex === (this.destinations.length - 1) ? 0 : this.currentDestinationIndex + 1
            let nextStop = [this.destinations[nextDestinationId].route[0]]
            let nextStopPoints = this.getRoutePoints(nextStop)

            let currentStopPoints = this.getRoutePoints(this.currentDestination.route)
            
            return `${prevStopPoints} ${currentStopPoints} ${nextStopPoints}`
        }
    },
    methods: {
        getRoutePoints(route = []) {
            let points = ''
            route.forEach(placeId => {
                let place = this.places.find(el => el.id === placeId)
                if(!place) return console.error(`no place found "${placeId}" while generating route points`)
                points += ` ${place.cx} ${place.cy}`
            })
            return points
        },
        placeInCurrentDestination(id) {
            if(!this.currentDestination.route) return console.error(`no routes found for currentDestination "${this.currentDestination.id}"`)
            return this.currentDestination.route.some(el => el === id)
        }
    }
}
</script>
<style scoped>
    .visually-hidden {
        visibility: hidden;
    }

    .country {
        stroke: var(--color-gray-dark);
    }
    .country--active {
        stroke: var(--color-gray-lightest);
        transition: all .3s var(--timing-function);
    }
    .country--active-leave { opacity: 1 }
    .country--active-leave-to { opacity: 0 }
    .country--active-enter { opacity: 0 }
    .country--active-enter-to { opacity: 1 }

    .route {
        stroke: var(--color-gray);
    }
    .route--active {
        stroke: var(--color-primary);
        transition: all .3s var(--timing-function);
    }
    .route--active-leave { opacity: 1 }
    .route--active-leave-to { opacity: 0 }
    .route--active-enter { opacity: 0 }
    .route--active-enter-to { opacity: 1 }

    .place {
        r: calc(12 / var(--scale));
        stroke: var(--color-gray);
        fill: var(--color-gray-darkest);
        transition-duration: .4s;
        box-shadow: 10px 10px 10px red
    }
    .place--active {
        stroke: var(--color-primary);
    }
</style>