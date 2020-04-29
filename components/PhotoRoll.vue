<template>
    <ul>
        <li v-for="(photo, index) of photos" :key="index" v-show="isFiltered(photo.location)" >
            <nuxt-link 
                :to="`/${countryId}/${index + 1}`">
                <img :src="getImageUrl(`albums/${countryId}/${photo.url}?w=500&h=400&quality=90&f=auto`)" />
            </nuxt-link>
        </li>
    </ul>
</template>
<script>
    export default {
        props: {
            photos: Array,
            countryId: String,
            filter: String
        },
        methods: {
            isFiltered(location) {
                return !this.filter ? true : location == this.filter
            },
            getImageUrl(path) {
                return `${process.env.imageUrl}${path}`
            }
        }
    }
</script>
<style scoped>
    ul {
        display: block; 
        column-count: 2;
        column-gap: var(--space-sm);
        width: 100%;
    }

    li {
        margin-bottom: var(--space-sm)
    }

    img {
        max-width: 100%;
        box-shadow: var(--shadow-lg);
    }

    @media only screen and (min-width: 900px) {
        ul {
            column-count: 3;
        }
    }
</style>