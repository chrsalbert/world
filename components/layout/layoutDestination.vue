<template>
    <div class="l-destination__grid">
        <div class="l-destination__nav">
            <slot name="prev"></slot>
            <slot name="nav"></slot>
            <slot name="next"></slot>
        </div>
        <div class="l-destination__cover">
            <slot name="cover"></slot>
        </div>
        <div class="l-destination__title">
            <slot name="title"></slot>
        </div>
        <div class="l-destination__map">
            <slot name="map"></slot>
        </div>
        <div class="l-destination__stats">
            <slot name="stats"></slot>
        </div>
        <div class="l-destination__article">
            <slot name="article"></slot>
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
    grid-template-rows: 32vh 2rem min-content 32vh min-content;
    column-gap: var(--space);
    padding-bottom: calc(var(--space-xs) + var(--control-height));
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
}

.l-destination__nav::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    border-bottom: 1px var(--color-gray-dark) solid;
    height: 3rem;
    background: linear-gradient(rgba(var(--color-gray-darkest-rgb), 0) 0%, rgba(var(--color-gray-darkest-rgb), 1) 90%)
}

.l-destination__cover {
    position: relative;
    grid-area: 1 / 1 / 3 / 13;
}

.l-destination__cover::after {
    content: '';
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40%;
    background: linear-gradient(rgba(var(--color-gray-darkest-rgb), 0) 0%, rgba(var(--color-gray-darkest-rgb), 1) 90%)
}

.l-destination__title {
    position: relative;
    z-index: 1;
    grid-area: 2 / 1 / 4 / 13;
    text-align: center;
}

.l-destination__map {
    grid-area: 4 / 1 / 5 / 13;
}

.l-destination__stats {
    grid-area: 5 / 1 / 6 / 13;
}

.l-destination__article {
    grid-area: 6 / 1 / 7 / 13;
    padding: var(--space-lg) 0
}

.u-animation-leave-active,
.u-animation-enter-active { transition: all .3s var(--timing-function); }
.u-animation-leave { opacity: 1 }
.u-animation-leave-to { opacity: 0 }
.u-animation-enter { opacity: 0 }
.u-animation-enter-to { opacity: 1 }


@media only screen and (min-width: 900px) {
    .l-destination__grid {
        grid-template-rows: 30vh 15vh 1fr;
        column-gap: var(--space);
    }

    .l-destination__cover {
        grid-area: 1 / 1 / 3 / 13
    }

    .l-destination__article {
        grid-area: 2 / 3 / 4 / 11;
        background: var(--color-gray-darker);
        border-radius: var(--border-radius);
        padding: var(--space-lg);
        box-shadow: var(--shadow-lg);
    }

    .l-destination__stats {
        grid-area: 4 / 1 / 5 / 13;
    }
}
</style>