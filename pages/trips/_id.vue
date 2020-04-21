<template>
    <div class="l-index">
        <div>
            <h1>{{ title }}</h1>
            <h2 v-if="gallery">Fotogalerie</h2>
            <ul class="flex" v-if="gallery">
                <li class="mr-1" v-for="(photo, index) in gallery.photos" :key="photo.url">
                    <nuxt-link :to="`/trips/${trip.id}/gallery/${index + 1}`" class="block shadow">
                        <img :src="require(`~/assets/images/${photo.url}`)" />
                    </nuxt-link>
                </li>
            </ul>
            <h2>Stories</h2>
            Stories…
        </div>
    </div>
</template>

<script>
import Trips from '~/static/data/trips.json';
import Galleries from '~/static/data/photos.json';

export default {
    data () {
        return {
            id: this.$route.params.id,
            trips: Trips,
            galleries: Galleries
        }
    },
    computed: {
        title() {
            return this.trip.title
        },
        trip() {
            return this.trips.find(trip => trip.id == this.id)
        },
        gallery() {
            return this.galleries.find(gallery => gallery.id === this.trip.id)
        }
    }
    
}
</script>
<style scoped>
    img {
        height: 200px;
    }
</style>