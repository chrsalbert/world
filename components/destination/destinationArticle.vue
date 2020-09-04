<template>
    <div class="c-destinationArticle" >
        <transition name="article" mode="out-in">
            <p :key="country.teaser" v-html="country.teaser"></p>
        </transition>
    </div>
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
.c-destinationArticle {
    position: relative;
    z-index: 1;
    background: var(--color-gray-darkest);
    padding: var(--space-md);
    overflow-y: scroll;
    transition: all .3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    border-radius: var(--border-radius-lg) var(--border-radius) var(--border-radius);
    color: var(--color-gray-lighter);
}

.c-destinationArticle p {
    transition: all .3s var(--timing-function)
}

.article-enter { transform: translateX(1em);opacity: 0 }
.article-enter-to { transform: translateX(0);opacity: 1 }
.article-leave-active { transition-delay: .25s }
.article-leave { transform: translateX(0);opacity: 1 }
.article-leave-to { transform: translateX(-1em);opacity: 0 }

@media only screen and (orientation: landscape) {
    .c-destinationArticle {
        position: absolute;
        right: var(--space-md);
        bottom: var(--space-md);
        left: var(--space-md);
        max-height: calc(calc(3rem * var(--line-height)) + calc(var(--space-md) * 2));
        border-radius: var(--border-radius-sm);
    }

    .c-destinationArticle:hover {
        max-height: 100%
    }

    .c-destinationArticle::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2rem;
        background-image: linear-gradient(to bottom, rgba(var(--color-gray-darkest-rgb), 0), var(--color-gray-darkest))
    }
}
</style>