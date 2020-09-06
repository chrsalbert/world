<template>
    <svg viewBox="0 0 1000 429" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke-width="1" fill="none">
            <g>
                <template v-for="country in countries">
                    <path 
                        v-if="country.map.path" 
                        :key="country.id" 
                        :id="country.id" 
                        :d="country.map.path"
                        class="country"
                        :class="{ 'country--active': country.id === currentCountry.id }"
                        vector-effect="non-scaling-stroke" />
                    <polygon 
                        v-if="country.map.polygon" 
                        :key="country.id" 
                        :id="country.id" 
                        :points="country.map.polygon"
                        class="country"
                        :class="{ 'country--active': country.id === currentCountry.id }"
                        vector-effect="non-scaling-stroke" />
                </template>
            </g>
            <g>
                <template v-for="country in countries">
                    <use 
                        v-if="country.id === currentCountry.id"
                        :key="country.id" 
                        :data-country="country.id" 
                        :xlink:href="`#${country.id}`"  />
                </template>
            </g>
            <g transform="translate(9, 38)">
                <template v-for="location in locations">
                    <line 
                        v-if="location.linkCoordinates" 
                        :key="location.id" 
                        :x1="location.cx" 
                        :y1="location.cy" 
                        :x2="location.linkCoordinates.cx" 
                        :y2="location.linkCoordinates.cy"
                        class="line" 
                        vector-effect="non-scaling-stroke" />
                </template>
                <circle
                    v-for="location in locations" :key="`${location.cx}${location.cy}`"
                    :data-country="location.title"
                    :cx="location.cx"
                    :cy="location.cy"
                    r="2"
                    class="location"
                    vector-effect="non-scaling-stroke"
                    @click="alert('yolo')"
                />
            </g>
        </g>
    </svg>
</template>
<script>
export default {
    props: {
        countries: {
            type: Array,
            required: true
        },
        currentCountry: {
            type: Object,
            required: true
        }
    },
    computed: {
        locations() {
            let locations = [].concat.apply([],Array.from(this.countries, x => x.map.locations))
            let unique = [...new Set(locations)]
            unique.forEach(location => {
                if(!location.link) return
                const link = locations.find(link => link.id === location.link)
                if(!link) return
                location.linkCoordinates = { 'cx': link.cx, 'cy': link.cy }
            })
            return unique
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
    .countryFoo {
        stroke: red
    }
    .line {
        stroke: var(--color-primary);
    }
    .location {
        r: calc(16 / var(--scale));
        stroke: var(--color-primary);
        fill: var(--color-gray-darkest);
        transition: all 1s var(--timing-function);
    }
    .location:hover {
        transition-duration: .15s;
        r: calc(32 / var(--scale));
    }
</style>