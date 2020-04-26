<template>
    <article class="l-default l-default--fixed l-default--swapped" >
        <div class="l-default__aside">
            <figure><img :src="getImageUrl(`cover/${country.cover}?w=800&h=700&quality=80&f=auto`)" /></figure>
        </div>
        <div class="l-default__content">
            <section>
                <div>
                    <h2>{{ country.title }}</h2>
                    <ul class="m-facts">
                        <li><span>Reisezeit</span><strong>{{ country.stats.days }} Tage</strong></li>
                        <li><span>Reisedistanz</span><strong>{{ formatNumber(country.stats.distance) }} km</strong></li>
                        <li><span>Orte</span><strong>{{ country.stats.cities }} Orte</strong></li>
                    </ul>
                    <nuxt-link class="a-button" :to="`/${country.id}`">Album ansehen</nuxt-link>
                </div>
            </section>
        </div>
    </article>
</template>
<script>
export default {
    props: {
        country: Object
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
<style scroped>
    h2 {
        margin-bottom: var(--space-md)
    }
    .m-facts {
        margin-bottom: var(--space-2xl)
    }
    figure,
    section {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    section {
        justify-content: flex-start;
    }
    img {
        max-width: 600px;
        max-height: 100%;
        box-shadow: var(--shadow-lg)
    }
</style>