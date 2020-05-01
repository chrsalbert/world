<template>
    <header>
        <nav v-if="isCurrentContext('default')">
            <div>
                <div>
                    <nuxt-link to="/" class="a-button a-button--icon" v-html="iconHome"></nuxt-link>
                    <button v-on:click="toggleSubNav()" class="a-button a-button--icon" v-html="iconMenu" v-if="!isSubNavVisible"></button>
                    <button v-on:click="toggleSubNav()" class="a-button a-button--icon" v-html="iconCross" v-if="isSubNavVisible"></button>
                </div>
            </div>
        </nav>
        <nav v-if="isCurrentContext('gallery')">
            <div>
                <nuxt-link :to="`/${$route.params.countryId}`" class="a-button a-button--icon" v-html="iconCross"></nuxt-link>
                <div>
                    <button v-on:click="toggleColumns()" class="a-button a-button--icon" v-bind:class="{ 'a-button--soft': isAsideVisible }" v-html="iconOneCol"></button>
                    <button v-on:click="toggleColumns()" class="a-button a-button--icon" v-bind:class="{ 'a-button--soft': !isAsideVisible }" v-html="iconTwoCol"></button>
                </div>
            </div>
            <div>
                <button v-on:click="toggleFullscreen()" v-show="!isMobileDevice" class="a-button a-button--icon" v-html="iconExpand"></button>
            </div>
        </nav>
        <SubNavigation v-show="isSubNavVisible" />
    </header>
</template>
<script>
    import { mapMutations } from 'vuex'
    import SubNavigation from '~/components/SubNavigation'
    import iconHome from "~/assets/images/icons/home.svg?raw"
    import iconMenu from "~/assets/images/icons/menu.svg?raw"
    import iconCross from "~/assets/images/icons/cross.svg?raw"
    import iconOneCol from "~/assets/images/icons/1col.svg?raw"
    import iconTwoCol from "~/assets/images/icons/2col.svg?raw"
    import iconExpand from "~/assets/images/icons/expand.svg?raw"

    export default {
        data () {
            return {
                iconMenu,
                iconHome,
                iconCross,
                iconOneCol,
                iconTwoCol,
                iconExpand,
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
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
        height: var(--header-height);
        padding: 0 var(--body-pad);
        margin: 0 -.5rem;
    }

    nav {
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    nav > * {
        display: flex;
    }

    nav > * > *:not(:last-child) {
        margin-right: var(--space-md)
    }
</style>