<template>
    <div class="l-destination__grid">
        <div class="l-destination__nav">
            <div class="l-destination__navInner">
                <div class="l-destination__navInner__date">
                    <slot name="date"></slot>
                </div>
                <div class="l-destination__navInner__controls">
                    <slot name="prev"></slot>
                    <slot name="nav"></slot>
                    <slot name="next"></slot>
                </div>
                <div class="l-destination__navInner__step">
                    <slot name="step"></slot>
                </div>
            </div>
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
            <div class="l-destination__article__card">
                <slot name="article"></slot>
            </div>
        </div>
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
    background: var(--color-gray-darkest);
}

.l-destination__navInner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--body-width);
    margin: 0 auto;
    padding: var(--space-xs) var(--space-md);
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

.l-destination__navInner__controls {
    display: flex;
}

.l-destination__navInner__controls > * {
    margin: 0 var(--space-xs)
}

.l-destination__navInner__date,
.l-destination__navInner__step {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-gray)
}

.l-destination__navInner__step {
    text-align: right
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
    position: relative;
    z-index: 1;
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
        height: calc(100vh - 56px)
    }
    .l-destination__grid {
        grid-template-rows: auto 1fr 10rem;
    }
    .l-destination__title {
        grid-area: 1 / 8 / 2 / 13;
        padding: var(--space-2xl) 0 0
    }
    .l-destination__map {
        grid-area: 2 / 8 / 3 / 13
    }
    .l-destination__stats {
        grid-area: 3 / 8 / 4 / 13;
        display: flex;
        align-items: center;
        padding: 0 0 var(--space-sm) 0
    }
    .l-destination__cover {
        grid-area: 1 / 1 / 4 / 8
    }
    .l-destination__cover::after {
        display: none
    }
    .l-destination__article {
        grid-area: 1 / 1 / 4 / 8;
        display: flex;
        align-items: flex-end;
        padding: var(--space-sm)
    }
}

@media only screen and (min-width: 900px) and (min-height: 600px) {
    .l-destination__nav::before {
        background: none
    }
}

@media only screen and (min-width: 900px) and (max-height: 600px) {
    .l-destination__grid {
        height: auto;
        grid-template-rows: min-content minmax(10rem, 1fr) min-content;
        min-height: calc(100vh - 56px)
    }
}
</style>