<template>
    <div class="l-default">
        <Nuxt />
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
    padding: var(--space-md);
    max-width: var(--body-width);
    margin: 0 auto
}
</style>