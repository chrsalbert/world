<template>
    <div class="item">
        <figure class="cover">
            <nuxt-link :to="`/${country.id}`"><img class="a-photo" :src="getImageUrl(`cover/${country.cover}?w=800&h=700&quality=80&f=auto`)" /></nuxt-link>
        </figure>
        <div class="text">
            <img :src="`/images/countries/${country.id}.svg`" class="map" />
            <h2 class="a-sectionH1">{{ country.title }}</h2>
            <p class="a-subline">{{ country.time.from }} – {{ country.time.to }}</p>
            <FactsList :facts="getFacts" mode="horizontal" />
            <nuxt-link class="a-button a-button--icon button-more" :to="`/${country.id}`" v-html="iconArrowRight"></nuxt-link>
        </div>
    </div>
</template>
<script>
import FactsList from '~/components/FactsList';
import iconArrowRight from '~/assets/images/icons/arrow-right.svg?raw';

export default {
    props: {
        country: Object
    },
    components: {
        FactsList
    },
    data () {
        return {
            iconArrowRight
        }
    },
    computed: {
        getFacts() {
            const facts = [
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
                    sub: `in ${this.country.stats.days} Tagen`
                }
            ]
            return facts
        }
    },
    methods: {
        getImageUrl(path) {
            return `${process.env.imageUrl}${path}`
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }
    }
}
</script>
<style scoped>
    .item {
        --cover-height: 30vh;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: var(--header-height) var(--body-pad)
    }
    .cover {
        margin-bottom: var(--space-2xl);
        max-height: var(--cover-height);
    }
    .cover * {
        display: block;
        max-height: var(--cover-height)
    }
    .text {
        position: relative;
        width: 100%;
        text-align: center;
    }
    .button-more {
        display: none
    }

    .map {
        position: absolute;
        opacity: .05;
        z-index: -1;
        top: 50%;
        left: 50%;
        max-width: 140%;
        transform: translate3d(-50%,-30%, 0);
    }

    @media only screen and (min-width: 900px) {
        .item {
            --cover-height: 60vh;
            flex-direction: row;
        }
        .cover {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            flex-shrink: 0;
            width: var(--grid-col6);
            margin-left: var(--grid-col1);
        }
        .text {
            width: var(--grid-col5);
            margin-left: var(--grid-col1);
            text-align: left
        }
        .map {
            transform: translate3d(-60%,-70%, 0);
        }
    }
</style>
<style>
    @media only screen and (min-width: 900px) {
        .facts {
            flex-direction: column;
        }
        .facts li {
            position: relative;
            padding-left: var(--space-lg);
        }
        .facts li:not(:last-child) {
            margin-bottom: var(--space-md)
        }
        .facts figure {
            position: absolute;
            left: -.3em;
        }
    }
</style>