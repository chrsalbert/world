<template>
    <div>
        <h1>{{ trip.title }}</h1>
        <div class="gallery">
            <div v-for="photo in gallery.photos" :key="photo.url"><img :src="require(`~/assets/images/${photo.url}`)" /></div>
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
    .gallery img {
        max-width: 300px;
        max-height: 300px
    }
</style>