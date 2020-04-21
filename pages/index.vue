<template>
  <div class="container">
    <div class="text">
      <h1>{{ currentAlbum }}</h1>
      {{ albums[currentAlbum].photos[currentPhoto].text }}
      <div class="toolbar">
        <p>
          <button v-on:click="toggleFullscreen()">Fullscreen</button>
        </p> 
        <p>
          {{ currentPhoto + 1 }} / {{ getAlbumLength }}
        </p>
        <select v-model="currentAlbum">
          <option v-for="(item, index) of albums" :key="item" :value="index">
            {{ item.title }}
          </option>
        </select>
        <p>
          <button v-on:click="prev">Prev</button>
          <button v-on:click="next">Next</button>
        </p>
      </div>
    </div>
    <div class="photo">
      <img :src="require(`~/assets/${albums[currentAlbum].photos[currentPhoto].url}`)"/>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Albums from '~/assets/data/photos.json'

export default {
  components: {
    Logo
  },
  data: function() {
    return {
      isFullscreen: false,
      currentAlbum: 0,
      currentPhoto: 0,
      albums: Albums,
    }
  },
  watch: {
    currentAlbum: function () {
      this.currentPhoto = 0
    },
    isFullscreen: function () {
      this.isFullscreen == true ? this.openFullscreen() : this.closeFullscreen()
    }
  },
  computed: {
    getAlbumLength() {
      return this.albums[this.currentAlbum].photos.length
    }
  },
  methods: {
    prev() {
      return this.currentPhoto = this.currentPhoto === 0 ? this.albums[this.currentAlbum].photos.length - 1 : this.currentPhoto - 1
    },
    next() {
      return this.currentPhoto = this.currentPhoto === this.albums[this.currentAlbum].photos.length - 1 ? 0 : this.currentPhoto + 1
    },
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
