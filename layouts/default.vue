<template>
    <div class="grid">
        <div class="grid__nav">
            <MainNavigation />
        </div>
        <div class="grid__body">
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
    .grid {
        display: grid;
        grid-template-rows: 80px minmax(0, 1fr);
        grid-template-columns: 1fr;
        height: 100vh;
    }

    .grid__nav {
        grid-area: 1 / 1 / 2 / 2;
        height: 100%;
    }

    .grid__body {
        display: flex;
        align-items: center;
    }

    .body {
        height: 100%;
        max-height: 48rem;
    }

    .body > * {
        height: 100%;
    }
</style>