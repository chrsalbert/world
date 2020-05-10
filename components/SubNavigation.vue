<template>
    <div class="subnavigation">
        <div class="body">
            <h2 class="a-sectionH2">Alle Stopps</h2>
            <ol class="nav" role="navigation">
                <li v-for="(country, index) in countries" :key="index">
                    <nuxt-link class="a-sectionH2" :to="`/journey/${ country.id }`">{{ country.title }}</nuxt-link>
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';

    export default {
        data () {
            return {
                countries: Countries
            }
        }
    }
</script>
<style scoped>
    h2 {
        margin: var(--space-lg) 0 var(--space-md)
    }
    
    .subnavigation {
        position: absolute;
        z-index: 1000;
        top: 100%;
        right: 0;
        left: 0;
        background: var(--color-secondary);
        padding: 0 var(--body-pad);
        height: calc(100vh - 80px);
        overflow-y: scroll;
    }

    .nav {
        column-count: 5;
        padding-left: 1rem;
        list-style-type: decimal;
    }

    .nav li {
        margin-bottom: var(--space-sm)
    }

    .body {
        max-width: var(--body-width)
    }
</style>