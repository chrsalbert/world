<template>
    <div class="l-gallery__navigation">
        <nuxt-link :to="`/${country.id}/${prevPhotoId}`" class="a-button a-button--icon"><img src="/icons/arrow-left.svg" /></nuxt-link>
        <span>{{ photoId + 1 }} / {{ albumLength }}</span>
        <nuxt-link :to="`/${country.id}/${nextPhotoId}`" class="a-button a-button--icon"><img src="/icons/arrow-right.svg"></nuxt-link>
    </div>
</template>
<script>
export default {
    props: {
        country: Object,
        photoId: Number,
        albumLength: Number
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