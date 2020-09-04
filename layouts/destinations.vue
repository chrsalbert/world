<template>
    <div class="l-destinations">
        <Nuxt />
    </div>
</template>
<style scoped>
.l-destinations {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: min(100%, 1600px);
    height: min(100%, 1000px);
    padding: 24px;
    display: flex;
}

.l-destinations > * {
    flex: 1;
}
</style>