<template>
    <div class="container">
        <div class="sidebar">
            <div class="header">
                <h1 class="a-sectionH1"><nuxt-link to="/">{{ title }}</nuxt-link></h1>
            </div>
            <div class="filter">
                <FilterList :locations="locations" @filter="setFilter" />
            </div>
        </div>
        <div class="list">
            <PhotoList v-bind:photos="photos" v-bind:countryId="country.id" v-bind:filter="filter" />
        </div>
    </div>
</template>
<script>
import Countries from '~/static/data/countries.json';
import FilterList from '~/components/FilterList';
import PhotoList from '~/components/PhotoList';

export default {
    transition: {
        mode: ''
    },
    components: {
        FilterList,
        PhotoList
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
    .container {
        position: relative;
        margin: 0 var(--body-pad);
        padding: var(--header-height) 0
    }

    .filter {
        display: none
    }
    @media only screen and (min-width: 900px) {
        .filter {
            display: block;
            width: 100%;
            overflow-y: scroll
        }
        .container {
            min-height: 100vh;
        }
        .sidebar {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: var(--body-pad);
            bottom: 0;
            width: 26rem;
            padding: var(--header-height) var(--space-lg) 0 0
        }
        .list {
            padding-left: 26rem;
        }
    }
</style>