<template>
    <div class="l-welcome__grid">
        <div class="l-welcome__nav">
            <slot name="nav"></slot>
        </div>
        <transition name="u-animation" mode="out-in">
            <div class="l-welcome__menu" v-show="isMenuVisible" key="menu">
                <slot name="menu"></slot>
            </div>
        </transition>
        <transition name="u-animation" mode="out-in">
            <div class="l-welcome__video">
                <slot name="video"></slot>
            </div>
        </transition>
        <transition name="u-animation" mode="out-in">
            <div class="l-welcome__article">
                <slot name="article"></slot>
            </div>
        </transition>
        <transition name="u-animation" mode="out-in">
            <div class="l-welcome__stats">
                <slot name="stats"></slot>
            </div>
        </transition>
        <transition name="u-animation" mode="out-in">
            <div class="l-welcome__map">
                <slot name="map"></slot>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    computed: {
        isMenuVisible() {
            return this.$store.state.navigation.isMenuVisible
        }
    }
}
</script>
<style scoped>
.l-welcome__grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: min-content 44vw var(--space-lg) min-content min-content;
    column-gap: var(--space);
    padding-bottom: calc(var(--space-xs) + var(--control-height))
}

.l-welcome__nav {
    z-index: 900;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    background: var(--color-gray-darkest);
    padding: var(--space-xs);
    border-top: 1px var(--color-gray-dark) solid;
    /* border: 2px yellow solid */
}

.l-welcome__map {
    grid-area: 5 / 1 / 6 / 13;
    margin: -50% calc(var(--space-lg) * -1) 0 calc(var(--space-lg) * -1);
    pointer-events: none
}

.l-welcome__video {
    grid-area: 2 / 1 / 3 / 13;
    /* border: 2px mediumspringgreen solid */
}

.l-welcome__article {
    grid-area: 4 / 1 / 5 / 13;
    position: relative;
    z-index: 1;
    /* border: 2px indianred solid */
}
/* 
.l-welcome__article > * {
    flex: 1
} */

.l-welcome__stats {
    grid-area: 5 / 1 / 6 / 13;
    display: flex;
    align-items: flex-end;
    padding-bottom: var(--space-lg);
    /* border: 2px purple solid */
}

@media only screen and (orientation: portrait) {
    
}
</style>