<template>
    <transition name="c-destination__title" mode="out-in">
        <h1 class="c-destination__title" :key="currentDestinationIndex">
            {{ title }}
        </h1>
    </transition>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        currentDestinationIndex: {
            type: Number,
            required: true
        }
    },
    computed: {
        step() {
            let index = this.currentDestinationIndex
            index++
            return index < 10 ?  `0${index}` : index
        }
    }
}
</script>
<style scoped>
    .c-destination__title {
        position: relative;
        overflow: hidden;
        font-size: var(--font-size-2xl);
        text-overflow: ellipsis;
        white-space: nowrap;
        transform: translateX(0); /* looks unnecessary but fixes a bug where the text has an after bouncing after transition end */
        transition: all .3s var(--timing-function);
    }
    /* .c-destination__title > span {
        display: inline-block;
        position: relative;
        z-index: 1;
    }
    .c-destination__title > span::before {
        display: none;
        z-index: -1;
        position: absolute;
        transform: translateX(-.5em);
        font-family: var(--font-family);
        font-size: var(--font-size-md);
        color: var(--color-gray);
        font-size: 2.5em;
        font-weight: 600;
        content: attr(data-position);
        color: var(--color-gray-darker);
        transition: all .2s var(--timing-function);
        white-space: nowrap;
    } */

    .c-destination__title-leave { transform: translateX(0);opacity: 1 }
    .c-destination__title-leave-to { transform: translateX(-2em);opacity: 0 }
    .c-destination__title-enter { transform: translateX(2em);opacity: 0 }
    .c-destination__title-enter-to { transform: translateX(0);opacity: 1 }

    /* @media only screen and (orientation: landscape) {
        .c-destination__title-leave > span::before { transform: translateX(-.5em);opacity: 1 }
        .c-destination__title-leave-to > span::before { transform: translateX(-2.5em);opacity: 0 }
        .c-destination__title-enter > span::before { transform: translateX(1.5em);opacity: 0 }
        .c-destination__title-enter-to > span::before { transform: translateX(-.5em);opacity: 1 }
    }

    @media only screen and (orientation: portrait) {
        .c-destination__title > span::before {
            transform: translateX(0);
            left: 50%
        }
        .c-destination__title-leave > span::before { left: 50%;opacity: 1 }
        .c-destination__title-leave-to > span::before { left: 60%;opacity: 0 }
        .c-destination__title-enter > span::before { left: 40%;opacity: 0 }
        .c-destination__title-enter-to > span::before { left: 50%;opacity: 1 }
    } */
</style>