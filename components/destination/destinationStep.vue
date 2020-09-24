<template>
    <transition name="c-destination__step" mode="out-in">
        <span class="c-destination__step" :key="currentDestinationIndex">
            {{ step }} <em>von</em><span>/</span> {{ destinationCount }}
        </span>
    </transition>
</template>
<script>
export default {
    props: {
        destinations: {
            type: Array,
            required: true
        },
        currentDestinationIndex: {
            type: Number,
            required: true
        }
    },
    computed: {
        step() {
            let index = this.currentDestinationIndex
            index++
            return index < 10 ?  `0${index}` : index
        },
        destinationCount() {
            return this.destinations.length
        }
    }
}
</script>
<style scoped>
    .c-destination__step em {
        font-style: italic
    }

    .c-destination__step span {
        display: none
    }
   
    .c-destination__title-leave { transform: translateX(0);opacity: 1 }
    .c-destination__title-leave-to { transform: translateX(-2em);opacity: 0 }
    .c-destination__title-enter { transform: translateX(2em);opacity: 0 }
    .c-destination__title-enter-to { transform: translateX(0);opacity: 1 }

    @media screen and (max-width: 600px) {
        .c-destination__step em {
            display: none
        }

        .c-destination__step span {
            display: inline
        }
    }
</style>