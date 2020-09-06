<template>
    <svg viewBox="0 0 1000 429" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke-width="1" fill="none">
            <g id="places">
                <template v-for="map in countryMaps">
                    <component 
                        :id="map.id" 
                        class="country"
                        :class="{ 'country--active': map.id === currentDestination.id }"
                        vector-effect="non-scaling-stroke"
                        :key="map.id" 
                        :is="map.tag"
                        :d="map.d"
                        :points="map.points"
                        />
                </template>
            </g>
            <g id="activeplaces">
                <template v-for="map in countryMaps">
                    <use 
                        v-if="map.id === currentDestination.id"
                        :key="map.id"
                        :xlink:href="`#${map.id}`"  />
                </template>
            </g>
            <g id="route" transform="translate(1, 1)">
                <polyline 
                    class="line" 
                    :points="routePoints"
                    vector-effect="non-scaling-stroke"></polyline>
                <template v-for="(route, index) in routes">
                    <line 
                        v-if="routes[index+1]"
                        :key="index" 
                        :x1="route.cx" 
                        :y1="route.cy" 
                        :x2="routes[index+1].cx" 
                        :y2="routes[index+1].cy"
                        class="line" 
                        :class="{ 
                            'line--active': route.countryId === currentDestination.id || routes[index+1].countryId === currentDestination.id 
                        }"
                        :data-lol="index"
                        vector-effect="non-scaling-stroke" />
                </template>
            </g>
            <g id="places" transform="translate(1, 1)">
                <circle
                    v-for="place in places" 
                    :key="`${place.cx}${place.cy}`"
                    :cx="place.cx"
                    :cy="place.cy"
                    class="place"
                    :class="{ 'place--active': place.countryId === currentDestination.id }"
                    vector-effect="non-scaling-stroke"
                />
            </g>
        </g>
    </svg>
</template>
<script>
import countryMaps from '~/static/data/countryMaps.json';
import route from '~/static/data/route.json';
import places from '~/static/data/places.json';

export default {
    props: {
        currentDestination: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            countryMaps: countryMaps,
            places: places,
            route: route
        }
    },
    computed: {
        routes() {
            let routes = []
            route.forEach(stop => {
                let place = places.find(el => el.id === stop)
                if(!place) return console.error(`error while adding route stop: no place found "${stop}"`)
                routes.push(place)
            })
            return routes
        },
        routePoints() {
            let points = ""
            route.forEach(stop => {
                let place = places.find(el => el.id === stop)
                if(!place) return console.error(`error while adding route points: no place found "${stop}"`)
                points += ` ${place.cx} ${place.cy}`
            })
            return points
        }
    }
}
</script>
<style scoped>
    .country {
        stroke: var(--color-gray)
    }
    .country--active {
        stroke: var(--color-gray-lightest)
    }
    .line {
        stroke: var(--color-gray);
    }
    .line--active {
        stroke: var(--color-primary);
    }
    .place {
        r: calc(16 / var(--scale));
        stroke: var(--color-gray);
        fill: var(--color-gray-darkest);
        transition: all 1s var(--timing-function);
    }
    .place--active {
        stroke: var(--color-primary);
    }
    .place:hover {
        transition-duration: .15s;
        r: calc(32 / var(--scale));
    }
</style>