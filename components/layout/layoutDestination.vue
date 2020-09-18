<template>
    <div class="l-destination__grid">
        <div class="l-destination__nav">
            <slot name="prev"></slot>
            <slot name="nav"></slot>
            <slot name="next"></slot>
        </div>
        <transition name="u-animation" mode="out-in">
            <div class="l-destination__cover">
                <div class="l-destination__coverWrapper">
                    <slot name="cover"></slot>
                </div>
            </div>
        </transition>
        <transition name="u-animation" mode="out-in">
            <div class="l-destination__header" v-show="!isMenuVisible">
                <slot name="header"></slot>
            </div>
        </transition>
        <transition name="u-animation" mode="out-in">
            <div class="l-destination__article" v-show="!isMenuVisible">
                <slot name="article"></slot>
            </div>
        </transition>
        <div class="l-destination__next">
        </div>
        <div class="l-destination__prev" >
        </div>
        <!-- <div class="l-destination__date" v-show="!isMenuVisible">
            <slot name="date"></slot>
        </div> -->
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
.l-destination__grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 60vw min-content  1fr;
    column-gap: var(--space);
    padding-bottom: calc(var(--space-xs) + var(--control-height));
    overflow: hidden
}

.l-destination__nav {
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
}

.l-destination__cover {
    position: relative;
    grid-area: 1 / 1 / 2 / 13;
}

.l-destination__cover::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40%;
    background: linear-gradient(rgba(var(--color-gray-darkest-rgb), 0) 0%, rgba(var(--color-gray-darkest-rgb), 1) 90%)
}

.l-destination__coverWrapper {
    position: relative;
    height: 100%;
    margin: 0 auto;
    max-width: 70vw;
}

.l-destination__header {
    grid-area: 2 / 1 / 3 / 13;
}

.l-destination__article {
    grid-area: 3 / 1 / 4 / 13;
}

.l-destination__prev {
    grid-area: 1 / 1 / 2 / 2;
}

.l-destination__next {
    grid-area: 1 / 12 / 2 / 13;
}

.u-animation-leave-active,
.u-animation-enter-active { transition: all .3s var(--timing-function); }
.u-animation-leave { opacity: 1 }
.u-animation-leave-to { opacity: 0 }
.u-animation-enter { opacity: 0 }
.u-animation-enter-to { opacity: 1 }

</style>