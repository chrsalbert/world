<template>
    <div id="scroll-container" class="l-slider">
        <div class="l-slider__section" v-for="country of countries" :key="country.id">
            <CountryListItem  v-bind:country="country" />
        </div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import CountryListItem from '~/components/CountryListItem';

    export default {
        layout: 'blank',
        components: {
            CountryListItem
        },
        data () {
            return {
                countries: Countries
            }
        }
    }
</script>