<template>
    <div class="container">
        <nav class="nav">
            <nuxt-link to="/" class="a-button a-button--icon a-button--transparent" v-html="iconHome"></nuxt-link>
            <button v-on:click="toggleSubNav()" class="a-button a-button--icon a-button--transparent" v-html="iconMenu" v-if="!isSubNavVisible"></button>
            <button v-on:click="toggleSubNav()" class="a-button a-button--icon a-button--transparent" v-html="iconCross" v-if="isSubNavVisible"></button>
        </nav>
        <SubNavigation v-show="isSubNavVisible" />
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    import SubNavigation from '~/components/SubNavigation'
    import iconHome from "~/assets/images/icons/home.svg?raw"
    import iconMenu from "~/assets/images/icons/menu.svg?raw"
    import iconCross from "~/assets/images/icons/cross.svg?raw"

    export default {
        data () {
            return {
                iconMenu,
                iconHome,
                iconCross,
                isFullscreen: false
            }
        },
        components: {
            SubNavigation
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
    .container {
        position: relative;
        z-index: 10000;
        height: inherit;
        display: flex;
        align-items: center;
        padding: 0 var(--body-pad);
    }

    nav {
        display: flex;
        align-items: center;
        margin-left: -.25rem
    }
</style>