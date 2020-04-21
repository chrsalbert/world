<template>
  <div class="container">
    <div class="text">
      <h1>{{ title }}</h1>
      {{ text }}
      <div class="toolbar">
        <p>
          <button v-on:click="toggleFullscreen()">Fullscreen</button>
        </p> 
        <p>
          {{ photoId }} / {{ albumLength }}
        </p>
        <p>
          <nuxt-link :to="`/trips/${trip.id}/gallery/${prevPhotoId}`">Prev</nuxt-link>
          <nuxt-link :to="`/trips/${trip.id}/gallery/${nextPhotoId}`">Next</nuxt-link>
        </p>
      </div>
    </div>
    <div class="photo">
      <img :src="require(`~/assets/images/${album.photos[this.photoIndex].url}`)"/>
    </div>
  </div>
</template>

<script>
import Albums from '~/assets/data/photos.json'
import Trips from '~/assets/data/trips.json';

export default {
  data: function() {
    return {
      albums: Albums,
      trips: Trips,
      isFullscreen: false,
      tripId: this.$route.params.trip,
      photoId: parseInt(this.$route.params.id),
    }
  },
  watch: {
    isFullscreen: function () {
      this.isFullscreen == true ? this.openFullscreen() : this.closeFullscreen()
    }
  },
  computed: {
    photoIndex() {
      return parseInt(this.photoId - 1)
    },
    trip() {
      return this.trips.find(trip => trip.id === this.tripId)
    },
    album() {
      return this.albums.find(album => album.id === this.trip.galleryId)
    },
    photo() {
      return this.album.photos[this.photoIndex]
    },
    title() {
      return this.trip.title
    },
    text() {
      return this.album.photos[this.photoIndex].text
    },
    albumLength() {
      return this.album.photos.length
    },
    prevPhotoId() {
      return this.photoId === 1 ? this.albumLength : this.photoId - 1
    },
    nextPhotoId() {
      return this.photoId === this.albumLength ? 1 : this.photoId + 1
    }
  },
  methods: {
    toggleFullscreen: function(){
      this.isFullscreen = !this.isFullscreen
    },
    openFullscreen() {
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { 
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    },
    closeFullscreen() {
      var elem = document.documentElement;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }
}
</script>

<style>
  .toolbar {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .container {
    margin: 0 auto;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 12fr 1fr;
    grid-template-rows: 1fr 16fr 1fr;
  }
  button {
    height: 20px;
    background: black;
    color: #fff;
    border: none;
  }
  .text {
    border-top: 2px #000 solid;
    padding-top: 1rem;
    position: relative;
    grid-column-start: 2;
    grid-row-start: 2;
    font-family: 'Baloo Paaji 2';
    line-height: 1.5;
    font-size: 14px;
    /* background: #f0f0f0 */
  }

  .photo {
    grid-column-start: 4;
    grid-row-start: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: chocolate; */
  }

  .photo img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
