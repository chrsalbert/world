<template>
    <div class="c-destination__article">
        <transition name="c-destination__article__text" mode="out-in">
            <p  class="c-destination__article__text" :key="country.teaser" v-html="country.teaser"></p>
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
.c-destination__article {
    position: relative;
    z-index: 1;
}
.c-destination__article__text {
    color: var(--color-gray-lighter);
    font-size: var(--font-size-sm);
    transform: translateX(0);
    transition: all .15s var(--timing-function) .3s;
}
.c-destination__article__text-enter { transform: translateX(2em);opacity: 0 }
.c-destination__article__text-enter-to { transform: translateX(0);opacity: 1 }
.c-destination__article__text-leave-active { transition-delay: .25s }
.c-destination__article__text-leave { transform: translateX(0);opacity: 1 }
.c-destination__article__text-leave-to { transform: translateX(-2em);opacity: 0 }

@media only screen and (min-width: 600px) {
    .c-destination__article {
        background: var(--color-gray-darker);
        border-radius: var(--border-radius);
        padding: var(--space-lg);
        box-shadow: var(--shadow-lg);
    }
}

@media only screen and (min-width: 900px) {
    .c-destination__article {
        overflow-y: scroll;
        scroll-behavior: smooth;
        max-height: 10rem;
        transition: max-height .6s var(--timing-function)
    }
    .c-destination__article::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2rem;
        background-image: linear-gradient(to bottom, rgba(var(--color-gray-darker-rgb), 0), var(--color-gray-darker))
    }
    .c-destination__article:hover {
        max-height: 60vh
    }
}
</style>