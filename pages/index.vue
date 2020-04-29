<template>
    <div>
        <div id="scroll-container" class="l-slider">
            <div class="l-slider__section">
                <div class="o-hero">
                    <video autoplay muted loop>
                        <source src="/hero.mp4" type="video/mp4">
                    </video>
                    <figure class="o-hero__map"></figure>
                    <div>
                        <h1>ON A<br/>JOURNEY</h1>
                        <p>Die Foto-Story über meine Reise nach Osten. Vom 1. Mai 2019 bis vorerst zur weltweiten Reisewarnung am 16. Märzt 2020. Immer der Nase lang.</p>
                    </div>
                </div>
            </div>
            <div class="l-slider__section" v-for="(country, index) of countries" :key="index">
                <CountryListItem  v-bind:country="country" />
            </div>
        </div>
        <button class="a-button a-button--icon o-countrySlide__prev" v-html="iconArrowUp"></button>
        <button class="a-button a-button--icon o-countrySlide__next" v-html="iconArrowDown"></button>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import CountryListItem from '~/components/CountryListItem';
    import iconArrowDown from "~/assets/images/icons/arrow-down.svg?raw";
    import iconArrowUp from "~/assets/images/icons/arrow-up.svg?raw";

    export default {
        components: {
            CountryListItem
        },
        data () {
            return {
                countries: Countries,
                iconArrowDown,
                iconArrowUp
            }
        }
    }
</script>
<style scoped>
.a-button {
    mix-blend-mode: difference
}
.o-hero {
    position: relative;
    background: #332921;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.o-hero p {
    max-width: 30em;
    font-size: var(--font-size-lg)
}

.o-hero div {
    position: absolute;
    color: #fff;
    top: 40%;
    left: var(--grid-column-width);
}


.o-hero h1 {
    font-weight: 900;
    font-size: 10rem;
    color: #fff;
    line-height: .8;
    letter-spacing: 0;
    margin-bottom: 1rem
}

.o-hero__map {
    position: absolute;
    top: 3rem;
    right: var(--grid-column-width);
    bottom: 0;
    left: 10vw;
    background: url("/images/trip-map.svg") no-repeat;
    background-size: contain;
}

.o-hero video {
    filter: saturate(.95) brightness(.6) contrast(.62)
}
</style>