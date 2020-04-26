<template>
    <article class="c-country" >
        <figure class="c-country__cover">
            <img :src="getImageUrl(`cover/${country.cover}?w=800&h=700&quality=80&f=auto`)" />
        </figure>
        <div class="c-country__text">
            <h2>{{ country.title }}</h2>
            <ul class="m-facts">
                <li><span>Reisezeit</span><strong>{{ country.stats.days }} Tage</strong></li>
                <li><span>Reisedistanz</span><strong>{{ formatNumber(country.stats.distance) }} km</strong></li>
                <li><span>Orte</span><strong>{{ country.stats.cities }} Orte</strong></li>
            </ul>
            <nuxt-link class="a-button" :to="`/${country.id}`">Album ansehen</nuxt-link>
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
    .m-facts {
        margin-bottom: var(--space-lg)
    }
</style>
<style>
.c-country {
    position: relative;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
}

.c-country__cover {
    width: 60%;
    text-align: right;
    padding-right: var(--space-3xl);
}

.c-country__text {
    width: 40%;
}

.c-country__cover img {
    width: 100%;
    max-width: 600px;
    max-height: 100%;
}

.c-country h2 {
    margin-bottom: var(--space-lg)
}

@media only screen and (max-width: 900px) {
    .c-country {
        flex-direction: column;
        align-items: flex-start;
    }
    .c-country__cover {
        width: 100%;
        padding: 0 0 var(--space-2xl);
        text-align: center
    }
    .c-country__text {
        width: 100%;
        text-align: center;
    }
    .c-country__text .m-facts {
        justify-content: center;
    }
}
</style>