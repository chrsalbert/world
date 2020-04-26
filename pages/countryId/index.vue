<template>
    <div class="l-default l-default--splitScroll">
        <div class="l-default__aside">
            <div>
                <nuxt-link :to="`/`">← Alle Länder</nuxt-link>
                <h1 style="padding-bottom:var(--space-lg)">{{ title }}</h1>
                <FilterList :locations="locations" @filter="setFilter" />
            </div>
        </div>
        <div class="l-default__content">
            <PhotoRoll v-bind:photos="photos" v-bind:countryId="country.id" v-bind:filter="filter" />
        </div>
    </div>
</template>
<script>
import Countries from '~/static/data/countries.json';
import FilterList from '~/components/FilterList';
import PhotoRoll from '~/components/PhotoRoll';

export default {
    components: {
        FilterList,
        PhotoRoll
    },
    async asyncData (context) {
        const data = require(`~/static/data/albums/${context.params.countryId}.json`)
        return { photos: data }
    },
    data () {
        return {
            country: Countries.find(country => country.id == this.$route.params.countryId),
            filter: ''
        }
    },
    computed: {
        title() {
            return this.country.title
        },
        text() {
            return this.country.text
        },
        locations() {
            return [...new Set(this.photos.map(photo => photo.location))]
        }
    },
    methods: {
        setFilter(value) {
            return this.filter = value
        }
    }
}
</script>
<style scoped>
    h1 {
        margin: var(--space-lg) 0 var(--space-md)
    }
</style>