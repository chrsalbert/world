<template>
    <layout-destination>
        <template slot="cover">
            <destination-cover />
        </template>
        <template slot="article">
            <destination-article />
        </template>
        <template slot="title">
            <destination-title />
        </template>
        <template slot="map">
            <destination-map />
        </template>
        <template slot="stats">
            <destination-stats :stats="stats" />
        </template>
        <template slot="footer">
            <destination-footer />
        </template>
    </layout-destination>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'destination',
    middleware: ['destination'],
    head() {
        return {
            title: `${this.currentDestinationStep}/${this.destinationsCount} – ${this.currentDestination.title} – ON A JOURNEY`
        }
    },
    computed: {
        stats() {
            return this.currentDestination.stats
        },
        ...mapGetters({
            currentDestination: 'destination/getCurrentDestination',
            destinationsCount: 'destination/getDestinationsCount',
            currentDestinationStep: 'destination/getCurrentDestinationStep'
        })
    }
}
</script>