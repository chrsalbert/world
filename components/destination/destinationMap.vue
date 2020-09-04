<template>
    <div class="c-destinationMap" v-html="map" :style="{ '--position': country.map.position }">
    </div>
</template>
<script>
import worldmap from '~/static/images/world-map-new.svg?raw'

export default {
    props: {
        country: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            map: worldmap
        }
    }
}
</script>
<style scoped>
.c-destinationMap {
    position: relative;
    z-index: 1;
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.c-destinationMap::before {
    content:'';
    position: absolute;
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
    min-width: 100%;
    height: auto;
    flex: 1;
    transform: var(--position);
    transition: transform 1s var(--timing-function)
}
.c-destinationMap >>> svg g {
    stroke: var(--color-white)
}

@media only screen and (orientation: portrait) {
    .c-destinationMap {
        flex: auto;
        height: 60vw;
    }
}
</style>