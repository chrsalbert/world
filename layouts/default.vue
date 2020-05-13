<template>
    <div class="layout">
        <div class="layout__nav">
            <MainNavigation />
        </div>
        <div class="layout__body">
            <div class="body">
                <nuxt/>
            </div>
        </div>
    </div>
</template>
<script>
import MainNavigation from '~/components/MainNavigation';

export default {
    components: {
        MainNavigation
    },
    data () {
        return {
            
        }
    }
}
</script>
<style scoped>
    .layout {
        box-sizing: content-box;
        display: grid;
        grid-template-rows: var(--header-height) minmax(0, 1fr);
        grid-template-columns: 1fr;
        min-height: 100vh;
        height: 100vh;
        max-width: var(--body-width);
        margin: 0 auto;
        padding: 0 var(--body-pad);
        overflow-x: hidden
    }

    .layout__nav {
        grid-area: 1 / 1 / 2 / 2;
        height: 100%;
    }

    .layout__body {
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
        .layout {
            grid-template-rows: minmax(0, var(--header-height)) minmax(0, 1fr);
            height: auto
        }
    }
</style>