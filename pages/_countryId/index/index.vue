<template>
    <div class="o-album">
        <div class="l-container__move l-container__move--1 o-album__text">
            <div>
                <nuxt-link :to="`/`">← Alle Länder</nuxt-link>
                <h1>{{ title }}</h1>
                <p>
                    {{ text }}
                </p>
                <ul class="o-album__locations">
                    <li v-for="(location, index) of locations" :key="index">
                        <input :id="index" v-model="filter" type="radio" name="location" :value="location" /> <label :for="index">{{ location }}</label>
                    </li>
                </ul>
            </div>
            <div class="o-album__tools">
                <nuxt-link :to="`/${country.id}/1`" class="a-button">Gallerie ansehen</nuxt-link>
            </div>
        </div>
        <div class="l-container__move  l-container__move--2 o-album__gallery">
            <figure class="o-album__photo o-album__photo--2" v-bind:class="{ 'o-album__photo--2col': filter != '' }">
                <ul v-show="showPhotos">
                    <li v-for="(photo, index) of photos" :key="index" v-show="isFiltered(photo.location)" >
                        <nuxt-link 
                            v-bind="{ 'data-location': photo.location }" 
                            :to="`/${country.id}/${index + 1}`">
                            <img :src="getImageUrl(`albums/${country.id}/${photo.url}?w=500&h=400&quality=90&f=auto`)" />
                        </nuxt-link>
                    </li>
                </ul>
            </figure>
        </div>
    </div>
</template>
<script>
import Countries from '~/static/data/countries.json';

export default {
    async asyncData (context) {
        const data = require(`~/static/data/albums/${context.params.countryId}.json`)
        return { photos: data }
    },
    data () {
        return {
            country: Countries.find(country => country.id == this.$route.params.countryId),
            filter: '',
            showPhotos: false
        }
    },
    computed: {
        title() {
            return this.country.title
        },
        text() {
            return this.country.text
        },
        locations() {
            return [...new Set(this.photos.map(photo => photo.location))]
        }
    },
    methods: {
        isFiltered(location) {
            return !this.filter ? true : location == this.filter
        },
        getImageUrl(path) {
            return `${process.env.imageUrl}${path}`
        },
        delayedShow () {
            setTimeout(() => {
            this.showPhotos = true
            }, 1000)
        }
    },
    mounted() {
        this.delayedShow()
    }
}
</script>