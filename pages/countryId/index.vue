<template>
    <div class="l-gallery">
        <div class="l-gallery__aside">
            <div>
                <h1 class="a-sectionH1">{{ title }}</h1>
                <p class="a-subline">Januar 2020</p>
            </div>
            <div class="l-gallery__asideContent">
                <FilterList :locations="locations" @filter="setFilter" />
            </div>
        </div>
        <div class="l-gallery__stream">
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