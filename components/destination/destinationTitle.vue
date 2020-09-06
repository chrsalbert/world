<template>
    <transition name="title" mode="out-in">
        <h1 class="c-destinationTitle" 
            :key="title">
            <span :data-position="step" :key="title">
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
        transition: all .2s var(--timing-function)
    }
    .c-destinationTitle > span {
        display: inline-block;
        position: relative;
        padding-left: 1em;
        z-index: 1;
    }
    .c-destinationTitle > span::before {
        z-index: -1;
        position: absolute;
        margin-left: -.5em;
        font-size: 2.5em;
        font-weight: 600;
        content: attr(data-position);
        color: var(--color-gray-darker);
        transition: all .2s var(--timing-function)
    }

    .title-leave { transform: translateX(0);opacity: 1 }
    .title-leave-to { transform: translateX(-2em);opacity: 0 }
    .title-enter { transform: translateX(2em);opacity: 0 }
    .title-enter-to { transform: translateX(0);opacity: 1 }
    .title-leave::before { transform: translateX(0) scale(1);opacity: .1 }
    .title-leave-to::before { transform: translateX(-.25em) scale(.8);opacity: 0 }
    .title-enter::before { transform: translateX(.25em) scale(.8);opacity: 0 }
    .title-enter-to::before { transform: translateX(0) scale(1);opacity: .1 }
</style>