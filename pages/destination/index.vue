<template>
    <layout-destination>
        <template slot="cover">
            <destination-cover :country="currentDestination" />
        </template>
        <template slot="article">
            <destination-article :country="currentDestination" />
        </template>
        <template slot="header">
            <destination-title :title="currentDestination.title" :currentDestinationIndex="currentDestinationIndex" />
            <destination-map :places="places" :countries="countries" :destinations="destinations" :currentDestination="currentDestination" />
            <destination-stats :stats="currentDestination.stats" />
        </template>
        <template slot="date">
            <destination-date :country="currentDestination" />
        </template>
        <template slot="prev">
            <app-button icon="arrowLeft" :href="prevDestinationUrl" ref="prev"></app-button>
        </template>
        <template slot="next">
            <app-button icon="arrowRight" :href="nextDestinationUrl" ref="next"></app-button>
        </template>
    </layout-destination>
</template>
<script>
import destinations from '~/static/data/destinations.json';
import countries from '~/static/data/countries.json';
import places from '~/static/data/places.json';

export default {
    layout: 'destinations',
    asyncData () {
        return { destinations, countries, places }
    },
    computed: {
        currentDestination() {
            return this.destinations.filter(destination => destination.id === this.$route.params.id)[0]
        },
        currentDestinationIndex() {
            return this.destinations.findIndex(destination => destination.id == this.currentDestination.id)
        },
        prevDestinationIndex() {
            return this.currentDestinationIndex === 0 ? this.destinations.length - 1 : this.currentDestinationIndex - 1
        },
        nextDestinationIndex() {
            return this.currentDestinationIndex === (this.destinations.length - 1) ? 0 : this.currentDestinationIndex + 1
        },
        prevDestinationUrl() {
            return `/destination/${this.destinations[this.prevDestinationIndex].id}`
        },
        nextDestinationUrl() {
            return `/destination/${this.destinations[this.nextDestinationIndex].id}`
        }
    },
    mounted() {
        window.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 37:
                    this.$router.push({ path: this.prevDestinationUrl })
                    break;
                case 39:
                    this.$router.push({ path: this.nextDestinationUrl })
                    break;
            }
        })
    }
}
</script>