<template>
    <ul :class="`m-facts ${classes}`">
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
        classes: String
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