<template>
    <ul class="m-filter">
        <li v-for="(location, index) of locations" :key="index">
            <input 
                :id="index" 
                v-model="filter" 
                @change="sendFilter()" 
                type="radio" 
                name="location" 
                :value="location" /> 
            <label :for="index">{{ location }}</label>
        </li>
        <li v-show="filter">
            <input 
                id="all" 
                v-model="filter"
                @change="sendFilter()" 
                type="radio" 
                name="location" 
                value="" /> 
            <label for="all" style="font-size:var(--font-size;text-transform:none">Alle anzeigen</label>        
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
        sendFilter() {
            this.$emit('filter', this.filter)
        }
    }
}
</script>