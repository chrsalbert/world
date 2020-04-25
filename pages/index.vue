<template>
    <div class="l-container__section l-container__section--index">
        <div class="o-countries">
            <CountryList v-bind:country="country" v-for="country of countries" :key="country.id" />
        </div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import CountryList from '~/components/CountryList';

    export default {
        components: {
            CountryList
        },
        data () {
            return {
                countries: Countries
            }
        }
    }
</script>