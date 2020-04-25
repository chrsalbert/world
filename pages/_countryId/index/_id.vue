<template>
    <div class="o-album">
        <div class="l-container__move o-album__text">
            <div>
                <nuxt-link :to="`/${country.id}`" style="font-family:var(--font-family-alt">← {{ title }}</nuxt-link>
                <h1>{{ location }}</h1>
                <p>{{ text }}</p>
            </div>
            <div class="o-album__tools">
                <Nav :country="country" :currentPhotoId="currentPhotoId" :galleryLength="photosCount" />
            </div>
        </div>
        <div class="l-container__move o-album__gallery">
            <figure class="o-album__photo">
                <img v-on:click="toggleFullscreen()" :src="getImageUrl(`albums/${country.id}/${photoUrl}?w=1000&h=800&quality=80&f=auto`)" />
            </figure>
        </div>
    </div>
</template>
<script>
import Countries from '~/static/data/countries.json';
import Nav from '~/components/gallery/Nav';

export default {
    async asyncData (context) {
        const data = require(`~/static/data/albums/${context.params.countryId}.json`)
        return { gallery: data }
    },
    components: {
        Nav
    },
    watch: {
        isFullscreen: function () {
            this.isFullscreen == true ? this.openFullscreen() : this.closeFullscreen()
        },
        currentPhotoId: function () {
            this.preloadNextPhoto()
        }
    },
    data () {
        return {
            currentPhotoId: this.$route.params.id - 1,
            country: Countries.find(country => country.id == this.$route.params.countryId),
            isFullscreen: false
        }
    },
    mounted () {
        this.preloadNextPhoto()
    },
    computed: {
        photosCount() {
            return this.gallery.length
        },
        currentPhotoText() {
            return this.currentPhotoId + 1
        },
        title() {
            return this.country.title
        },
        text() {
            return this.gallery[this.currentPhotoId].text
        },
        location() {
            return this.gallery[this.currentPhotoId].location
        },
        photoUrl() {
            return this.gallery[this.currentPhotoId].url
        },
        nextPhotoUrl() {
            return this.gallery[this.currentPhotoId + 1].url
        }
    },
    methods: {
        getImageUrl(path) {
            return `${process.env.imageUrl}${path}`
        },
        preloadNextPhoto() {
            let img = new Image();
            img.src = this.getImageUrl(`albums/${this.country.id}/${this.nextPhotoUrl}?w=1000&h=800&quality=80&f=auto`);
        },
        toggleFullscreen: function(){
            this.isFullscreen = !this.isFullscreen
        },
        openFullscreen() {
            var elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { 
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        },
        closeFullscreen() {
            var elem = document.documentElement;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { 
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
}
</script>