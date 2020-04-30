<template>
    <article class="container" v-bind:class="{ 'only-photo': !showAside }">
        <header>
            <div>
                <h1 class="a-sectionH1">{{ location }}</h1>
            </div>
            <div>
                <h2 class="a-sectionH2">Headline</h2>
                <p>{{ text }}</p>
            </div>
        </header>
        <main>
            <figure>
                <img class="a-photo"
                    v-on:click="toggleFullscreen()" 
                    :src="getImageUrl(`albums/${country.id}/${photoUrl}?w=1000&h=800&quality=80&f=auto`)" />
            </figure>
            <AlbumNavigation :country="country" :photoId="currentPhotoId" :albumLength="albumLength" />
        </main>
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
    article {
        position: relative;
        padding-top: var(--header-height);
        margin: 0 var(--body-pad)
    }

    main {
        position: relative;
    }

    header {
        padding: 0 var(--header-height) 0 0 0;
    }

    figure {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 var(--grid-column-width)
    }

    .only-photo {
        min-height: 100vh !important;
        padding: 0 !important;
        align-items: center;
        justify-content: center;
    }

    .only-photo header {
        display: none
    }

    .only-photo main {
        margin: 0;
        width: 100%;
    }

    .only-photo figure {
        height: 75vh
    }

    @media only screen and (min-width: 900px) {
        article {
            min-height: 100vh;
        }

        header {
            position: fixed;
            display: flex;
            flex-direction: column;
            top: var(--header-height);
            left: var(--body-pad);
            bottom: 0;
            width: var(--grid-col3);
            padding: 0;
        }

        main {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--grid-col8);
            margin: 0 0 0 var(--grid-col4);
            height: calc(100vh - calc(var(--header-height) * 2));
        }

        figure {
            height: 100%;
        }
    }

    @media only screen and (max-width: 900px) {
        figure {
            height: 50vh;
        }
        main {
            margin-bottom: var(--space-3xl)
        }
        article {
            display: flex;
            flex-direction: column-reverse;
        }
        header {
            text-align: center;
            padding: 0 0 var(--space-xl)
        }
        img {
            display: block;
        }
    }

    @media only screen and (max-width: 600px) {
        main {
            margin-bottom: var(--space-xl)
        }
        figure {
            padding: 0;
            margin: var(--space-md) auto;
        }
    }
</style>