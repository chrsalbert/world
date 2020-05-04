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
                <transition name="cover">
                    <div class="cover u-ghost" :key="title" :style="`--duration: .3s;--delay: .2s;background-image: url('${coverURL}')`">
                    </div>
                </transition>
            </div>
            <div class="grid__article">
                <div class="article u-ghost" style="--duration: .3s;--delay: .4s;">
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
            <div class="grid__progress">
                <progress class="progress" :value="progress" max="100"> {{ progress }} </progress>
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
            countriesLength() {
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
                const index = this.countryIndex === 0 ? this.countriesLength - 1 : this.countryIndex - 1
                return `/journey/${Countries[index].id}`
            },
            nextCountryUrl() {
                const index = this.countryIndex === (this.countriesLength - 1) ? 0 : this.countryIndex + 1
                return `/journey/${Countries[index].id}`
            },
            progress() {
                return Math.round((100/this.countriesLength) * (this.countryIndex + 1))
            },
            step() {
                let index = this.countryIndex
                index++
                let numbers = index.toString().split('')
                return numbers[1] ? index : `0${index}`
            },
            coverURL() {
                return this.getImageUrl(`cover/${this.country.cover}`)
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
        methods: {
            getImageUrl(path) {
                return `${process.env.imageUrl}${path}`
            },
            preloadNextPhoto() {
                const url = Countries[this.countryIndex + 1].cover
                let img = new Image();
                img.src = this.getImageUrl(`cover/${url}?w=1000&h=800&quality=80&f=auto`);
            }
        },
        mounted() {
            this.preloadNextPhoto()

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
        grid-template-rows: 80px 1fr 40px 24px 16px;
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
        position: relative;
        grid-area: 2 / 2 / 2 / 8;
        min-height: 0;
    }

    .cover {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-size: cover;
        background-position: 50% 50%;
        box-shadow: var(--shadow-lg)
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
        box-shadow: var(--shadow-xl);
        overflow: hidden
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

    .grid__progress {
        grid-area: 5 / 1 / 6 / 14;
    }

    .progress {
        width: 100%;
        height: 8px;
        margin-bottom: 11px;
        -webkit-appearance: none;
        appearance: none;
    }

    .progress[value]::-webkit-progress-bar {
        background-color: transparent;
    }

    .progress[value]::-webkit-progress-value {
        transition: all .3s cubic-bezier(.53,.23,.4,.99);
        background-color: var(--color-primary);
    }

    @media only screen and (max-width: 900px) {
        .grid {
            display: flex;
            flex-direction: column;
        }

        .grid__main {
            order: 1;
        }

        .grid__date {
            display: none
        }

        .grid__article {
            order: 2
        }

        .grid__button {
            order: 5
        }

        .grid__progress {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
        }

        .grid__nav {
            height: 4rem;
            order: 1;
        }

        .grid__cover {
            order: 4;
            height: 30vh
        }
    }
</style>
<style>
    #l-journey .facts {
        margin-bottom: var(--space-lg)
    }
</style>