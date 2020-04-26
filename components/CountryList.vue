<template>
    <div class="o-country" >
        <aside class="l-container__move l-container__move--1 o-country__gallery">
            <figure class="o-country__photo">
                <img :src="getImageUrl(`cover/${country.cover}?w=500&h=400&quality=80&f=auto`)" />
            </figure>
        </aside>
        <article class="l-container__move l-container__move--2 o-country__text">
            <div>
                <h2>{{ country.title }}</h2>
                <ul class="m-facts">
                    <li><span>Reisezeit</span><strong>{{ country.stats.days }} Tage</strong></li>
                    <li><span>Reisedistanz</span><strong>{{ formatNumber(country.stats.distance) }} km</strong></li>
                    <li><span>Orte</span><strong>{{ country.stats.cities }} Orte</strong></li>
                </ul>
                <nuxt-link class="a-button" :to="`/${country.id}`">Album ansehen</nuxt-link>
            </div>
        </article>
    </div>
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