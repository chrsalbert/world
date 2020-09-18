<template>
    <ul class="c-destinationStats">
        <li class="c-destinationStats__item" v-for="(stat, index) of formattedStats" :key="index">
            <app-icon class="c-destinationStats__icon" :icon="stat.icon" />
            <strong class="c-destinationStats__value">{{ stat.title }}</strong>
            <span class="c-destinationStats__key">{{ stat.sub }}</span>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        stats: {
            type: Object,
            required: true
        }
    },
    computed: {
        formattedStats() {
            return  [
                {
                    icon: 'building',
                    title: `${this.stats.cities} Orte`,
                    sub: `in ${this.stats.days} tagen`
                }, {
                    icon: 'route',
                    title: `${this.formatNumber(this.stats.distance)} km`,
                    sub: 'gefahren'
                }, {
                    icon: 'transport',
                    title: `${this.stats.transportHours} Std.`,
                    sub: 'in Bus & Bahn'
                }
            ]
        }
    },
    methods: {
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }
    }
}
</script>
<style scoped>
    .c-destinationStats {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .c-destinationStats__item {
        width: min(10rem, 33.33%);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .c-destinationStats__item > * {
        display: block;
    }

    .c-destinationStats__key {
        text-transform: uppercase;
        font-size: var(--font-size-sm);
        color: var(--color-text-light)
    }

    .c-destinationStats >>> .c-icon {
        display: inline-block;
        margin-bottom: var(--space-sm);
        width: var(--size-lg);
        height: var(--size-lg)
    }

    .c-destinationStats >>> .c-icon svg {
        stroke: var(--color-gray-lighter)
    }
</style>