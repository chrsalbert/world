<template>
    <div class="l-default">
        <app-grid>
            <div class="l-default__nav">
                <the-nav />
            </div>
            <div class="l-destination__menu" v-show="isMenuVisible" key="menu">
                <the-menu />
            </div>
            <div class="l-default__body">
                <Nuxt />
            </div>
        </app-grid>
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
.l-default {
    padding: var(--space-md)
}

.l-default__nav {
    grid-area: 1 / 1 / 2 / 2;
}

.l-default__body {
    grid-area: 1 / 2 / 2 / 13
}

.l-destination__menu {
    grid-area: 1 / 2 / 2 / 13;
    position: relative;
    z-index: 100;
    overflow: hidden;
}
</style>