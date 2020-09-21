<template>
    <div class="l-welcome">
        <Nuxt />
    </div>
</template>
<style scoped>
.l-welcome {
    max-width: var(--body-width);
    padding: var(--space-lg);
    margin: 0 auto
}

@media only screen and (orientation: landscape) {
    /* 100vh work around to set "real" 100vh in iOS safari and other mobile browsers */
    /* .l-welcome {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        height: min(100vh, 1000px);
        width: 100%;
        max-width: calc(min(100vh, 1000px) * 1.77);
    } */
}

</style>