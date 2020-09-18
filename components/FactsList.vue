<template>
    <ul :class="mode" class="c-facts">
        <li v-for="(fact, index) in facts" :key="index">
            <figure v-html="chooseIcon(fact.icon)"></figure>
            <strong>{{ fact.title }}</strong>
            <span>{{ fact.sub }}</span>
        </li>
    </ul>
</template>
<script>
import iconCard from "~/assets/images/icons/card.svg?raw";
import iconHeadphones from "~/assets/images/icons/headphones.svg?raw";
import iconLoaction from "~/assets/images/icons/location.svg?raw";

export default {
    props: {
        facts: Array,
        classes: String,
        mode: String
    },
    data () {
        return {
            iconCard,
            iconHeadphones,
            iconLoaction
        }
    },
    methods: {
        chooseIcon(icon) {
            switch (icon) {
                case 'card':
                    return iconCard
                case 'location':
                    return iconLoaction
                case 'headphones':
                    return iconHeadphones
            }
        }
    }
}
</script>
<style scoped>
    ul {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    li {
        width: 33.33%;
        text-align: center;
    }

    li > * {
        display: block;
    }

    span {
        text-transform: uppercase;
        font-size: var(--font-size-sm);
        color: var(--color-text-light)
    }

    figure {
        display: inline-block;
        width: var(--size-lg);
        height: var(--size-lg);
    }

    figure >>> svg {
        stroke: var(--color-gray)
    }
</style>