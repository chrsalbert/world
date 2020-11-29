<template>
    <div class="c-welcomeStats">
        <ul class="c-welcomeStats__list">
            <li class="c-welcomeStats__item" v-for="(stat, index) of formattedStats" :key="index">
                <app-icon class="c-welcomeStats__icon" :icon="stat.icon" />
                <strong class="c-welcomeStats__value">{{ stat.title }}</strong>
                <span class="c-welcomeStats__key">{{ stat.sub }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    computed: {
        formattedStats() {
            return  [
                {
                    icon: 'calendar',
                    title: `318 days`,
                    sub: `from may 2019`
                }, {
                    icon: 'building',
                    title: `108 cities`,
                    sub: `and villages`
                }, {
                    icon: 'route',
                    title: `49.350 km`,
                    sub: 'between cities'
                }, {
                    icon: 'transport',
                    title: `480 hrs`,
                    sub: 'on the roads'
                }, {
                    icon: 'plant',
                    title: `45,6 %`,
                    sub: 'in bus & trains'
                }, {
                    icon: 'moneybag',
                    title: `5,70 EUR`,
                    sub: 'per 100 km'
                }
            ]
        }
    }
}
</script>
<style scoped>
    .c-welcomeStats {
        --itemCount: 6;
        --itemHeight: 8rem;
        --visibleDuration: 3s;
        width: var(--itemHeight);
        height: var(--itemHeight);
        border-radius: 50%;
        background: var(--color-gray-darker);
        box-shadow: var(--shadow-xl);
        overflow: hidden;
    }

    .c-welcomeStats__list {
        position: relative;
        animation: slide calc(var(--visibleDuration) * var(--itemCount)) steps(var(--itemCount), end) infinite;
    }

    .c-welcomeStats__item {
        width: var(--itemHeight);
        height: var(--itemHeight);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .c-welcomeStats__item > * {
        display: block;
    }

    .c-welcomeStats__key {
        font-size: var(--font-size-xs);
        max-width: 80%;
        text-align: center;
        color: var(--color-text-light);
        animation: key var(--visibleDuration) infinite;
    }

    .c-welcomeStats__value {
        animation: value var(--visibleDuration) infinite;
    }

    .c-welcomeStats__icon {
        animation: icon var(--visibleDuration) infinite;
    }

    .c-welcomeStats >>> .c-icon {
        display: inline-block;
        margin-bottom: var(--space-sm);
        width: var(--size-lg);
        height: var(--size-lg)
    }

    .c-welcomeStats >>> .c-icon svg {
        stroke: var(--color-gray-lighter)
    }

    @keyframes slide {
        from {
            transform: translateY(0)
        }
        to {
            transform: translateY(calc(-1 * calc(var(--itemHeight) * var(--itemCount))))
        }
    }

    @keyframes icon {
        0% {
            opacity: 0
        }
        4% {
            opacity: 1
        }
        96% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }

    @keyframes value {
        0% {
            opacity: 0
        }
        8% {
            opacity: 1
        }
        92% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }

    @keyframes key {
        0% {
            opacity: 0
        }
        12% {
            opacity: 1
        }
        88% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }
</style>