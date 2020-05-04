<template>
    <div id="l-journey" class="u-scrollContainer">
        <div class="grid">
            <div class="grid__nav">
                <MainNavigation />
            </div>  
            <div class="grid__date">
                <div class="u-ghost" style="--duration: .3s;">
                    <span class="date">{{ country.date.title }}</span>
                </div>
            </div>
            <div class="grid__cover">      
                <transition name="cover" mode="out-in">
                    <div class="cover u-ghost" :key="title" :style="`--duration: .3s;--delay: .2s;background-image: url('${coverURL}')`">
                    </div>
                </transition>
            </div>
            <div class="grid__article">
                <div class="article u-ghost" style="--duration: .3s;--delay: .4s">
                    <transition name="article" mode="out-in"><p :key="title">{{ teaser }}</p></transition>
                </div>
            </div>
            <div class="grid__main">
                <div class="u-ghost" style="--duration: .6s;--delay:.6s">
                    <transition name="title" mode="out-in">
                        <h1 :key="title" :data-position="step">{{ title }}</h1>
                    </transition>
                    <FactsList :facts="facts" />
                    <transition name="map" mode="out-in">
                        <CountryMap :map="map" :key="title" />
                    </transition>
                    <nuxt-child />
                </div>
            </div>
            <div class="grid__button"><nuxt-link id="button-prev" :to="prevCountryUrl" class="a-button a-button--icon" v-html="iconArrowLeft"></nuxt-link></div>
            <div class="grid__button grid__button--right"><nuxt-link id="button-next" :to="nextCountryUrl" class="a-button a-button--icon" v-html="iconArrowRight"></nuxt-link></div>
        </div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import FactsList from "~/components/FactsList.vue";
    import CountryMap from "~/components/CountryMap.vue";
    import MainNavigation from '~/components/MainNavigation';
    import iconArrowLeft from "~/assets/images/icons/arrow-left.svg?raw";
    import iconArrowRight from "~/assets/images/icons/arrow-right.svg?raw";

    export default {
        components: {
            MainNavigation,
            FactsList,
            CountryMap
        },
        data () {
            return {
                iconArrowLeft,
                iconArrowRight,
            }
        },
        transition: {
            duration: '600'
        },
        computed: {
            countriesCount() {
                return Countries.length
            },
            country() {
                return Countries.find(obj => obj.id == this.$store.state.journey.id)
            },
            countryIndex() {
                return Countries.findIndex(obj => obj.id == this.country.id)
            },
            map() {
                return this.country.map
            },
            title() {
                return this.country.id
            },
            teaser() {
                return this.country.teaser
            },
            prevCountryUrl() {
                const index = this.countryIndex === 0 ? this.countriesCount - 1 : this.countryIndex - 1
                return `/journey/${Countries[index].id}`
            },
            nextCountryUrl() {
                const index = this.countryIndex === (this.countriesCount - 1) ? 0 : this.countryIndex + 1
                return `/journey/${Countries[index].id}`
            },
            step() {
                let index = this.countryIndex
                index++
                let numbers = index.toString().split('')
                return numbers[1] ? index : `0${index}`
            },
            coverURL() {
                return `${process.env.imageUrl}cover/${this.country.cover}`
            },
            facts() {
                return  [
                    {
                        icon: 'card',
                        title: `${this.country.stats.distance} km`,
                        sub: 'gefahren'
                    }, {
                        icon: 'headphones',
                        title: `${this.country.stats.transportHours} Std.`,
                        sub: 'in Bus & Bahn'
                    }, {
                        icon: 'location',
                        title: `${this.country.stats.cities} Orte`,
                        sub: `in ${this.country.stats.days} tagen`
                    }
                ]
            }
        },
        mounted() {
            window.addEventListener('keydown', e => {
                switch (e.keyCode) {
                    case 37:
                        document.getElementById('button-prev').click()
                        break;
                    case 39:
                        document.getElementById('button-next').click()
                        break;
                }
            })
        }
    }
</script>
<style scoped>
    h1 {
        position: relative;
        padding: var(--space-md) 0 var(--space-xl)
    }

    h1::before {
        z-index: -1;
        position: absolute;
        font-size: 2.5em;
        font-weight: 600;
        margin-left: -.5em;
        content: attr(data-position);
        opacity: .1;
    }

    .grid {
        max-width: var(--body-width);
        margin: 0 auto;
        min-height: 100vh;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 80px 1fr repeat(2, 40px);
        grid-column-gap: 16px;
        grid-row-gap: 0px;
    }

    .grid__nav { 
        display: flex;
        align-items: center;
        grid-area: 1 / 1 / 2 / 13; 
        padding-left: var(--space-md)
    }

    .grid__date {
        grid-area: 2 / 1 / 3 / 1;
        padding-left: var(--space-md)
    }

    .date {
        text-transform: uppercase;
        writing-mode: vertical-lr;
        transform: rotate(180deg)
    }

    .grid__cover {
        grid-area: 2 / 2 / 2 / 8;
        min-height: 0;
    }

    .cover {
        height: 100%;
        background-size: cover;
        background-position: 50% 50%;
    }

    .grid__article {
        position: relative;
        z-index: 1;
        grid-area: 2 / 1 / 4 / 5;
        display: flex;
        align-items: flex-end;
        transition: all 1s linear;
    }

    .article {
        background: var(--color-secondary);
        padding: var(--space-md);
    }

    .grid__button {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 3;
        grid-area: 2 / 1 / 3 / 1;
    }

    .grid__button--right {
        grid-area: 2 / 13 / 4 / 14;
    }

    .grid__main {
        position: relative;
        z-index: 1;
        grid-area: 2 / 8 / 2 / 13;
        text-align: center
    }
</style>
<style>
    #l-journey .facts {
        margin-bottom: var(--space-lg)
    }
</style>