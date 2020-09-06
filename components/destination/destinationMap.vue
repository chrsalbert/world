<template>
    <div 
        class="c-destinationMap" 
        :class="`c-destinationMap--${currentDestination.id}`" 
        :style="{ '--position': currentCountryMap.translate3d, '--scale': currentCountryMap.scale }">
        <figure><destination-map-svg :currentDestination="currentDestination" /></figure>
    </div>
</template>
<script>
import countryMaps from '~/static/data/countryMaps.json';

export default {
    data() {
        return {
            countryMaps: countryMaps
        }
    },
    props: {
        currentDestination: {
            type: Object,
            required: true
        }
    },
    computed: {
        currentCountryMap() {
            return countryMaps.find(el => el.id === this.currentDestination.id)
        }
    }
}
</script>
<style scoped>
.c-destinationMap {
    position: relative;
    z-index: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.c-destinationMap::before {
    content:'';
    position: absolute;
    pointer-events: none;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: 
        linear-gradient(
            to bottom, 
            rgba(var(--color-gray-darkest-rgb),1) 0%,
            rgba(var(--color-gray-darkest-rgb),0) 30%,
            rgba(var(--color-gray-darkest-rgb),0) 70%,
            rgba(var(--color-gray-darkest-rgb),1) 99%
        ),
        linear-gradient(
            to right,
            rgba(var(--color-gray-darkest-rgb),1) 0%,
            rgba(var(--color-gray-darkest-rgb),0) 30%,
            rgba(var(--color-gray-darkest-rgb),0) 70%,
            rgba(var(--color-gray-darkest-rgb),1) 99%
        )
}
.c-destinationMap >>> svg {
    position: relative;
    left: calc(calc(100% * var(--scale) - 100%) / -2);
    width: calc(100% * var(--scale));
    height: unset;
    transform: translate3d(var(--position));
    transition: all 1s var(--timing-function);
}

@media only screen and (orientation: portrait) {
    .c-destinationMap {
        flex: auto;
        height: 60vw;
    }
}
</style>