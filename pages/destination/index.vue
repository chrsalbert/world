<template>
    <layout-destination>
        <template slot="cover">
            <destination-cover :country="country" />
        </template>
        <template slot="article">
            <destination-article :country="country" />
        </template>
        <template slot="header">
            <destination-title :countries="countries" :country="country" />
            <destination-map :country="country" />
            <destination-stats :country="country" />
        </template>
        <template slot="date">
            <destination-date :country="country" />
        </template>
        <template slot="prev">
            <app-button icon="arrowLeft" :href="prevCountryUrl"></app-button>
        </template>
        <template slot="next">
            <app-button icon="arrowRight" :href="nextCountryUrl"></app-button>
        </template>
    </layout-destination>
</template>
<script>
import countries from '~/static/data/countries.json';

export default {
    layout: 'destinations',
    asyncData () {
        return { countries }
    },
    computed: {
        country() {
            return this.countries.filter(country => country.id === this.$route.params.id)[0]
        },
        countryIndex() {
            return this.countries.findIndex(country => country.id == this.country.id)
        },
        prevCountryIndex() {
            return this.countryIndex === 0 ? this.countries.length - 1 : this.countryIndex - 1
        },
        nextCountryIndex() {
            return this.countryIndex === (this.countries.length - 1) ? 0 : this.countryIndex + 1
        },
        prevCountryUrl() {
            return `/destination/${this.countries[this.prevCountryIndex].id}`
        },
        nextCountryUrl() {
            return `/destination/${this.countries[this.nextCountryIndex].id}`
        }
    }
}
</script>