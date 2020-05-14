<template>
    <div class="grid">
        <div class="grid__title">
            <transition name="title" mode="out-in">
                <h1 class="title" :data-position="step" :key="country.title">{{ country.title }}</h1>
            </transition>
        </div>
        <div class="grid__cover">      
            <transition name="cover">
                <div class="cover" :key="coverURL" :style="`background-image: url('${coverURL}')`"></div>
            </transition>
        </div>
        <div class="grid__date">
            <transition name="date">
                <span class="date" v-html="date" :key="date"></span>
            </transition>
        </div>
        <div class="grid__article" >
            <div class="article">
                <transition name="article__text" mode="out-in">
                    <p class="article__text" :key="country.teaser">{{ country.teaser }}</p>
                </transition>
                <LinkButton id="nextCountryBtn" :href="nextCountryUrl">Nächstes Land</LinkButton>
            </div>
        </div>
        <div class="grid__stats">
            <FactsList :facts="facts" />
        </div>
        <div class="grid__map">
            <transition name="map" mode="out-in">
                <CountryMap class="map" :map="country.map" :key="country.title" />
            </transition>
        </div>
        <div class="grid__progress">
            <progress class="progress" :value="progress" max="100">{{ progress }}</progress>
        </div>
        <div class="grid__button">
            <LinkButton id="button-prev" :href="prevCountryUrl" icon="arrowLeft"></LinkButton>
        </div>
        <div class="grid__button grid__button--right">
            <LinkButton id="button-next" :href="nextCountryUrl" icon="arrowRight"></LinkButton>
        </div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import FactsList from "~/components/FactsList.vue";
    import CountryMap from "~/components/CountryMap.vue";
    import LinkButton from '~/components/LinkButton'

    export default {
        head () {
            return {
                title: `${this.country.title} ${this.formateDate(this.country.date.from, this.country.date.to, '/')} – ON A JOURNEY`,
                meta: [
                    { hid: 'description', name: 'description', content: 'Dokumentation meiner Reise in den Osten vom Mai 2019 bis März 2020. Ein Lern-Projekt für Nuxt.js.' }
                ]
            }
        },
        components: {
            FactsList,
            CountryMap,
            LinkButton
        },
        computed: {
            date() {
                return this.formateDate(this.country.date.from, this.country.date.to)
            },
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
                return `${process.env.imageUrl}/cover/${this.country.cover}?quality=80&f=auto`
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
                    img.src = `${process.env.imageUrl}/cover/${image}?quality=80&f=auto`
                })
            },
            formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            },
            formateDate(from, to, dash = '&thinsp;/&thinsp;') {
                const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
                const dates = [from, to]
                const newDates = []
                dates.forEach((date) => {
                    var date = date.split('.')
                    const dateEN = `${date[1]}/${date[0]}/${date[2]}`
                    const month = months[new Date(dateEN).getMonth()]
                    const newDate = `${month} ${date[2]}`
                    newDates.push(newDate)
                })
                var newDate = newDates[0]
                if(newDates[0] != newDates[1]) {
                    newDate = newDate.concat(dash)
                    newDate = newDate.concat(newDates[1])
                }
                return newDate
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
        grid-template-rows: 1fr 1fr min-content 40px 40px;
        grid-column-gap: var(--grid-column-gap);
        grid-row-gap: 0;
        --timing-function: cubic-bezier(.3,1.01,.56,.96)
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
        transition: all .2s var(--timing-function) .4s;
        color: var(--color-text-light)
    }

    .date-enter { transform: rotate(180deg) translateX(-1rem);opacity: 0 }
    .date-enter-to { transform: rotate(180deg) translateX(0);opacity: 1 }
    .date-leave { transform: rotate(180deg) translateX(0);opacity: 1 }
    .date-leave-to { transform: rotate(180deg) translateX(1rem);opacity: 0 }

    .grid__cover {
        grid-area: 1 / 2 / 4 / 8;
        position: relative;
        border-radius: var(--border-radius);
        overflow: hidden
    }

    .cover {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        background-size: cover;
        background-position: 50% 50%;
        box-shadow: var(--shadow);
        transition: all .4s var(--timing-function);
        transition-delay: .2s
    }

    .cover-leave-active { transition-duration: .6s; }
    .cover-leave { opacity: 1 }
    .cover-leave-to { opacity: 0;left: -100% }
    .cover-enter-active { z-index: 1 }
    .cover-enter { opacity: 0;left: 100% }
    .cover-enter-to { opacity: 1;left: 0 }

    .grid__article {
        grid-area: 1 / 1 / 5 / 5;
        display: flex;
        align-items: flex-end;
    }

    .article {
        position: relative;
        z-index: 4;
        background: var(--color-secondary);
        padding: var(--space-md);
        box-shadow: var(--shadow-lg);
        border-radius: var(--border-radius-sm);
        overflow: hidden;
        max-height: 12rem;
        overflow-y: scroll;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        transition: max-height .6s var(--timing-function);
    }

    .article::after {
        content: '';
        position: absolute;
        right: var(--space-md);
        bottom: 0;
        left: var(--space-md);
        height: var(--space-md);
        pointer-events: none;
        background: linear-gradient(to bottom, rgba(21, 30, 48, 0) 0%, rgba(21, 30, 48, 1) 90%)
    }

    .article:hover {
        max-height: 100%;
    }

    .article__text {
        transition: all .3s var(--timing-function)
    }

    .article__text-enter { transform: translateX(1em);opacity: 0 }
    .article__text-enter-to { transform: translateX(0);opacity: 1 }
    .article__text-leave-active { transition-delay: .25s }
    .article__text-leave { transform: translateX(0);opacity: 1 }
    .article__text-leave-to { transform: translateX(-1em);opacity: 0 }

    /* .article::-webkit-scrollbar { width: .5rem }
    .article::-webkit-scrollbar-track { background: #131a29 }
    .article::-webkit-scrollbar-thumb { background: #1b4361 }
    .article::-webkit-scrollbar-thumb:hover { background: #1b4361 } */

    .grid__title {
        grid-area: 1 / 8 / 2 / 13;
        text-align: center;
    }

    .title {
        position: relative;
        z-index: 1;
        margin: var(--space-xl) 0;
        padding-left: 1em;
        transition: all .2s var(--timing-function)
    }

    .title::before {
        z-index: -1;
        position: absolute;
        font-size: 2.5em;
        font-weight: 600;
        margin-left: -.5em;
        content: attr(data-position);
        opacity: .1;
        transition: all .2s var(--timing-function)
    }

    .title-leave { transform: translateX(0);opacity: 1 }
    .title-leave-to { transform: translateX(-2em);opacity: 0 }
    .title-enter { transform: translateX(2em);opacity: 0 }
    .title-enter-to { transform: translateX(0);opacity: 1 }
    .title-leave::before { transform: translateX(0) scale(1);opacity: .1 }
    .title-leave-to::before { transform: translateX(-.25em) scale(.8);opacity: 0 }
    .title-enter::before { transform: translateX(.25em) scale(.8);opacity: 0 }
    .title-enter-to::before { transform: translateX(0) scale(1);opacity: .1 }

    .grid__stats {
        grid-area: 3 / 8 / 4 / 13;
        padding-bottom: var(--space-md)
    }
    
    .grid__stats > * {
        max-width: 26rem;
        margin: 0 auto
    }

    .grid__map {
        grid-area: 2 / 8 / 3 / 13;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: var(--space-md)
    }

    .grid__button {
        grid-area: 1 / 1 / 4 / 2;
        position: relative;
        z-index: 3;
        display: flex;
        align-items: center;
    }

    .grid__button--right {
        grid-area: 1 / 12 / 4 / 13;
        justify-content: flex-end;
    }

    .grid__progress {
        grid-area: 5 / 1 / 6 / 13;
        display: flex;
        align-items: flex-end;
    }

    .progress {
        width: 100%;
        height: 4px;
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

    #nextCountryBtn {
        display: none
    }

    @media only screen and (orientation: portrait) {
        .grid {
            grid-template-rows: 30vh min-content min-content 1fr 40px;
        }

        .grid__date {
            grid-area: 3 / 1 / 5 / 6;
        }

        .date {
            transform: rotate(0deg);
            writing-mode: unset;
            font-size: var(--font-size-small);
        }

        .grid__cover {
            grid-area: 1 / 1 / 2 / 13;
            margin: 0 var(--space-md)
        }

        .grid__title {
            grid-area: 2 / 1 / 3 / 13;
        }

        .grid__article {
            grid-area: 3 / 1 / 5 / 6;
            align-items: flex-start;
            padding: 2.4rem 0 0 0;
        }

        .article {
            background: none;
            box-shadow: none;
            padding: 0 var(--space-md);
            max-height: 100%
        }

        .grid__stats {
            grid-area: 3 / 6 / 4 / 13;
        }

        .grid__map {
            grid-area: 4 / 6 / 5 / 13;
            align-items: flex-start;
        }

        .grid__progress {
            grid-area: 5 / 1 / 6 / 13
        }

        .grid__button {
            grid-area: 2 / 1 / 3 / 13
        }
    }

    @media only screen and (orientation: portrait) and (max-width: 600px) {
        .grid {
            grid-template-rows: 30vh min-content min-content min-content min-content min-content 40px;
        }

        .grid__button {
            grid-area: 1 / 1 / 2 / 13
        }

        .grid__stats {
            grid-area: 3 / 1 / 4 / 13
        }

        .grid__map {
            grid-area: 4 / 1 / 5 / 13
        }

        .grid__date {
            grid-area: 5 / 1 / 6 / 13
        }

        .grid__article {
            grid-area: 6 / 1 / 7 / 13
        }

        .grid__article::after {
            display: none
        }

        .article {
            min-height: auto;
            overflow: visible;
            padding-bottom: var(--space-xl)
        }

        .article__text {
            margin-bottom: var(--space-lg)
        }

        .grid__progress {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
        }

        #nextCountryBtn {
            display: inline-block
        }
    }
