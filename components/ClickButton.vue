<template>
    <button class="button" :class="{ 'icon': hasIcon, 'transparent': isTransparent }"><slot ></slot><span v-html="getIcon"></span></button>
</template>
<script>
import iconHome from "~/assets/images/icons/home.svg?raw"
import iconMenu from "~/assets/images/icons/menu.svg?raw"
import iconCross from "~/assets/images/icons/cross.svg?raw"

export default {
    props: {
        classes: String,
        icon: String,
        type: String
    },
    data () {
        return {
            icons: {
                menu: iconMenu,
                home: iconHome,
                cross: iconCross
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
        border: none;
        color: var(--color-secondary);
        font-weight: 600;
        line-height: 1em;
        letter-spacing: .1em;
        text-transform: uppercase;
        transition: border-color .1s;
    }

    .button:hover {
        background: var(--color-primary-s200)
    }

    .icon {
        width: 3rem;
        padding: var(--space-xs) 0;
        text-align: center;
    }
</style>
<style>
    .button svg {
        vertical-align: middle;
    }

    .button.transparent {
        background: transparent
    }

    .button.transparent svg g {
        fill: #fff
    }

    .button.transparent:hover {
        background: rgba(255,255,255,.1)
    }
</style>