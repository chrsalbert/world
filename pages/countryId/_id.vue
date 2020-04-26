<template>
    <div class="o-album">
        <div class="l-container__move o-album__text">
            <div>
                <nuxt-link :to="`/${country.id}`" style="font-family:var(--font-family-alt">← {{ title }}</nuxt-link>
                <h1>{{ location }}</h1>
                <p>{{ text }}</p>
            </div>
            <div class="o-album__tools">
                <AlbumNavigation :country="country" :photoId="currentPhotoId" :albumLength="albumLength" />
            </div>
        </div>
        <div class="l-container__move o-album__gallery">
            <figure class="o-album__photo">
                <img 
                    v-on:click="toggleFullscreen()" 
                    :src="getImageUrl(`albums/${country.id}/${photoUrl}?w=1000&h=800&quality=80&f=auto`)" />
            </figure>
        </div>
    </div>
</template>
<script>
import Countries from '~/static/data/countries.json';
import AlbumNavigation from '~/components/AlbumNavigation';

export default {
    async asyncData (context) {
        const data = require(`~/static/data/albums/${context.params.countryId}.json`)
        return { album: data }
    },
    components: {
        AlbumNavigation
    },
    data () {
        return {
            currentPhotoId: this.$route.params.id - 1,
            country: Countries.find(country => country.id == this.$route.params.countryId),
            isFullscreen: false
        }
    },
    computed: {
        albumLength() {
            return this.album.length
        },
        title() {
            return this.country.title
        },
        text() {
            return this.album[this.currentPhotoId].text
        },
        location() {
            return this.album[this.currentPhotoId].location
        },
        photoUrl() {
            return this.album[this.currentPhotoId].url
        }
    },
    methods: {
        toggleFullscreen() {
            this.isFullscreen == true ? this.closeFullscreen() : this.openFullscreen()
            this.isFullscreen = !this.isFullscreen
        },
        getImageUrl(path) {
            return `${process.env.imageUrl}${path}`
        },
        preloadNextPhoto() {
            let photo = (this.currentPhotoId + 1) == this.album.length ? this.album[0] : this.album[this.currentPhotoId + 1]
            let img = new Image();
            img.src = this.getImageUrl(`albums/${this.country.id}/${photo.url}?w=1000&h=800&quality=80&f=auto`);
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
    },
    mounted () {
        this.preloadNextPhoto()
    },
    updated () {
        this.preloadNextPhoto()
    }
}
</script>