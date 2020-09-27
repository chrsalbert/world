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
    computed: {
        stats() {
            return this.currentDestination.stats
        },
        ...mapGetters({
            currentDestination: 'destination/getCurrentDestination'
        })
    },
    methods: {
        setCurrentDestination() {
            this.$store.commit('destination/SET_CURRENT_DESTINATION', this.$route.params.id)
        }
    },
    watch: {
        '$route' (to, from) {
            this.setCurrentDestination()
        }
    },
    created() {
        this.setCurrentDestination()
    }
}
</script>