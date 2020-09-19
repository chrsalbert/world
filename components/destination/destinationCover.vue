<template>
    <transition name="c-destinationCover">
        <figure class="c-destinationCover" :key="coverURL" :style="`background-image: url('${coverURL}')`"></figure>
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
.c-destinationCover {
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

.c-destinationCover-enter-active { z-index: 1 }
.c-destinationCover-leave { opacity: 1 }
.c-destinationCover-leave-to { opacity: 0; }
.c-destinationCover-enter { opacity: 0 }
.c-destinationCover-enter-to { opacity: 1;}

</style>