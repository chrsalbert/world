<template>
    <header>
        <nav v-if="isCurrentContext('default')">
            <div>
                <nuxt-link to="/" class="a-button a-button--icon" v-html="iconHome"></nuxt-link>
                <button v-on:click="toggleSubNav()" class="a-button a-button--icon" v-html="iconMenu" v-if="!isSubNavVisible"></button>
                <button v-on:click="toggleSubNav()" class="a-button a-button--icon" v-html="iconCross" v-if="isSubNavVisible"></button>
            </div>
        </nav>
        <nav v-if="isCurrentContext('gallery')">
            <nuxt-link :to="`/${$route.params.countryId}`" class="a-button a-button--icon" v-html="iconCross"></nuxt-link>
            <div>
                <button v-on:click="toggleColumns()" class="a-button a-button--icon" v-html="iconOneCol"></button>
                <button v-on:click="toggleColumns()" class="a-button a-button--icon" v-html="iconTwoCol"></button>
            </div>
        </nav>
        <SubNavigation v-show="isSubNavVisible" />
    </header>
</template>
<script>
    import { mapMutations } from 'vuex'
    import SubNavigation from '~/components/SubNavigation';
    import iconHome from "~/assets/images/icons/home.svg?raw";
    import iconMenu from "~/assets/images/icons/menu.svg?raw";
    import iconCross from "~/assets/images/icons/cross.svg?raw";
    import iconOneCol from "~/assets/images/icons/1col.svg?raw";
    import iconTwoCol from "~/assets/images/icons/2col.svg?raw";

    export default {
        data () {
            return {
                iconMenu,
                iconHome,
                iconCross,
                iconOneCol,
                iconTwoCol
            }
        },
        components: {
            SubNavigation
        },
        computed: {
            isSubNavVisible() {
                return this.$store.state.navigation.isSubNavVisible
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
            }
        }
    }
</script>
<style scoped>
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        height: var(--header-height);
        padding-left: var(--body-pad);
        margin-left: -.5rem;
    }

    nav {
        height: inherit;
        display: flex;
        align-items: center;
    }

    nav > * {
        margin-right: var(--space-md)
    }
</style>