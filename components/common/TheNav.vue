<template>
    <div>
        <div class="c-nav">
            <nav class="c-nav__group">
                <app-button href="/" type="secondary" icon="home" />
                <app-button v-on:click.native="toggleSubNav()" tag="button" type="secondary" icon="menu" v-if="!isMenuVisible" />
                <app-button v-on:click.native="toggleSubNav()" tag="button" type="secondary" icon="cross" v-if="isMenuVisible" />
            </nav>
        </div>
        <the-menu 
            v-show="isMenuVisible"
            :places="places" 
            :countries="countries" 
            :destinations="destinations" 
            :currentDestination="currentDestination" 
            :currentDestinationIndex="currentDestinationIndex" />
    </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    props: {
        countries: {
            type: Array,
            required: true
        },
        places: {
            type: Array,
            required: true
        },
        destinations: {
            type: Array,
            required: true
        },
        currentDestination: {
            type: Object,
            required: true
        },
        currentDestinationIndex: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            isFullscreen: false,
            isMenuVisible: false
        }
    },
    computed: {
        isMobileDevice() {
            if (process.client) {
                return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
            }
        }
    },
    methods: {
        isCurrentContext(context) {
            return this.$store.state.navigation.context == context
        },
        toggleSubNav() {
            if(this.$store.state.navigation.isMenuVisible == true) {
                this.$store.commit('navigation/toggleSubNav', false)
            } else {
                this.$store.commit('navigation/toggleSubNav', true)
            }
        },
        toggleColumns() {
            if(this.$store.state.gallery.showAside == true) {
                this.$store.commit('gallery/showAside', false)
            } else {
                this.$store.commit('gallery/showAside', true)
            }
        },
        toggleFullscreen() {
            this.isFullscreen == true ? this.closeFullscreen() : this.openFullscreen()
            this.isFullscreen = !this.isFullscreen
        },
        openFullscreen() {
            var elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { 
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        },
        closeFullscreen() {
            var elem = document.documentElement;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { 
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
}
</script>
<style scoped>
    .c-nav {
        position: relative;
        z-index: 90;
    }

    .c-nav__group {
        display: flex;
        flex-direction: column;
    }

    .c-nav__group > * {
        margin-bottom: var(--space-xs)
    }
</style>