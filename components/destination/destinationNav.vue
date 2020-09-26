<template>
    <div class="c-destination__nav">
        <div class="c-destination__nav__date">
            <destination-date 
                :country="currentDestination" />
        </div>
        <div class="c-destination__nav__controls">
            <app-button 
                icon="arrowLeft" 
                :href="prevDestinationUrl" 
                ref="prev">
            </app-button>
            <app-button v-on:click.native="toggleMenu()" tag="button" type="secondary" icon="route" v-if="!isMenuVisible" />
            <app-button v-on:click.native="toggleMenu()" tag="button" type="secondary" icon="cross" v-if="isMenuVisible" />
            <app-button 
                icon="arrowRight" 
                :href="nextDestinationUrl" 
                ref="next">
            </app-button>
        </div>
        <div class="c-destination__nav__step">
            <destination-step 
                :destinations="destinations"
                :currentDestinationIndex="currentDestinationIndex" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        destinations: {
            type: Array,
            required: true
        },
        currentDestination: {
            type: Object,
            required: true
        },
        currentDestinationIndex: {
            type: Number,
            required: true
        }        
    },
    computed: {
        isMenuVisible() {
            return this.$store.state.navigation.isMenuVisible
        },
        prevDestinationIndex() {
            return this.currentDestinationIndex === 0 ? this.destinations.length - 1 : this.currentDestinationIndex - 1
        },
        nextDestinationIndex() {
            return this.currentDestinationIndex === (this.destinations.length - 1) ? 0 : this.currentDestinationIndex + 1
        },
        prevDestinationUrl() {
            return `/destination/${this.destinations[this.prevDestinationIndex].id}`
        },
        nextDestinationUrl() {
            return `/destination/${this.destinations[this.nextDestinationIndex].id}`
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('navigation/SET_IS_MENU_VISIBLE', !this.isMenuVisible)
        }
    },
    mounted() {
        window.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 37:
                    this.$router.push({ path: this.prevDestinationUrl })
                    break;
                case 39:
                    this.$router.push({ path: this.nextDestinationUrl })
                    break;
            }
        })
    }
}
</script>
<style scoped>
.c-destination__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--body-width);
    margin: 0 auto;
    padding: var(--space-xs) var(--space-md);
}

.c-destination__nav__controls {
    display: flex;
}

.c-destination__nav__controls > * {
    margin: 0 var(--space-xs)
}

.c-destination__nav__date,
.c-destination__nav__step {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-gray)
}

.c-destination__nav__step {
    text-align: right
}
</style>