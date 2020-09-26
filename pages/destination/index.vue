<template>
    <layout-destination>
        <template slot="cover">
            <destination-cover :country="currentDestination" />
        </template>
        <template slot="article">
            <destination-article :country="currentDestination" />
        </template>
        <template slot="title">
            <destination-title 
                :title="currentDestination.title" />
        </template>
        <template slot="map">
            <destination-map 
                :places="places" 
                :countries="countries" 
                :destinations="destinations" 
                :currentDestination="currentDestination" 
                :currentDestinationIndex="currentDestinationIndex" />
        </template>
        <template slot="stats">
            <destination-stats :stats="currentDestination.stats" />
        </template>
        <template slot="date">
        </template>
        <template slot="footer">
            <destination-footer 
                :destinations="destinations"
                :currentDestination="currentDestination"
                :currentDestinationIndex="currentDestinationIndex" />
        </template>
    </layout-destination>
</template>
<script>
import destinations from '~/static/data/destinations.json';
import countries from '~/static/data/countries.json';
import places from '~/static/data/places.json';

export default {
    layout: 'destination',
    asyncData () {
        return { destinations, countries, places }
    },
    computed: {
        currentDestination() {
            return this.destinations.filter(destination => destination.id === this.$route.params.id)[0]
        },
        currentDestinationIndex() {
            return this.destinations.findIndex(destination => destination.id == this.currentDestination.id)
        }
    },
    methods: {
        updateCurrentDestination() {
            this.$store.commit('destination/SET_CURRENT_DESTINATION', this.currentDestination)
            this.$store.commit('destination/SET_CURRENT_DESTINATION_INDEX', this.currentDestinationIndex)
        }
    },
    beforeUpdate() {
        this.updateCurrentDestination()
    },
    beforeMount() {
        this.updateCurrentDestination()
    }
}
</script>