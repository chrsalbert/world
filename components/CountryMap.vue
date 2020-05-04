<template>
    <svg v-if="map" class="u-fluid map" width="400px" height="300px" viewBox="0 0 400 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke-width="1" fill="none" fill-rule="evenodd">
            <polyline id="route" :style="`--length:200`" stroke="#00D4FA" :points="map.route"></polyline>
            <circle :style="`--delay:${index * .5}s`" v-for="(location, index) in map.locations" :key="index" stroke="#34DCFB" fill="#222230" :cx="location.cx" :cy="location.cy" r="8"></circle>
            <polygon id="border" :style="`--length:1000`" ref="circle" stroke="#FFFFFF" stroke-linejoin="round" :points="map.border"></polygon>
        </g>
    </svg>
</template>
<script>
export default {
    props: {
        map: Object
    },
    mounted() {
        if(this.map) {
            let el = document.getElementById('border')
            let length = el.getTotalLength()
            el.setAttribute("style", `--length:${length}`)

            el = document.getElementById('route')
            length = route.getTotalLength()
            el.setAttribute("style", `--length:${length}`)
        }
    }
}
</script>
<style scoped>
    circle {
        --delay: 0;
        animation: example 10s ease-in-out infinite;
        animation-delay: var(--delay);
    }
    @keyframes example {
        20% {r: 8;}
        25% {r: 12;}
        30% {r: 8;}
    }
</style>