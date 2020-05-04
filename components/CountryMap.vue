<template>
    <svg class="u-fluid map" width="400px" height="300px" viewBox="0 0 400 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke-width="1" fill="none" fill-rule="evenodd">
            <polyline id="route" stroke="#00D4FA" :points="map.route"></polyline>
            <circle :style="`--delay:${index * .5}s`" v-for="(location, index) in map.locations" :key="index" stroke="#34DCFB" fill="#222230" :cx="location.cx" :cy="location.cy" r="8"></circle>
            <polygon id="border" :style="`--length:${length}`" ref="circle" stroke="#FFFFFF" stroke-linejoin="round" :points="map.border"></polygon>
        </g>
    </svg>
</template>
<script>
export default {
    props: {
        map: Object
    },
    computed: {
        length() {
            // const svg = document.getElementById('border')
            // const length = svg.getTotalLength()
            return '1500'
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