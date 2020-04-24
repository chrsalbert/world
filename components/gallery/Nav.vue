<template>
    <div class="m-toolbar">
        <nuxt-link :to="`/${country.id}/${prevPhotoId}`" class="a-button a-button--secondary">Vorheriges</nuxt-link>
        <span>{{ currentPhotoId + 1 }} / {{ galleryLength }}</span>
        <nuxt-link :to="`/${country.id}/${nextPhotoId}`" class="a-button a-button--secondary">Nächstes</nuxt-link>
    </div>
</template>
<script>
export default {
    props: {
        country: Object,
        currentPhotoId: Number,
        galleryLength: Number
    },
    computed: {
        prevPhotoId() {
            return this.currentPhotoId === 0 ? this.galleryLength : this.currentPhotoId
        },
        nextPhotoId() {
            return this.currentPhotoId === (this.galleryLength - 1) ? 1 : this.currentPhotoId + 2
        }
    }
}
</script>
<style>
    .m-toolbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-family-alt)
    }
</style>