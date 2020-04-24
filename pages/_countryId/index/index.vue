<template>
    <div class="o-album">
        <div class="l-container__move o-album__text">
            <div>
                <nuxt-link :to="`/`" style="font-family:var(--font-family-alt">← Alle Länder</nuxt-link>
                <h1>{{ title }}</h1>
                <p>
                    {{ text }}
                </p>
            </div>
            <div class="o-album__tools">
                <nuxt-link :to="`/${country.id}/1`" class="a-button">Gallerie ansehen</nuxt-link>
            </div>
        </div>
        <div class="l-container__move o-album__gallery">
            <figure class="o-album__photo o-album__photo--2">
                <ul>
                    <li v-for="(photo, index) of photos" :key="index">
                        <nuxt-link :to="`/${country.id}/${index + 1}`"><img :src="getCurrentPhoto(`images/albums/${country.id}/${photo.url}`)" /></nuxt-link>
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
    asyncData (context) {
        return axios
        .get(`http://localhost:3000/data/albums/${context.params.countryId}.json`)
        .then((res) => {
            return {
                photos: res.data
            }
        })
    },
    data () {
        return {
            country: Countries.find(country => country.id == this.$route.params.countryId)
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
        getCurrentPhoto(url) {
            try {
                return require(`~/assets/${url}`)
            } catch (e) {
                return require(`~/assets/images/albums/taiwan/1.jpg`)
            }
        }
    }
}
</script>