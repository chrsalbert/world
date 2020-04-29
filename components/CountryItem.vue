<template>
    <div class="item">
        <div class="cover">
            <nuxt-link :to="`/${country.id}`"><img class="a-photo" :src="getImageUrl(`cover/${country.cover}?w=800&h=700&quality=80&f=auto`)" /></nuxt-link>
        </div>
        <div class="text">
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
                    sub: 'gin 14 Tagenefahren'
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
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 40;
        padding: var(--header-height) var(--body-pad)
    }

    .button-more {
        position: absolute;
        top: 50%;
        right: calc(calc(100% / 12) / 2);
        transform: translateY(-50%);
    }

    @media only screen and (min-width: 1100px) {
        .cover {
            margin-left: var(--grid-col2);
        }
    }

    @media only screen and (min-width: 900px) {
        .item > * {
            flex: 1;
        }
        .cover {
            display: flex;
            align-items: center;
            height: 100%;
            width: var(--grid-col5);
            margin-left: var(--grid-col1);
        }
        .text {
            width: var(--grid-col4);
            margin-left: var(--grid-col1);
        }
    }

    @media only screen and (max-width: 900px) {
        .item {
            flex-direction: column;
            justify-content: center;
        }
        .cover {
            margin: -10vh 0 var(--space-lg);
            height: 30vh;
        }
        .text {
            text-align: center;
            width: 100%;
        }
        .button-more {
            display: none
        }
    }
    
</style>