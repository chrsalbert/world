<template>
    <transition name="cover">
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
    transition: all .4s var(--timing-function);
    transition-delay: .2s;
    border-radius: var(--border-radius-xs)
}

.cover-leave-active { transition-duration: .6s; }
.cover-leave { opacity: 1 }
.cover-leave-to { opacity: .5;left: -100% }
.cover-enter-active { z-index: 1 }
.cover-enter { opacity: .5;left: 100% }
.cover-enter-to { opacity: 1;left: 0 }

</style>