<template>
    <div 
        class="c-destinationMap" 
        :class="`c-destinationMap--${currentDestination.id}`" 
        :style="{ '--position': position, '--scale': scale }">
        <figure>
            <destination-map-svg 
                :places="places" 
                :countries="countries" 
                :destinations="destinations" 
                :currentDestination="currentDestination"
                :currentDestinationIndex="currentDestinationIndex" />
        </figure>
    </div>
</template>
<script>
export default {
    props: {
        countries: {
            type: Array,
            required: true
        },
        places: {
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
        currentCountryMap() {
            return this.countries.find(el => el.id === this.currentDestination.countryId)
        },
        position() {
            if(!this.currentCountryMap) return '0, 0, 0'
            return this.currentCountryMap.translate3d
        },
        scale() {
            if(!this.currentCountryMap) return 0
            return this.currentCountryMap.scale
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
    height: 60vw;
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
            rgba(var(--color-gray-darkest-rgb),0) 20%,
            rgba(var(--color-gray-darkest-rgb),0) 80%,
            rgba(var(--color-gray-darkest-rgb),1) 99%
        ),
        linear-gradient(
            to right,
            rgba(var(--color-gray-darkest-rgb),1) 0%,
            rgba(var(--color-gray-darkest-rgb),0) 20%,
            rgba(var(--color-gray-darkest-rgb),0) 80%,
            rgba(var(--color-gray-darkest-rgb),1) 99%
        )
}
/* .c-destinationMap::after {
    content:'';
    z-index: -1;
    position: absolute;
    pointer-events: none;
    border: 1px red solid;
    z-index: 1;
    top: 20%;
    right: 20%;
    bottom: 20%;
    left: 20%;
}
.c-destinationMap::before {
    content:'';
    z-index: -1;
    position: absolute;
    pointer-events: none;
    border: 1px red solid;
    z-index: 1;
    top: 15%;
    right: 15%;
    bottom: 15%;
    left: 15%;
    background: none
} */
.c-destinationMap >>> svg {
    position: relative;
    left: calc(calc(100% * var(--scale) - 100%) / -2);
    width: calc(100% * var(--scale));
    height: unset;
    transform: translate3d(var(--position));
    transition: all 1s var(--timing-function);
}

/* @media only screen and (orientation: portrait) {
    .c-destinationMap {
        flex: auto;
        height: 60vw;
    }
} */
</style>