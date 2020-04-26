<template>
    <div class="m-toolbar">
        <nuxt-link :to="`/${country.id}/${prevPhotoId}`" class="a-button a-button--secondary">Vorheriges</nuxt-link>
        <span>{{ photoId + 1 }} / {{ albumLength }}</span>
        <nuxt-link :to="`/${country.id}/${nextPhotoId}`" class="a-button a-button--secondary">Nächstes</nuxt-link>
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
    }
}
</script>
<style>
    .m-toolbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>