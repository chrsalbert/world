<template>
    <div class="c-layout">
        <div class="c-layout__nav">
            <the-navigation />
        </div>
        <div class="c-layout__body">
            <div class="body">
                <nuxt/>
            </div>
        </div>
    </div>
</template>
<style scoped>
.c-layout {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(12, 1fr);
    min-height: 100vh;
    height: 100vh;
    max-width: var(--body-width);
    margin: 0 auto;
    padding: 0 var(--body-pad);
    overflow-x: hidden
}

.c-layout__nav {
    grid-area: 1 / 1 / 2 / 2;
}

.c-layout__body {
    grid-area: 1 / 1 / 2 / 13;
    display: flex;
    justify-content: center;
    align-items: center;
}

.body {
    height: 100%;
    max-height: 48rem;
}

.body > * {
    height: 100%;
}

@media only screen and (orientation: portrait) {
    .body {
        max-height: none;
    }
}

@media only screen and (orientation: portrait) and (max-width: 600px) {
    .c-layout {
        grid-template-rows: minmax(0, var(--header-height)) minmax(0, 1fr);
        height: auto
    }
}
</style>