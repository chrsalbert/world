<template>
    <div class="l-index">
        <div>
            <h1>Alle Trips</h1>
            <ul>
                <li v-for="item of trips" :key="item.id">
                    <nuxt-link :to="`/trips/${item.id}`">
                    {{ item.title }}</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Trips from '~/static/data/trips.json';

export default {
    
    data () {
        return {
            trips: Trips
        }
    }
}
</script>