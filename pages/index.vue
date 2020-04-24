<template>
    <div class="l-container__section l-container__section--index">
        <div class="o-countries">
            <ListItem v-bind:country="country" v-for="country of countries" :key="country.id" v-bind:class="{ 'l-container__slide--album': isActive(country.id) }" />
        </div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import ListItem from '~/components/ListItem';

    export default {
        transition: {
            duration: 2000,
            name: '',
            mode: ''
        },
        components: {
            ListItem
        },
        data () {
            return {
                countries: Countries
            }
        },
        methods: {
            isActive(id) {
                return id == this.$route.params.countryId
            }
        }
    }
</script>