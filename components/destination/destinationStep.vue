<template>
    <span class="c-destination__step">
        {{ currentDestinationStep }} <em>von</em><span>/</span> {{ destinationsCount }}
    </span>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            destinationsCount: 'destination/getDestinationsCount',
            currentDestinationStep: 'destination/getCurrentDestinationStep'
        })
    }
}
</script>
<style scoped>
    .c-destination__step em {
        font-style: italic
    }

    .c-destination__step span {
        display: none
    }

    @media screen and (max-width: 600px) {
        .c-destination__step em {
            display: none
        }

        .c-destination__step span {
            display: inline
        }
    }
</style>