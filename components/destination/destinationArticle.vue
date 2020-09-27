<template>
    <div class="c-destination__article">
        <transition name="c-destination__article__text" mode="out-in">
            <p class="c-destination__article__text" :key="currentDestinationIndex" v-html="teaser"></p>
        </transition>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        teaser() {
            return this.currentDestination.teaser
        },
        ...mapGetters({
            currentDestinationIndex: 'destination/getCurrentDestinationIndex',
            currentDestination: 'destination/getCurrentDestination'
        })
    }
}
</script>
<style scoped>
.c-destination__article {
    position: relative;
    z-index: 1;
    padding: var(--space-md)
}
.c-destination__article__text {
    color: var(--color-gray-lighter);
    font-size: var(--font-size-sm);
    max-width: 36em;
    margin: 0 auto;
    transform: translateX(0);
    transition: all .15s var(--timing-function) .3s;
}
.c-destination__article__text-enter { transform: translateX(2em);opacity: 0 }
.c-destination__article__text-enter-to { transform: translateX(0);opacity: 1 }
.c-destination__article__text-leave-active { transition-delay: .25s }
.c-destination__article__text-leave { transform: translateX(0);opacity: 1 }
.c-destination__article__text-leave-to { transform: translateX(-2em);opacity: 0 }

@media only screen and (min-width: 900px) {
    .c-destination__article {
        background: var(--color-gray-darker);
        border-radius: var(--border-radius);
        padding: var(--space-lg);
        box-shadow: var(--shadow-lg);
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
    .c-destination__article__text {
        max-width: none
    }
}
</style>