<template>
    <div class="l-default">
        <Nuxt />
    </div>
</template>
<script>
export default {
    layoutTransition: {
        name: 'layout',
        mode: 'out-in'
    },
    computed: {
        isMenuVisible() {
            return this.$store.state.navigation.isMenuVisible
        }
    }
}
</script>
<style scoped>
.l-default {
    padding: var(--space-md);
    max-width: var(--body-width);
    margin: 0 auto
}
.layout-enter-active,
.layout-leave-active {
  transition: opacity 10s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
</style>