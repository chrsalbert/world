<template>
    <div class="grid">
        <div class="grid__date">
            <transition name="date">
                <span class="date" v-html="country.date.title" :key="country.date.title"></span>
            </transition>
        </div>
        <div class="grid__cover">      
            <transition name="cover">
                <div class="cover" :key="coverURL" :style="`background-image: url('${coverURL}')`"></div>
            </transition>
        </div>
        <div class="grid__article" >
            <div class="article">
                <transition name="article__text" mode="out-in">
                    <p class="article__text" :key="country.teaser">{{ country.teaser }}</p>
                </transition>
            </div>
        </div>
        <div class="grid__main">
            <div class="main">
                <transition name="title" mode="out-in">
                    <h1 class="title" :data-position="step" :key="country.title">{{ country.title }}</h1>
                </transition>
                <div class="facts">
                    <FactsList :facts="facts" />
                </div>
                <transition name="map" mode="out-in">
                    <CountryMap class="map" :map="country.map" :key="country.title" />
                </transition>
            </div>
        </div>
        <div class="grid__progress">
            <progress class="progress" :value="progress" max="100">{{ progress }}</progress>
        </div>
        <div class="grid__button"><nuxt-link id="button-prev" :to="prevCountryUrl" class="a-button a-button--icon" v-html="iconArrowLeft"></nuxt-link></div>
        <div class="grid__button grid__button--right"><nuxt-link id="button-next" :to="nextCountryUrl" class="a-button a-button--icon" v-html="iconArrowRight"></nuxt-link></div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import FactsList from "~/components/FactsList.vue";
    import CountryMap from "~/components/CountryMap.vue";
    import iconArrowLeft from "~/assets/images/icons/arrow-left.svg?raw";
    import iconArrowRight from "~/assets/images/icons/arrow-right.svg?raw";

    export default {
        transition: {
            duration: '600'
        },
        components: {
            FactsList,
            CountryMap
        },
        data () {
            return {
                iconArrowLeft,
                iconArrowRight
            }
        },
        computed: {
            country() {
                return Countries.find(obj => obj.id == this.$store.state.journey.id)
            },
            countryIndex() {
                return Countries.findIndex(obj => obj.id == this.country.id)
            },
            prevCountryIndex() {
                return this.countryIndex === 0 ? Countries.length - 1 : this.countryIndex - 1
            },
            nextCountryIndex() {
                return this.countryIndex === (Countries.length - 1) ? 0 : this.countryIndex + 1
            },
            prevCountryUrl() {
                return `/journey/${Countries[this.prevCountryIndex].id}`
            },
            nextCountryUrl() {
                return `/journey/${Countries[this.nextCountryIndex].id}`
            },
            progress() {
                return Math.round((100/Countries.length) * (this.countryIndex + 1))
            },
            step() {
                let index = this.countryIndex
                index++
                return index < 10 ?  `0${index}` : index
            },
            coverURL() {
                return `${process.env.imageUrl}/cover/${this.country.cover}`
            },
            facts() {
                return  [
                    {
                        icon: 'card',
                        title: `${this.formatNumber(this.country.stats.distance)} km`,
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
            preloadPhotos() {
                let images = [
                    Countries[this.nextCountryIndex].cover,
                    Countries[this.prevCountryIndex].cover
                ]
                images.forEach((image) => {
                    let img = new Image()
                    img.src = `${process.env.imageUrl}/cover/${image}`
                })
            },
            formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
        },
        mounted() {
            this.preloadPhotos()

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
        },
        updated() {
            this.preloadPhotos()
        }
    }
</script>
<style scoped>
    .grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 1fr 40px 24px 16px;
        grid-column-gap: var(--grid-row-gap);
        grid-row-gap: 0;
        --timing-function: cubic-bezier(.53,.23,.4,.99)
    }

    .grid__date {
        position: relative;
        grid-area: 1 / 1 / 2 / 3;
    }

    .date {
        position: absolute;
        top: 0;
        left: var(--space-md);
        text-transform: uppercase;
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        transition: all .3s var(--timing-function);
    }

    .date-enter { transform: rotate(180deg) translateX(-1rem);opacity: 0 }
    .date-enter-to { transform: rotate(180deg) translateX(0);opacity: 1 }
    .date-leave { transform: rotate(180deg) translateX(0);opacity: 1 }
    .date-leave-to { transform: rotate(180deg) translateX(1rem);opacity: 0 }

    .grid__cover {
        grid-area: 1 / 2 / 2 / 8;
        position: relative;
    }

    .cover {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-size: cover;
        background-position: 50% 50%;
        box-shadow: var(--shadow-lg);
        border-radius: var(--border-radius);
        transition: all .4s var(--timing-function);
    }

    .cover-enter-active { z-index: 1 }
    .cover-enter { opacity: 0 }
    .cover-enter-to { opacity: 1 }
    .cover-leave { opacity: 1 }
    .cover-leave-to { opacity: 0 }

    .grid__article {
        position: relative;
        z-index: 1;
        grid-area: 1 / 1 / 3 / 5;
        display: flex;
        align-items: flex-end;
    }

    .article {
        position: relative;
        background: var(--color-secondary);
        padding: var(--space-md);
        box-shadow: var(--shadow-xl);
        border-radius: var(--border-radius-sm);
        overflow: hidden;
        max-height: 12rem;
        overflow-y: scroll;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
    }

    .article__text {
        transition: all .3s var(--timing-function)
    }

    .article__text-enter { transform: translateX(5rem);opacity: 0 }
    .article__text-enter-to { transform: translateX(0);opacity: 1 }
    .article__text-leave { transform: translateX(0);opacity: 1 }
    .article__text-leave-to { transform: translateX(-5rem);opacity: 0 }

    .article::-webkit-scrollbar { width: .5rem }
    .article::-webkit-scrollbar-track { background: #131a29 }
    .article::-webkit-scrollbar-thumb { background: #1b4361 }
    .article::-webkit-scrollbar-thumb:hover { background: #1b4361 }

    .grid__article::after {
        content: '';
        position: absolute;
        right: var(--space-md);
        bottom: 0;
        left: var(--space-md);
        height: var(--space-md);
        background: linear-gradient(to bottom, rgba(21, 30, 48, 0) 0%, rgba(21, 30, 48, 1) 90%)
    }

    .grid__main {
        position: relative;
        z-index: 1;
        grid-area: 1 / 8 / 2 / 13;
        min-height: 0;
        overflow: hidden;
        text-align: center;
        padding: var(--space-md)
    }

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    .title {
        position: relative;
        padding: var(--space-md) 0 var(--space-xl);
        transition: all .3s var(--timing-function)
    }

    .title::before {
        z-index: -1;
        position: absolute;
        font-size: 2.5em;
        font-weight: 600;
        margin-left: -.5em;
        content: attr(data-position);
        opacity: .1;
        transition: all .3s var(--timing-function)
    }

    .title-leave { transform: translateX(0);opacity: 1 }
    .title-leave-to { transform: translateX(-8rem);opacity: 0 }
    .title-leave::before { transform: translateX(0);opacity: .1 }
    .title-leave-to::before { transform: translateX(4rem);opacity: 0 }
    .title-enter { transform: translateX(8rem);opacity: 0 }
    .title-enter-to { transform: translateX(0);opacity: 1 }
    .title-enter::before { transform: translateX(-4rem);opacity: 0 }
    .title-enter-to::before { transform: translateX(0);opacity: .1 }

    .facts {
        margin-bottom: var(--space-lg)
    }

    .grid__button {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1000;
        grid-area: 1 / 1 / 2 / 2;
    }

    .grid__button--right {
        grid-area: 1 / 12 / 2 / 13;
        justify-content: flex-end;
    }

    .grid__progress {
        grid-area: 5 / 1 / 5 / 13;
        min-height: 0;
        overflow: hidden
    }

    .progress {
        width: 100%;
        height: 8px;
        -webkit-appearance: none;
        appearance: none;
    }

    .progress[value]::-webkit-progress-bar {
        background-color: transparent;
    }

    .progress[value]::-webkit-progress-value {
        transition: width .3s var(--timing-function);
        background-color: var(--color-primary);
    }

    @media only screen and (max-width: 1100px) and (orientation: portrait) {
        .grid {
            grid-template-rows: 80px 1fr 1fr 16px;
        }
        .grid__cover {
            grid-area: 2 / 2 / 2 / 11;
        }
        .grid__article {
            grid-area: 3 / 1 / 4 / 6;
            align-items: start;
            padding: 80px var(--space-md) 0;
        }
        .article {
            box-shadow: none;
            padding: 0
        }
        .grid__main {
            grid-area: 3 / 6 / 3 / 13;
            background: var(--color-secondary);
            margin-top: -80px;
        }
    }

    @media only screen and (max-width: 600px) {
        .grid {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: 56px min-content min-content min-content;
            height: auto;
            min-height: 100vh;
            padding-bottom: var(--space-xl)
        }

        .grid__main {
            grid-area: 3 / 1 / 4 / 7;
            margin: 0;
        }

        .grid__main svg {
            width: auto;
            height: auto
        }

        .grid__date {
            grid-area: 3 / 1 / 4 / 2;
            padding: var(--space-md) 0 0 0;
        }

        .grid__article {
            grid-area: 4 / 1 / 5 / 7;
            padding: 0 var(--space-md);
        }

        .grid__button {
            grid-area: 2 / 1 / 3 / 2
        }

        .grid__button--right {
            grid-area: 2 / 6 / 3 / 7
        }

        .grid__progress {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
        }

        .grid__nav {
            grid-area: 1 / 1 / 2 / 7;
            padding: 0;
        }

        .grid__cover {
            grid-area: 2 / 1 / 3 / 7;
            height: 30vh;
        }
    }
</style>
<style>
    .map-enter-active, .map-leave-active { transition: all .4s var(--timing-function) .05s }
    
    .map-leave-active #route { transition-duration: .2s;transition-delay: .05s }
    .map-leave-active circle { transition-duration: .15s;transition-delay: .1s }
    .map-leave-active #border { transition-duration: .25s;transition-delay: .15s }

    .map-enter-active #border { transition-duration: .3s;transition-delay: .05s }
    .map-enter-active circle { transition-duration: .15s;transition-delay: .1s }
    .map-enter-active #route { transition-duration: .25s;transition-delay: .15s }

    .map-enter #border, .map-enter #route { stroke-dasharray: var(--length);stroke-dashoffset: var(--length);opacity: .3 }
    .map-enter-to #border, .map-enter-to #route { stroke-dasharray: var(--length);stroke-dashoffset: 0;opacity: 1}
    .map-leave #border, .map-leave #route { stroke-dasharray: var(--length);stroke-dashoffset: 0;opacity: 1 }
    .map-leave-to #border, .map-leave-to #route { stroke-dasharray: var(--length);stroke-dashoffset: calc(var(--length) * -1);opacity: .3 }

    .map-enter circle { opacity: 0;r: 0 }
    .map-enter-to circle { opacity: 1;r: 8 }
    .map-leave circle { opacity: 1;r: 8 }
    .map-leave-to circle { opacity: 0;r: 0 }
</style>