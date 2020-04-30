<template>
    <article class="container" v-bind:class="{ 'only-photo': !showAside }">
        <div class="gallery">
            <figure class="photo">
                <img class="a-photo"
                    v-on:click="toggleFullscreen()" 
                    :src="getImageUrl(`albums/${country.id}/${photoUrl}?w=1000&h=800&quality=80&f=auto`)" />
            </figure>
            <AlbumNavigation :country="country" :photoId="currentPhotoId" :albumLength="albumLength" />
        </div>
        <div class="text">
            <div>
                <h1 class="a-sectionH1">{{ location }}</h1>
            </div>
            <div>
                <h2 class="a-sectionH2">Headline</h2>
                <p>{{ text }}</p>
            </div>
        </div>
    </article>
</template>
<script>
import Countries from '~/static/data/countries.json';
import AlbumNavigation from '~/components/AlbumNavigation';

export default {
    async asyncData (context) {
        const data = require(`~/static/data/albums/${context.params.countryId}.json`)
        return { album: data }
    },
    middleware: 'gallery',
    transition: {
        mode: ''
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
        },
        showAside() {
            return this.$store.state.gallery.showAside
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
<style scoped>
    .container {
        padding: var(--header-height) var(--body-pad)
    }
    .gallery {
        margin: var(--space-lg) 0
    }
    .photo {
        height: 60vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: var(--space-sm)
    }
    .text {
        text-align: center
    }

    @media only screen and (min-width: 600px) {
        .gallery {
            position: relative;
            margin-top: 0;
            padding: 0 var(--grid-col1);
        }
        .photo {
            justify-content: center;
            margin-bottom: var(--space-sm);
        }
    }

    @media only screen and (min-width: 900px) {
        .container {
            height: 100vh
        }
        .gallery {
            height: 100%;
            position: relative;
            margin-top: 0;
            margin-left: 26rem;
            padding: 0 var(--space-xl);
        }
        .text {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: var(--body-pad);
            bottom: 0;
            width: 26rem;
            padding: var(--header-height) var(--space-lg) 0 0;
            text-align: left;
        }
        .photo {
            align-items: flex-start;
            height: 100%;
            margin-bottom: var(--space-lg);
        }
    }
</style>