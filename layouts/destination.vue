<template>
    <div class="l-destination">
        <Nuxt />
    </div>
</template>
<style scoped>
.l-destination {
    padding: var(--space-md)
}

@media only screen and (orientation: landscape) {
    /* 100vh work around to set "real" 100vh in iOS safari and other mobile browsers */
    .l-destination {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: min(100%, 1600px);
        height: min(100%, 1000px);
    }
}
</style>