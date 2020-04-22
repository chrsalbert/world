import Trips from './static/data/trips.json';
import Gallery from './static/data/photos.json';

const dynamicRoutes = [];
Trips.forEach(el => {
  dynamicRoutes.push(`trips/${el.id}`)
  if(el.galleryId) { 
    console.log(`checking ${el.galleryId}`)
    var album = Gallery.find(item => item.id == el.galleryId)
    if(album) {
      console.log('YYY');
      for(var i = 0; i < album.photos.length; i++) {
          dynamicRoutes.push(`trips/${el.id}/gallery/${i + 1}`)
      }
    }
  }
});

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  generate: {
    routes: dynamicRoutes
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/main.css',
    '~/assets/css/layouts/index.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
