<template>
    <span class="c-destinationDate" v-html="date"></span>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        date() {
            return this.formateDate(this.currentDestination.date.from, this.currentDestination.date.to)
        },
        ...mapGetters({
            currentDestination: 'destination/getCurrentDestination'
        })
    },
    methods: {
        formateDate(from, to, dash = '&thinsp;/&thinsp;') {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const dates = [from, to]
            const newDates = []
            dates.forEach((date) => {
                var date = date.split('.')
                const dateEN = `${date[1]}/${date[0]}/${date[2]}`
                const month = months[new Date(dateEN).getMonth()]
                const newDate = `${month} ${date[2]}`
                newDates.push(newDate)
            })
            var newDate = newDates[0]
            if(newDates[0] != newDates[1]) {
                newDate = newDate.concat(dash)
                newDate = newDate.concat(newDates[1])
            }
            return newDate
        }
    }
}
</script>
<style scoped>
.c-destinationDate {
    text-transform: uppercase;
    transition: all .2s var(--timing-function) .4s;
}
</style>