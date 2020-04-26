<template>
    <ul class="m-filter">
        <li v-for="(location, index) of locations" :key="index">
            <input :id="index" v-model="filter" @change="returnFilter()" type="radio" name="location" :value="location" /> <label :for="index">{{ location }}</label>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        locations: Array   
    },
    data () {
        return {
            filter: ''
        }
    },
    methods: {
        returnFilter() {
            this.$emit('filter', this.filter)
        }
    }
}
</script>