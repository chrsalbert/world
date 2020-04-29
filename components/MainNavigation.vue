<template>
    <div>
        <div v-if="isDefault" class="m-mainNav">
            <div>
                <nuxt-link to="/" class="a-button a-button--icon" v-html="iconHome"></nuxt-link>
                <button v-on:click="toggleSubNav()" class="a-button a-button--icon" v-html="iconMenu" v-if="!showSubnav"></button>
                <button v-on:click="toggleSubNav()" class="a-button a-button--icon" v-html="iconCross" v-if="showSubnav"></button>
            </div>
        </div>
        <div v-if="isGallery" class="m-mainNav">
            <nuxt-link :to="`/${$route.params.countryId}`" class="a-button a-button--icon" v-html="iconCross"></nuxt-link>
            <div>
                <button v-on:click="toggleColumns()" class="a-button a-button--icon" v-html="iconOneCol"></button>
                <button v-on:click="toggleColumns()" class="a-button a-button--icon" v-html="iconTwoCol"></button>
            </div>
        </div>
        <nav class="m-subNav" v-show="showSubnav">
            <div style="display:flex;">
                <div class="m-subNav__headline">
                    <div class="a-sectionH1">{{ sectionTitle }}</div>
                </div>
                <div class="m-subNav__facts">
                    <FactsList :facts="facts" classes="m-facts--x" />
                </div>
            </div>
            <ul class="m-subNav__sections">
                <li v-for="(country, index) in countries" :key="index" v-on:mouseover="showDetails(country.title, country.stats)" v-on:mouseout="showTrip()">
                    <nuxt-link class="a-sectionH2" :to="`/${ country.id }`">{{ country.title }}</nuxt-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    import FactsList from '~/components/FactsList';
    import iconHome from "~/assets/images/icons/home.svg?raw";
    import iconMenu from "~/assets/images/icons/menu.svg?raw";
    import iconCross from "~/assets/images/icons/cross.svg?raw";
    import iconOneCol from "~/assets/images/icons/1col.svg?raw";
    import iconTwoCol from "~/assets/images/icons/2col.svg?raw";

    export default {
        data () {
            return {
                sectionTitle: 'Alle Länder',
                facts: [],
                iconMenu,
                iconHome,
                iconCross,
                iconOneCol,
                iconTwoCol
            }
        },
        components: {
            FactsList
        },
        props: {
            countries: Array
        },
        computed: {
            showSubnav() {
                return this.$store.state.navigation.showSubNav
            },
            isGallery() {
                return this.$store.state.navigation.currentNav == 'gallery'
            },
            isDefault() {
                return this.$store.state.navigation.currentNav == 'default'
            }
        },
        methods: {
            toggleSubNav() {
                if(this.$store.state.navigation.showSubNav == true) {
                    this.$store.commit('navigation/showSubNav', false)
                } else {
                    this.$store.commit('navigation/showSubNav', true)
                }
            },
            toggleColumns() {
                if(this.$store.state.gallery.showAside == true) {
                    this.$store.commit('gallery/showAside', false)
                } else {
                    this.$store.commit('gallery/showAside', true)
                }
            },
            showDetails(title, stats) {
                this.facts[0].title = `${this.formatNumber(stats.distance)} km`
                this.facts[1].title = `${this.formatNumber(stats.transportHours)} Std`
                this.facts[2].title = `${this.formatNumber(stats.cities)} Std`
                this.facts[2].sub = `in ${this.formatNumber(stats.days)} Tagen`
                this.sectionTitle = title
            },
            showTrip() {
                this.sectionTitle = 'Alle Länder'
                this.facts = [
                    {
                        icon: 'card',
                        title: `10.000 km`,
                        sub: 'gefahren'
                    }, {
                        icon: 'headphones',
                        title: `30 Std.`,
                        sub: 'in Bus & Bahn'
                    }, {
                        icon: 'location',
                        title: `3 Orte`,
                        sub: 'in 14 Tagen'
                    }
                ]
            },
            formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
        },
        mounted() {
            this.showTrip()
        }
    }
</script>