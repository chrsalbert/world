<template>
    <div class="l-destination">
        <div class="l-destination__grid">
            <div class="l-destination__nav">
                <the-nav />
            </div>
            <div class="l-destination__date">
                <slot name="date"></slot>
            </div>
            <div class="l-destination__header">
                <slot name="header"></slot>
            </div>
            <div class="l-destination__cover">
                <slot name="cover"></slot>
            </div>
            <div class="l-destination__article">
                <slot name="article"></slot>
            </div>
            <div class="l-destination__prev">
                <slot name="prev"></slot>
            </div>
            <div class="l-destination__next">
                <slot name="next"></slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
.l-destination {
    padding: 24px;
}

.l-destination__grid {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 16px;
}

.l-destination__nav {
    grid-area: 1 / 1 / 2 / 2;
}

.l-destination__date {
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding-bottom: calc(var(--space-md) + var(--space-xs))
}

.l-destination__cover {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius-lg) var(--border-radius) var(--border-radius);
    grid-area: 1 / 2 / 2 / 8;
}

.l-destination__article {
    position: relative;
    grid-area: 1 / 2 / 2 / 8;
}

.l-destination__header {
    grid-area: 1 / 8 / 2 / 13;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    overflow: hidden;
    padding-bottom: calc(var(--space-md) + var(--space-xs))
}

.l-destination__prev {
    grid-area: 1 / 1 / 2 / 2;
}

.l-destination__next {
    grid-area: 1 / 12 / 2 / 13;
}

.l-destination__prev,
.l-destination__next {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.l-destination__next {
    align-items: flex-end;
}

@media only screen and (orientation: portrait) {
    .l-destination {
        position: static
    }

    .l-destination__grid {
        grid-template-rows: min-content 10rem auto;
    }

    .l-destination__nav {
        grid-area: 1 / 1 / 4 / 2;
    }

    .l-destination__cover {
        grid-area: 2 / 1 / 4 / 9;
    }

    .l-destination__article {
        grid-area: 3 / 6 / 4 / 13;
    }

    .l-destination__header {
        grid-area: 1 / 1 / 2 / 13;
        padding-bottom: var(--space-2xl)
    }
}
</style>