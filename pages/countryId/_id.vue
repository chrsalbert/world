<template>
    <div class="container" v-bind:class="{ 'l-gallery--show': !showAside }">
        <aside>
            <div>
                <h1 class="a-sectionH1">{{ location }}</h1>
                <p class="a-subline">Januar 2020</p>
            </div>
            <div>
                <h2 class="a-sectionH2">Headline</h2>
                <p>{{ text }}</p>
            </div>
        </aside>
        <main>
            <figure>
                <img class="a-photo"
                    v-on:click="toggleFullscreen()" 
                    :src="getImageUrl(`albums/${country.id}/${photoUrl}?w=1000&h=800&quality=80&f=auto`)" />
            </figure>
            <AlbumNavigation :country="country" :photoId="currentPhotoId" :albumLength="albumLength" />
        </main>
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
    middleware: 'gallery',
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
        position: relative;
        padding-top: var(--header-height);
        margin: 0 var(--body-pad)
    }

    aside {
        padding: 0 var(--header-height) 0 0 0;
    }

    @media only screen and (min-width: 600px) {
        .container {
            min-height: 100vh;
        }

        main {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--grid-col7);
            margin: 0 0 0 var(--grid-col5);
            height: calc(100vh - calc(var(--header-height) * 2));
        }

        figure {
            display: flex;
            align-items: center;
            height: 100%;
            margin: 0 var(--grid-column-width)
        }

        aside {
            position: fixed;
            display: flex;
            flex-direction: column;
            top: var(--header-height);
            left: var(--body-pad);
            bottom: 0;
            width: var(--grid-col4);
            padding: 0;
        }
    }

    @media only screen and (max-width: 600px) {
        figure {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50vh;
            margin: var(--space-md) auto;
        }
        main {
            margin-bottom: var(--space-md)
        }
        .container {
            display: flex;
            flex-direction: column-reverse;
        }
        aside {
            text-align: center;
            padding: 0 0 var(--space-xl)
        }
        img {
            display: block;
        }
    }
</style>