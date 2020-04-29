<template>
    <div class="o-countrySlide">
        <div class="u-row u-row--centerY">
            <div class="u-col u-col--offset" style="--span:5;--offset:2">
                <nuxt-link :to="`/${country.id}`"><img class="a-photo" :src="getImageUrl(`cover/${country.cover}?w=800&h=700&quality=80&f=auto`)" /></nuxt-link>
            </div>
            <div class="u-col u-col--offset">
                <section>
                    <div>
                        <h2 class="a-sectionH1">{{ country.title }}</h2>
                        <p class="a-subline">Januar 2019</p>
                        <FactsList :facts="getFacts" />
                        <nuxt-link class="o-countrySlide__more a-button a-button--icon" :to="`/${country.id}`" v-html="iconArrowRight"></nuxt-link>
                    </div>
                </section>
            </div>
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
        FactsList,
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