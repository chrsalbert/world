<template>
    <ul class="m-photoRoll">
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