<template>
    <transition name="c-destination__cover">
        <figure 
            class="c-destination__cover" 
            :key="currentDestinationIndex" 
            :style="coverURL ? { 'background-image': `url('${coverURL}')` } : ''"></figure>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        coverURL() {
            if(process.client) {
                let filetype = this.supportsWebp ? 'webp' : 'jpg'
                let preloadNextImage = new Image()
                let preloadPrevImage = new Image()
                preloadNextImage.src = `${process.env.imageUrl}/cover/${this.destinations[this.nextDestinationId].id}.${filetype}?quality=80&f=auto`
                preloadPrevImage.src = `${process.env.imageUrl}/cover/${this.destinations[this.prevDestinationId].id}.${filetype}?quality=80&f=auto`
                return `${process.env.imageUrl}/cover/${this.currentDestination.id}.${filetype}?quality=80&f=auto`
            }
        },
        nextDestinationId() {
            return this.currentDestinationIndex + 1 <= this.destinations.length - 1 ? this.currentDestinationIndex + 1 : 0
        },
        prevDestinationId() {
            return this.currentDestinationIndex - 1 >= 0 ? this.currentDestinationIndex - 1 : this.destinations.length - 1
        },
        supportsWebp() {
            if (process.client) {
                let elem = window.document.createElement('canvas')
                if (!!(elem.getContext && elem.getContext('2d')))
                    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
                return false
            }
        },
        ...mapGetters({
            currentDestinationIndex: 'destination/getCurrentDestinationIndex',
            currentDestination: 'destination/getCurrentDestination',
            destinations: 'destination/getDestinations'
        })
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
}

.c-destination__cover-enter-active { z-index: 1 }
.c-destination__cover-leave { opacity: 1 }
.c-destination__cover-leave-to { opacity: 0; }
.c-destination__cover-enter { opacity: 0 }
.c-destination__cover-enter-to { opacity: 1;}

@media screen and (min-width: 900px) {
    .c-destination__cover {
        border-radius: var(--border-radius)
    }
}
</style>