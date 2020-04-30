<template>
    <div class="container">
        <aside>
            <div>
                <h1 class="a-sectionH1">{{ title }}</h1>
            </div>
            <div class="filter">
                <FilterList :locations="locations" @filter="setFilter" />
            </div>
        </aside>
        <main>
            <PhotoList v-bind:photos="photos" v-bind:countryId="country.id" v-bind:filter="filter" />
        </main>
    </div>
</template>
<script>
import Countries from '~/static/data/countries.json';
import FilterList from '~/components/FilterList';
import PhotoList from '~/components/PhotoList';

export default {
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
        margin: 0 var(--body-pad)
    }

    aside {
        padding: var(--header-height) 0 0 0;
    }

    .filter {
        height: 100px;
        overflow-y: scroll
    }

    @media only screen and (min-width: 600px) {
        .container {
            min-height: 100vh;
        }

        aside {
            position: fixed;
            display: flex;
            flex-direction: column;
            top: var(--header-height);
            left: var(--body-pad);
            bottom: 0;
            width: var(--grid-col4);
            padding: 0;
        }

        .filter {
            flex: 1
        }

        main {
            padding: var(--header-height) 0 var(--header-height) var(--grid-col5);
        }
    }

    @media only screen and (max-width: 600px) {
        .filter {
            display: none
        }
    }
</style>