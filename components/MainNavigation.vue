<template>
    <div class="container">
        <nav class="nav">
            <LinkButton href="/" type="transparent" icon="home"></LinkButton>
            <ClickButton v-on:click.native="toggleSubNav()" type="transparent" icon="menu" v-if="!isSubNavVisible"></ClickButton>
            <ClickButton v-on:click.native="toggleSubNav()" type="transparent" icon="cross" v-if="isSubNavVisible"></ClickButton>
        </nav>
        <transition name="fade">
            <SubNavigation v-show="isSubNavVisible" />
        </transition>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    import SubNavigation from '~/components/SubNavigation'
    import LinkButton from '~/components/LinkButton'
    import ClickButton from '~/components/ClickButton'

    export default {
        data () {
            return {
                isFullscreen: false
            }
        },
        components: {
            SubNavigation,
            LinkButton,
            ClickButton
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
        z-index: 2000;
        height: inherit;
        display: flex;
        align-items: center;
        padding: 0 var(--body-pad);
    }

    nav {
        position: relative;
        z-index: 1001;
        display: flex;
        align-items: center;
        margin-left: -.25rem;
        background: var(--color-secondary);
        width: 100%;
        height: 100%;
    }

    nav > * {
        margin-right: var(--space-xs)
    }

    @media only screen and (max-width: 600px) {
        .container {
            padding: 0
        }
    }
</style>