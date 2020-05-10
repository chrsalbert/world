<template>
    <svg v-if="map" class="u-fluid" width="400px" height="300px" viewBox="0 0 400 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke-width="1" fill="none" fill-rule="evenodd">
            <polyline id="route" :style="`--length:9999`" stroke="#00D4FA" :points="map.route"></polyline>
            <polygon id="border" :style="`--length:9999`" ref="circle" stroke="#FFFFFF" stroke-linejoin="round" :points="map.border"></polygon>
            <circle :style="`--delay:${index * .5}s`" v-for="(location, index) in map.locations" :key="index" stroke="#34DCFB" fill="#151e30" :cx="location.cx" :cy="location.cy" r="8"></circle>
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