<template>
    <div class="subNav">
        <div>
            <transition name="fade">
                <div class="a-sectionH1">{{ sectionTitle }}</div>
            </transition>
        </div>
        <div>
            <FactsList :facts="facts" mode="display" />
        </div>
        <ol role="navigation">
            <li v-for="(country, index) in countries" :key="index">
                <span v-on:mouseover="showDetails(country.title, country.stats)" v-on:mouseout="showTrip()">
                    <nuxt-link class="a-sectionH2" :to="`/${ country.id }`">{{ country.title }}</nuxt-link>
                </span>
            </li>
        </ol>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import FactsList from '~/components/FactsList';

    export default {
        data () {
            return {
                facts: [],
                sectionTitle: 'Alle Länder',
                countries: Countries
            }
        },
        components: {
            FactsList
        },
        methods: {
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
            showDetails(title, stats) {
                this.facts[0].title = `${this.formatNumber(stats.distance)} km`
                this.facts[1].title = `${this.formatNumber(stats.transportHours)} Std`
                this.facts[2].title = `${this.formatNumber(stats.cities)} Std`
                this.facts[2].sub = `in ${this.formatNumber(stats.days)} Tagen`
                this.sectionTitle = title
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
<style scoped>
    /* .a-sectionH2 {
        font-size: var(--font-size-md);
    }

    nav {
        position: fixed;
        z-index: -1;
        top: 0;
        right: 0;
        left: 0;
        height: 100%;
        padding: var(--header-height) var(--body-pad);
        background: #fff;
    }

    ol { 
        max-width: var(--body-width);
        column-count: 4;
    }

    a.a-sectionH2 {
        display: inline-block;
        padding: var(--space-xs) 0;
        color: var(--color-text-light);
        transition: .1s color linear
    }

    a.a-sectionH2:hover {
        color: var(--color-text)
    }

    @media only screen and (min-width: 901px) {
        .header {
            display: flex;
            border-bottom: 1px var(--color-light) solid;
            padding-bottom: var(--space-lg);
            margin-bottom: var(--space-xl);
        }
        .header > div:first-child {
            width: 18em;
            flex-shrink: 0;
        }
        .a-sectionH1 {
            margin: 0;
        }
    }

    @media only screen and (max-width: 900px) {
        .header > div:last-child {
            display: none
        }
        ol { 
            column-count: 3;
        }
    }

    @media only screen and (max-width: 600px) {
        ol { 
            column-count: 2;
        }
    } */
</style>