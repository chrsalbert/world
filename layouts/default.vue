<template>
    <div class="u-page">
        <MainNavigation :countries="countries" />
        <nuxt/>
    </div>
</template>
<script>
import Countries from '~/static/data/countries.json';
import MainNavigation from '~/components/MainNavigation';

export default {
    components: {
        MainNavigation
    },
    data () {
        return {
            countries: Countries
        }
    }
}
</script>