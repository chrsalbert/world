<template>
    <div class="container">
        <video autoplay muted loop>
            <source src="/hero.mp4" type="video/mp4">
        </video>
        <figure class="worldmap" v-html="WorldMap"></figure>
        <div class="header">
            <h1>ON A<br/>JOURNEY</h1>
            <p>Die Foto-Story über meine Reise nach Osten. Vom 1. Mai 2019 bis vorerst zur weltweiten Reisewarnung am 16. Märzt 2020. Immer der Nase lang.</p>
        </div>
    </div>
</template>
<script>
import WorldMap from "~/assets/images/world-map.svg?raw"

export default {
    data () {
        return {
            WorldMap
        }
    }    
}
</script>
<style scoped>
.container {
    position: relative;
    background: #281f18;
    height: 100vh;
}

.header {
    position: absolute;
    color: #fff;
    top: 40%;
    left: var(--grid-column-width);
}

h1 {
    font-weight: 900;
    font-size: 10rem;
    color: #fff;
    line-height: .8;
    letter-spacing: 0;
    margin-bottom: 1rem
}

p {
    max-width: 30em;
    font-size: var(--font-size-lg)
}

.worldmap {
    position: absolute;
    width: 80%;
    top: 5rem;
    left: 10vw;
}

svg {
    width: 100%;
    height: 100%;
}

video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    filter: saturate(.95) brightness(.6) contrast(.62);
    opacity: .5;
}
</style>