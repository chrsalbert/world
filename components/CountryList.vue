<template>
    <div class="container">
        <div class="section">
            <WelcomeHero />
        </div>
        <div class="section" v-for="(country, index) of countries" :key="index">
            <CountryItem  v-bind:country="country" />
        </div>
        <div class="button-prev">
            <button class="a-button a-button--icon" v-html="iconArrowUp"></button>
        </div>
        <div class="button-next">
            <button class="a-button a-button--icon" v-html="iconArrowDown"></button>
        </div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import WelcomeHero from '~/components/WelcomeHero';
    import CountryItem from '~/components/CountryItem';
    import iconArrowDown from "~/assets/images/icons/arrow-down.svg?raw";
    import iconArrowUp from "~/assets/images/icons/arrow-up.svg?raw";

    export default {
        components: {
            CountryItem,
            WelcomeHero
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
    .container {
        height: 100vh;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
    }

    .section {
        height: inherit;
        scroll-snap-align: start
    }

    .button-next,
    .button-prev {
        position: fixed;
        z-index: 99;
        top: calc(var(--header-height) / 2);
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
    
    .button-next {
        top: auto;
        bottom: calc(var(--header-height) / 2);
        transform: translate3d(-50%, 50%, 0);
    }
</style>