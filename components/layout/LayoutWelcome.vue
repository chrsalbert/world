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
    margin-bottom: var(--space-xl);
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
    width: 100%;
    transition: all .8s ease-in-out
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
<style>
@media only screen and (min-width: 600px) {
    .layout-enter-active,
    .layout-leave-active {
        transition: opacity .85s;
    }
    .layout-enter-active .l-welcome__article__stats {
        transition: all .4s ease-in-out .1s
    }

    .layout-leave-active .l-welcome__article__stats {
        transition: all .5s ease-in-out
    }

    .layout-leave .l-welcome__article__stats,
    .layout-enter-to .l-welcome__article__stats {
        transform: translate3d(-50%, -50%, 0)
    }

    .layout-enter .l-welcome__article__stats,
    .layout-leave-to .l-welcome__article__stats {
        transform: translate3d(-50%, -300%, 0)
    }

    .layout-enter-active .l-welcome__article {
        transition: all .4s ease-in-out
    }

    .layout-leave-active .l-welcome__article {
        transition: all .4s ease-in-out .1s
    }

    .layout-leave .l-welcome__article,
    .layout-enter-to .l-welcome__article {
        transform: translateY(0)
    }

    .layout-enter .l-welcome__article,
    .layout-leave-to .l-welcome__article {
        transform: translateY(calc(-1 * calc(50vh + 100%)))
    }

    .layout-leave .l-welcome__video,
    .layout-enter-to .l-welcome__video {
        opacity: 1
    }

    .layout-enter .l-welcome__video,
    .layout-leave-to .l-welcome__video {
        opacity: 0
    }
}
</style>