</style>
<style>
    .map-enter-active, .map-leave-active { transition: all .7s var(--timing-function) .05s }
    
    .map-leave-active #route { transition-duration: .2s;transition-delay: .05s }
    .map-leave-active circle { transition-duration: .2s;transition-delay: .05s }
    .map-leave-active #border { transition-duration: .2s;transition-delay: .05s }

    .map-enter-active #border { transition-duration: .4s;transition-delay: .05s }
    .map-enter-active circle { transition-duration: .4s;transition-delay: .05s }
    .map-enter-active #route { transition-duration: .4s;transition-delay: .05s }

    .map-enter #border, .map-enter #route { stroke-dasharray: var(--length);stroke-dashoffset: var(--length);opacity: .3 }
    .map-enter-to #border, .map-enter-to #route { stroke-dasharray: var(--length);stroke-dashoffset: 0;opacity: 1}
    .map-leave #border, .map-leave #route { stroke-dasharray: var(--length);stroke-dashoffset: 0;opacity: 1 }
    .map-leave-to #border, .map-leave-to #route { stroke-dasharray: var(--length);stroke-dashoffset: calc(var(--length) * -1);opacity: .3 }

    .map-enter circle { opacity: 0;r: 0 }
    .map-enter-to circle { opacity: 1;r: 8 }
    .map-leave circle { opacity: 1;r: 8 }
    .map-leave-to circle { opacity: 0;r: 0 }
</style>