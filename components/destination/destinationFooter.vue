<template>
    <div class="c-destination__footer">
        <div class="c-destination__footer__nav">
            <destination-nav 
                :destinations="destinations"
                :currentDestination="currentDestination" 
                :currentDestinationIndex="currentDestinationIndex" />
        </div>
        <div class="c-destination__footer__menu">
            <destination-menu 
                v-show="isMenuVisible"
                :key="currentDestinationIndex"
                :currentDestination="currentDestination" 
                :currentDestinationIndex="currentDestinationIndex" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        destinations: {
            type: Array,
            required: true
        },
        currentDestination: {
            type: Object,
            required: true
        },
        currentDestinationIndex: {
            type: Number,
            required: true
        }        
    },
    computed: {
        isMenuVisible() {
            return this.$store.state.navigation.isMenuVisible
        }
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
    border-top: 1px var(--color-gray) solid;
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