<template>
    <div class="o-album">
        <div class="l-container__move o-album__text">
            <div>
                <nuxt-link :to="`/`" style="font-family:var(--font-family-alt">← Alle Länder</nuxt-link>
                <h1>{{ title }}</h1>
                <p>
                    {{ text }}
                </p>
                <ul class="o-album__locations">
                    <li v-for="(location, index) of getLocations()" :key="index">
                        <input :id="index" v-model="filter" type="radio" name="location" :value="location" /> <label :for="index">{{ location }}</label>
                    </li>
                </ul>
            </div>
            <div class="o-album__tools">
                <nuxt-link :to="`/${country.id}/1`" class="a-button">Gallerie ansehen</nuxt-link>
            </div>
        </div>
        <div class="l-container__move o-album__gallery">
            <figure class="o-album__photo o-album__photo--2" v-bind:class="{ 'o-album__photo--2col': filter != '' }">
                <ul>
                    <li v-for="(photo, index) of photos" :key="index">
                        <nuxt-link 
                            v-show="isFiltered(photo.location)" 
                            v-bind="{ 'data-location': photo.location }" 
                            :to="`/${country.id}/${index + 1}`">
                            <img :src="getImageUrl(`images/albums/${country.id}/${photo.url}`)" />
                        </nuxt-link>
                    </li>
                </ul>
            </figure>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Countries from '~/static/data/countries.json';



export default {
    async asyncData (context) {
        const { data } = await axios.get(`${process.env.baseUrl}/data/albums/${context.params.countryId}.json`)
        return { photos: data }
    },
    data () {
        return {
            country: Countries.find(country => country.id == this.$route.params.countryId),
            filter: ''
        }
    },
    computed: {
        title() {
            return this.country.title
        },
        text() {
            return this.country.text
        }
    },
    methods: {
        isFiltered(location) {
            if(!this.filter) {
                return true
            } else {
                return location == this.filter
            }
        },
        getImageUrl(path) {
            return `${process.env.imageUrl}/${path}`
        },
        getLocations() {
            let lastMatch = ''
            let locations = []
            this.photos.forEach(photo => {
                if(lastMatch != photo.location) {
                    lastMatch = photo.location
                    locations.push(lastMatch)
                }
            })
            return locations
        }
    }
}
</script>