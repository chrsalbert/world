<template>
    <div class="l-welcome">
        <div class="l-welcome__video">
            <slot name="video"></slot>
        </div>
        <div class="l-welcome__article">
            <slot name="article"></slot>
            <div class="l-welcome__article__stats">
                <slot name="stats"></slot>
            </div>
        </div>
        <div class="l-welcome__imprint">
            <slot name="imprint"></slot>
        </div>
    </div>
</template>
<style scoped>
.l-welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--space-md)
}

.l-welcome__article {
    position: relative;
    z-index: 1;
    margin-bottom: var(--space-xl)
}

.l-welcome__imprint {
    position: fixed;
    right: var(--space-sm);
    bottom: var(--space-sm);
}

.l-welcome__article__stats {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, -50%, 0)
}

.l-welcome__video {
    width: 100%
}

@media only screen and (min-width: 600px) {
    .l-welcome {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        align-items: flex-start
    }

    .l-welcome__article {
        margin: 0 0 0 10vw
    }

    .l-welcome__video {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        margin: 0
    }
}
</style>