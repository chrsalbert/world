<template>
    <span class="c-destinationDate">{{ date }}</span>
</template>
<script>
export default {
    props: {
        country: {
            type: Object,
            required: true
        }
    },
    computed: {
        date() {
            return this.formateDate(this.country.date.from, this.country.date.to)
        }
    },
    methods: {
        formateDate(from, to, dash = '&thinsp;/&thinsp;') {
            const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
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
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    transition: all .2s var(--timing-function) .4s;
    color: var(--color-text-light)
}
</style>