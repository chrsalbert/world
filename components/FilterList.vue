<template>
    <ul>
        <li v-for="(location, index) of locations" :key="index">
            <input 
                :id="index" 
                v-model="filter" 
                @change="sendFilter()" 
                type="radio" 
                name="location" 
                :value="location" /> 
            <label class="a-sectionH2" :for="index">{{ location }}</label>
        </li>
        <li v-show="filter">
            <input 
                id="all" 
                v-model="filter"
                @change="sendFilter()" 
                type="radio" 
                name="location" 
                value="" /> 
            <label for="all" class="a-sectionH2">Alle anzeigen</label>        
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
<style scoped>
    label {
        transition: .1s color linear;
        color: var(--color-text-light)
    }

    label:hover,
    input:checked + label {
        color: var(--color-text)
    }

    input {
        display: none
    }

    li {
        margin-bottom: var(--space-sm);
    }
</style>