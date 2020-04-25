<template>
    <div class="o-country" >
        <aside class="l-container__move o-country__gallery" style="--move-delay:0s">
            <figure class="o-country__photo">
                <img :src="getImageUrl(`cover/${country.cover}?w=500&h=400&quality=80&f=auto`)" />
            </figure>
        </aside>
        <article class="l-container__move o-country__text" style="--move-delay:.1s">
            <div>
                <h2>{{ country.title }}</h2>
                <ul class="m-facts">
                    <li><span>Reisezeit</span><strong>{{ country.stats.travelDays }} Tage</strong></li>
                    <li><span>Reisedistanz</span><strong>{{ country.stats.travelDistance }} km</strong></li>
                    <li><span>Zeit im ÖPV</span><strong>{{ country.stats.travelHours }} Std.</strong></li>
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
        }
    }
}
</script>