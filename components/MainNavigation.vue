<template>
    <div>
        <div v-if="isDefault" class="m-mainNav">
            <div>
                <nuxt-link to="/" class="a-button a-button--icon"><img src="/icons/home.svg"></nuxt-link>
                <button v-on:click="toggleSubNav()" class="a-button a-button--icon"><img src="/icons/menu.svg" v-if="!showSubnav"><img src="/icons/cross.svg" v-if="showSubnav"></button>
            </div>
        </div>
        <div v-if="isGallery" class="m-mainNav">
            <nuxt-link :to="`/${$route.params.countryId}`" class="a-button a-button--icon"><img src="/icons/cross.svg"></nuxt-link>
            <div>
                <button v-on:click="toggleColumns()" class="a-button a-button--icon"><img src="/icons/2col.svg"></button>
                <button v-on:click="toggleColumns()" class="a-button a-button--icon"><img src="/icons/1col.svg"></button>
            </div>
        </div>
        <nav class="m-subNav" v-show="showSubnav">
            <div class="u-row">
                <div class="u-col" style="--span:7">
                    <div class="a-sectionH1">Alle Länder</div>
                    <ul class="m-subNav__sections">
                        <li v-for="(country, index) in countries" :key="index" v-on:mouseover="showDetails(country.title, country.stats)" v-on:mouseout="showTrip()">
                            <nuxt-link class="a-sectionH2" :to="`/${ country.id }`">{{ country.title }}</nuxt-link>
                        </li>
                    </ul>
                </div>
                <div class="u-col" style="--span:4">
                    <div class="a-sectionH1">{{ sectionTitle }}</div>
                    <FactsList :facts="facts" />
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    import FactsList from '~/components/FactsList';

    export default {
        data () {
            return {
                sectionTitle: 'Der Trip',
                facts: []
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
                this.sectionTitle = 'Der Trip'
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