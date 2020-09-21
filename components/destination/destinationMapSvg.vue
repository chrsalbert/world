<template>
    <svg 
        class="c-worldmap" 
        :style="{ 
            '--position': position, 
            '--scale': scale,
            '--place-radius': placeRadius
        }"
        viewBox="0 0 1000 429" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke-width="1" fill="none" transform="translate(500, 215)">
            <g class="c-worldmap__countrySprite">
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
            <g id="activeCountries" v-if="currentDestination">
                <template v-for="map in countries">
                    <transition name="country--active" :key="map.id">
                        <use 
                            class="country country--active"
                            v-if="map.id === currentDestination.countryId"
                            :xlink:href="`#${map.id}`"  />
                    </transition>
                </template>
            </g>
            <g id="route">
                <polyline
                    class="route"
                    :points="routePoints"
                    vector-effect="non-scaling-stroke"></polyline>
            </g>
            <g id="activeRoute" v-if="currentDestination">
                <transition name="route--active">
                    <polyline 
                        class="route route--active"
                        :key="currentRoutePoints"
                        :points="currentRoutePoints"
                        vector-effect="non-scaling-stroke"></polyline>
                </transition>
            </g>
            <g id="places">
                <circle 
                    v-for="place in places"
                    :key="`${place.cx}${place.cy}`"
                    :cx="place.cx" 
                    :cy="place.cy" 
                    class="c-worldmap__place"
                    :class="{ 'c-worldmap__place--active': placeInCurrentDestination(place.id) }"
                    vector-effect="non-scaling-stroke" />
                <!-- <path v-for="place in places"
                    class="place" 
                    :key="`${place.cx}${place.cy}`"
                    vector-effect="non-scaling-stroke" 
                    :d="`
                        M ${place.cx}, ${place.cy}
                        a 10,10 0 1,1 20,0
                        a 10,10 0 1,1 -20,0
                    `" /> -->
                <!-- <line v-for="place in places"
                    :key="`${place.cx}${place.cy}`"
                    :x1="place.cx - 0.01"
                    :x2="place.cx"
                    :y1="place.cy"
                    :y2="place.cy"
                    class="c-worldmap__place c-worldmap__place--outline"
                    :class="{ 'c-worldmap__place--active': placeInCurrentDestination(place.id) }"
                    vector-effect="non-scaling-stroke" />
                <line v-for="place in places"
                    :key="`${place.cx}${place.cy}2`"
                    :x1="place.cx - 0.01"
                    :x2="place.cx"
                    :y1="place.cy"
                    :y2="place.cy"
                    class="c-worldmap__place"
                    :class="{ 'c-worldmap__place--active': placeInCurrentDestination(place.id) }"
                    vector-effect="non-scaling-stroke" /> -->
            </g>
        </g>
    </svg>
</template>
<script>
import destinations from '~/static/data/destinations.json';
import countries from '~/static/data/countries.json';
import places from '~/static/data/places.json';

export default {
    props: {
        currentDestination: Object,
        currentDestinationIndex: Number
    },
    data() {
        return {
            destinations, countries, places
        }
    },
    computed: {
        currentCountryMap() {
            if(!this.currentDestination) return null
            return this.countries.find(el => el.id === this.currentDestination.countryId)
        },
        position() {
            if(!this.currentCountryMap) return '0, 0, 0'
            return this.currentCountryMap.translate3d
        },
        scale() {
            if(!this.currentCountryMap) return 1
            return this.currentCountryMap.scale
        },
        placeRadius() {
            return 3 / parseInt(this.scale)
        },
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
            if(!this.currentDestination) return false
            if(!this.currentDestination.route) return console.error(`no routes found for currentDestination "${this.currentDestination.id}"`)
            return this.currentDestination.route.some(el => el === id)
        }
    }
}
</script>
<style scoped>
    .c-worldmap {
        width: 100%;
        height: 100%;
    }

    .c-worldmap g {
        transform: scale(var(--scale)) translate3d(var(--position));
        transition: all 1s var(--timing-function)
    }

    .c-worldmap__countrySprite {
        visibility: hidden;
    }

    .c-worldmap__place {
        stroke: var(--color-gray);
        fill: var(--color-gray-darkest);
        stroke-width: 1;
        r: var(--place-radius);
        transform: translate(.5px, .5px);
        transition-duration: .4s;
    }
    .c-worldmap__place--active {
        stroke: var(--color-primary);
    }

    .country {
        stroke: var(--color-gray-dark);
    }
    .country--active {
        stroke: var(--color-gray-lighter);
        transition: all .3s var(--timing-function);
    }
    .country--active-leave { opacity: 1 }
    .country--active-leave-to { opacity: 0 }
    .country--active-enter { opacity: 0 }
    .country--active-enter-to { opacity: 1 }

    .route {
        stroke: var(--color-gray);
        transform: translate(.5px, .5px);
    }
    .route--active {
        stroke: var(--color-primary);
        transition: all .3s var(--timing-function);
    }
    .route--active-leave { opacity: 1 }
    .route--active-leave-to { opacity: 0 }
    .route--active-enter { opacity: 0 }
    .route--active-enter-to { opacity: 1 }


</style>