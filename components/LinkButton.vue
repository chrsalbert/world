<template>
    <nuxt-link :to="href" class="button" :class="{ 'has-icon': hasIcon, 'is-transparent': isTransparent }"><span><slot ></slot></span><span v-html="getIcon"></span></nuxt-link>
</template>
<script>
import iconHome from "~/assets/images/icons/home.svg?raw"
import iconMenu from "~/assets/images/icons/menu.svg?raw"
import iconCross from "~/assets/images/icons/cross.svg?raw"
import iconArrowLeft from "~/assets/images/icons/arrow-left.svg?raw";
import iconArrowRight from "~/assets/images/icons/arrow-right.svg?raw";

export default {
    props: {
        href: String,
        classes: String,
        icon: String,
        type: String
    },
    data () {
        return {
            icons: {
                menu: iconMenu,
                home: iconHome,
                cross: iconCross,
                arrowLeft: iconArrowLeft,
                arrowRight: iconArrowRight
            }
        }
    },
    computed: {
        hasIcon() {
            return this.icon ? true : false
        },
        getIcon() {
            return this.icons[this.icon]
        },
        isTransparent() {
            return this.type == 'transparent'
        }
    }
}
</script>
<style scoped>
    .button {
        display: inline-block;
        padding: var(--space) var(--space-md);
        background: var(--color-primary);
        border-radius: var(--border-radius-xs);
        color: var(--color-secondary);
        font-weight: 600;
        line-height: 1em;
        letter-spacing: .1em;
        text-transform: uppercase;
        transition: border-color .1s;
    }

    .button:hover {
        background: #00BFE0
    }

    .button:not(.has-icon):hover span {
        color: var(--color-secondary);
        text-shadow: 2px 2px #00BFE0, 2px -2px #00BFE0, -2px 2px #00BFE0, -2px -2px #00BFE0;
        border-bottom: 2px solid var(--color-secondary);
    }

    .has-icon {
        width: 3rem;
        padding: var(--space-xs) 0;
        text-align: center;
    }

    .is-transparent {
        background: transparent
    }

    .is-transparent:hover {
        background: rgba(255,255,255,.1)
    }

    @media screen and (max-width: 600px) {
        .has-icon {
            padding: .5rem 0
        }
    }
</style>
<style>
    .button svg {
        vertical-align: middle;
    }
    .button.is-transparent svg g {
        fill: #fff
    }

    @media screen and (max-width: 600px) {
        .button svg {
            width: 2rem;
            height: 2rem;
        }
    }
</style>