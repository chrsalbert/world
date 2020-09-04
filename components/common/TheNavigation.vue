<template>
    <div class="c-navigation">
        <nav class="c-navigation__group">
            <app-button href="/" type="ghost" icon="home" />
            <app-button v-on:click.native="toggleSubNav()" tag="button" type="ghost" icon="menu" v-if="!isSubNavVisible" />
            <app-button v-on:click.native="toggleSubNav()" tag="button" type="ghost" icon="cross" v-if="isSubNavVisible" />
        </nav>
        <!-- <transition name="fade">
            <sub-navigation v-show="isSubNavVisible" />
        </transition> -->
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'

    export default {
        data () {
            return {
                isFullscreen: false
            }
        },
        computed: {
            isSubNavVisible() {
                return this.$store.state.navigation.isSubNavVisible
            },
            isAsideVisible() {
                return this.$store.state.gallery.showAside
            },
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
                if(this.$store.state.navigation.isSubNavVisible == true) {
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
    .c-navigation {
        position: relative;
        z-index: 90;
        padding-top: var(--space-md)
    }

    .c-navigation__group {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>