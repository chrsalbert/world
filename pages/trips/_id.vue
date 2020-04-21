<template>
    <div class="l-index">
        <div>
            <h1>{{ trip.title }}</h1>
            <h2>Fotogalerie</h2>
            <ul class="flex">
                <li class="mr-1" v-for="(photo, index) in gallery.photos" :key="photo.url">
                    <nuxt-link :to="`/trips/${trip.id}/gallery/${index + 1}`" class="block shadow">
                        <img :src="require(`~/assets/images/${photo.url}`)" />
                    </nuxt-link>
                </li>
            </ul>
            <h2>Stories</h2>
        </div>
    </div>
</template>

<script>
import Trips from '~/assets/data/trips.json';
import Galleries from '~/assets/data/photos.json';

export default {
    data () {
        return {
            id: this.$route.params.id,
            trips: Trips,
            galleries: Galleries
        }
    },
    computed: {
        trip() {
            return this.trips.find(trip => trip.id === this.id)
        },
        gallery() {
            return this.galleries.find(gallery => gallery.id === this.trip.galleryId)
        }
    }
    
}
</script>
<style scoped>
    img {
        height: 200px;
    }
</style>