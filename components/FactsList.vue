<template>
    <ul :class="mode">
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
        margin: 0 0 calc(var(--space-md) * -1)
    }

    li {
        position: relative;
        margin: 0 0 var(--space-md);
        padding-left: var(--space-xl);
        width: 8rem;
        letter-spacing: .05em;
    }

    li > * {
        display: block;
        white-space: nowrap;
    }

    figure {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        opacity: .4
    }

    span {
        margin-top: .2em;
        color: var(--color-light);
        text-transform: uppercase;
        font-size: var(--font-size-sm)
    }

    
    @media only screen and (max-width: 900px) {
        ul {
            display: flex;
        }
        
        li {
            width: 33.33%;
            padding: var(--space-xl) 0 0;
            text-align: center;
        }

        figure {
            top: 0;
            left: 50%;
            transform: translate3d(-50%, 0, 0) 
        }
    }

    /* .m-facts--x {
        display: flex;
    }

    .m-facts--x li {
        width: 33%
    } */
</style>