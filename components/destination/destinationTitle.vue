<template>
    <transition name="title" mode="out-in">
        <h1 class="c-destinationTitle" :key="currentDestinationIndex">
            <span :data-position="step">
                {{ title }}
            </span>
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
    .c-destinationTitle {
        position: relative;
        z-index: 2;
        margin: var(--space-xl) 0 0;
        text-align: center;
        font-size: var(--font-size-3xl);
        transition: all .3s var(--timing-function)
    }
    .c-destinationTitle > span {
        display: inline-block;
        position: relative;
        z-index: 1;
    }
    .c-destinationTitle > span::before {
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
    }

    .title-leave { transform: translateX(0);opacity: 1 }
    .title-leave-to { transform: translateX(-2em);opacity: 0 }
    .title-enter { transform: translateX(2em);opacity: 0 }
    .title-enter-to { transform: translateX(0);opacity: 1 }
    .title-leave > span::before { transform: translateX(-.5em);opacity: 1 }
    .title-leave-to > span::before { transform: translateX(-2.5em);opacity: 0 }
    .title-enter > span::before { transform: translateX(1.5em);opacity: 0 }
    .title-enter-to > span::before { transform: translateX(-.5em);opacity: 1 }
</style>