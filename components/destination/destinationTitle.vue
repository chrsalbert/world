<template>
    <transition name="c-destination__title" mode="out-in">
        <h1 class="c-destination__title" :key="title">
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

    .c-destination__title-leave { transform: translateX(0);opacity: 1 }
    .c-destination__title-leave-to { transform: translateX(-2em);opacity: 0 }
    .c-destination__title-enter { transform: translateX(2em);opacity: 0 }
    .c-destination__title-enter-to { transform: translateX(0);opacity: 1 }
</style>