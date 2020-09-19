<template>
    <transition name="c-destination__article" mode="out-in">
        <p class="c-destination__article" :key="country.teaser" v-html="country.teaser"></p>
    </transition>
</template>
<script>
export default {
    props: {
        country: {
            type: Object,
            required: true
        }
    }
}
</script>
<style scoped>
.c-destination__article {
    position: relative;
    z-index: 1;
    color: var(--color-gray-lighter);
    transform: translateX(0);
    transition: all .3s var(--timing-function) .3s;
}

.c-destination__article-enter { transform: translateX(2em);opacity: 0 }
.c-destination__article-enter-to { transform: translateX(0);opacity: 1 }
.c-destination__article-leave-active { transition-delay: .25s }
.c-destination__article-leave { transform: translateX(0);opacity: 1 }
.c-destination__article-leave-to { transform: translateX(-2em);opacity: 0 }
/* 
@media only screen and (orientation: landscape) {
    .c-destination__article {
        position: absolute;
        right: var(--space-md);
        bottom: var(--space-md);
        left: var(--space-md);
        max-height: calc(calc(3rem * var(--line-height)) + calc(var(--space-md) * 2));
        border-radius: var(--border-radius-sm);
    }

    .c-destination__article:hover {
        max-height: 100%
    }

    .c-destination__article::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2rem;
        background-image: linear-gradient(to bottom, rgba(var(--color-gray-darkest-rgb), 0), var(--color-gray-darkest))
    }
} */
</style>