<template>
    <div class="o-album">
        <div class="l-container__move o-album__text">
            <nuxt-link to="/">Back</nuxt-link>
            <p>{{ text }}</p>
        </div>
        <div class="l-container__move o-album__gallery">
            <figure class="o-album__photo">
                <!-- <img :src="require(`~/assets/images/albums/${country.id}/${photoUrl}`)" /> -->
            </figure>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        country: Object
    },
    data () {
        return {
            currentPhoto: 0
        }
    },
    computed: {
        gallery() {
            return this.$store.state.gallery
        },
        description() {
            return this.gallery
        },
        text() {
            return this.gallery[this.currentPhoto].text
        },
        photoUrl() {
            return '1.jpg'
        }
    }
}
</script>
<style>
    .o-album {
        display: flex;
    }

    .o-album__gallery {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .o-album__photo {
        width: 80%;
        height: 80%;
        text-align: center
    }

    .o-album__photo img {
        max-width: 100%;
        max-height: 100%;
        box-shadow: var(--shadow-xl)
    }

    .o-album__text {
        width: 30%;
    }
</style>