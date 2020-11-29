<template>
    <div class="c-destination__footer">
        <div class="c-destination__footer__nav">
            <destination-nav />
        </div>
        <div class="c-destination__footer__menu">
            <destination-menu v-show="showMenu" />
        </div>
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
            showMenu: 'navigation/showMenu',
            currentDestination: 'destination/getCurrentDestination'
        })
    }
}
</script>
<style scoped>
.c-footer {
    position: relative;
}

.c-destination__footer__nav {
    position: relative;
    z-index: 2;
    border-top: 1px var(--color-gray-dark) solid;
    background: var(--color-gray-darkest)
}

.c-destination__footer__menu {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    left: 0;
}
</style>