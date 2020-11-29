<template>
    <div class="c-destination__nav">
        <div class="c-destination__nav__date">
            <destination-date />
        </div>
        <div class="c-destination__nav__controls">
            <app-button :href="prevDestinationUrl" icon="arrowLeft" />
            <app-button href="/" type="secondary" icon="home" />
            <app-button v-on:click.native="toggleMenu()" tag="button" type="secondary" icon="route" aria-label="Routen-Menü öffnen" v-if="!showMenu" />
            <app-button v-on:click.native="toggleMenu()" tag="button" type="secondary" icon="cross" aria-label="Routen-Menü schließen" v-if="showMenu" />
            <app-button :href="nextDestinationUrl" icon="arrowRight" />
        </div>
        <div class="c-destination__nav__step">
            <destination-step />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            showMenu: 'navigation/showMenu',
            destinations: 'destination/getDestinations',
            currentDestination: 'destination/getCurrentDestination',
            currentDestinationIndex: 'destination/getCurrentDestinationIndex',
            prevDestinationIndex: 'destination/getPrevDestinationIndex',
            nextDestinationIndex: 'destination/getNextDestinationIndex',
            prevDestinationUrl: 'destination/getPrevDestinationUrl',
            nextDestinationUrl: 'destination/getNextDestinationUrl'
        })
    },
    methods: {
        ...mapActions({
            toggleMenu: 'navigation/toggleMenu'
        })
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
<style scoped>
.c-destination__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--body-width);
    margin: 0 auto;
    padding: var(--space-xs) var(--space-md);
}

.c-destination__nav__controls {
    display: flex;
}

.c-destination__nav__controls > *:not(:last-child) {
    margin-right: var(--space-xs)
}

.c-destination__nav__date,
.c-destination__nav__step {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-gray)
}

.c-destination__nav__step {
    text-align: right
}
</style>