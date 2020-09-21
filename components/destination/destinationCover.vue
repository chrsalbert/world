<template>
    <transition name="c-destination__cover">
        <figure class="c-destination__cover" :key="coverURL" :style="`background-image: url('${coverURL}')`"></figure>
    </transition>
</template>
<script>
export default {
    props: {
        country: {
            type: Object,
            required: true
        }
    },
    computed: {
        coverURL() {
            return `${process.env.imageUrl}/cover/${this.country.cover}?quality=80&f=auto`
        }
    }
}
</script>
<style scoped>
.c-destination__cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-size: cover;
    background-position: 50% 50%;
    transition: all .6s var(--timing-function);
    /* transition-delay: .2s; */
    border-radius: var(--border-radius-xs)
}

.c-destination__cover-enter-active { z-index: 1 }
.c-destination__cover-leave { opacity: 1 }
.c-destination__cover-leave-to { opacity: 0; }
.c-destination__cover-enter { opacity: 0 }
.c-destination__cover-enter-to { opacity: 1;}

</style>