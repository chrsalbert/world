<template>
    <div>
        <div class="c-theNav">
            <app-button v-on:click.native="toggleMenu()" tag="button" type="secondary" icon="route" v-if="!isMenuVisible" />
            <app-button v-on:click.native="toggleMenu()" tag="button" type="secondary" icon="cross" v-if="isMenuVisible" />
            <the-menu 
                v-if="isMenuVisible"
                :currentDestination="currentDestination" 
                :currentDestinationIndex="currentDestinationIndex" />
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        isMenuVisible() {
            return this.$store.state.navigation.isMenuVisible
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('navigation/SET_IS_MENU_VISIBLE', !this.isMenuVisible)
        }
    }
}
</script>
<style scoped>
.c-theNav {
    max-width: var(--body-width);
    margin: 0 auto
}
</style>