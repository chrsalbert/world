<template>
    <nav>
        <nuxt-link :to="`/${country.id}/${prevPhotoId}`" class="a-button a-button--icon" v-html="iconArrowLeft"></nuxt-link>
        <span>{{ photoId + 1 }} / {{ albumLength }}</span>
        <nuxt-link :to="`/${country.id}/${nextPhotoId}`" class="a-button a-button--icon" v-html="iconArrowRight"></nuxt-link>
    </nav>
</template>
<script>
import iconArrowLeft from "~/assets/images/icons/arrow-left.svg?raw";
import iconArrowRight from "~/assets/images/icons/arrow-right.svg?raw";

export default {
    props: {
        country: Object,
        photoId: Number,
        albumLength: Number
    },
    data () {
        return {
            iconArrowLeft,
            iconArrowRight
        }
    },
    computed: {
        prevPhotoId() {
            return this.photoId === 0 ? this.albumLength : this.photoId
        },
        nextPhotoId() {
            return this.photoId === (this.albumLength - 1) ? 1 : this.photoId + 2
        }
    },
    mounted() {
        window.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case 27:
                    window.location.href = `/${this.country.id}`;
                    break;
                case 37:
                    window.location.href = `/${this.country.id}/${this.prevPhotoId}`;
                    break;
                case 39:
                    window.location.href = `/${this.country.id}/${this.nextPhotoId}`;
                    break;
            }
        })
    }
}
</script>
<style scoped>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media only screen and (min-width: 600px) {
        nav > * {
            position: absolute
        }

        a {
            top: 50%;
            transform: translateY(-50%)
        }

        a:first-child {
            left: 0;
        }

        a:last-child {
            right: 0;
        }

        span {
            bottom: calc(calc(var(--header-height) / 2) * -1);
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>