<template>
    <div class="c-destination__map">
        <destination-map-svg 
            :currentDestination="currentDestination"
            :currentDestinationIndex="currentDestinationIndex" />
    </div>
</template>
<script>
export default {
    props: {
        currentDestination: {
            type: Object,
            required: true
        },
        currentDestinationIndex: {
            type: Number,
            required: true
        }
    }
}
</script>
<style scoped>
.c-destination__map {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: calc(32vh * 1.25);
    margin: 0 auto;
}
.c-destination__map::before {
    content:'';
    position: absolute;
    pointer-events: none;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: 
        linear-gradient(
            to bottom, 
            rgba(var(--color-gray-darkest-rgb),1) 0%,
            rgba(var(--color-gray-darkest-rgb),0) 20%,
            rgba(var(--color-gray-darkest-rgb),0) 80%,
            rgba(var(--color-gray-darkest-rgb),1) 99%
        ),
        linear-gradient(
            to right,
            rgba(var(--color-gray-darkest-rgb),1) 0%,
            rgba(var(--color-gray-darkest-rgb),0) 20%,
            rgba(var(--color-gray-darkest-rgb),0) 80%,
            rgba(var(--color-gray-darkest-rgb),1) 99%
        )
}
/* .c-destination__map::after {
    content:'';
    z-index: -1;
    position: absolute;
    pointer-events: none;
    border: 1px red solid;
    z-index: 1;
    top: 20%;
    right: 20%;
    bottom: 20%;
    left: 20%;
}
.c-destination__map::before {
    content:'';
    z-index: -1;
    position: absolute;
    pointer-events: none;
    border: 1px red solid;
    z-index: 1;
    top: 15%;
    right: 15%;
    bottom: 15%;
    left: 15%;
    background: none
} */

/* @media only screen and (orientation: portrait) {
    .c-destination__map {
        flex: auto;
        height: 60vw;
    }
} */
</style>