import axios from 'axios'
import Countries from './static/data/countries.json'

const dynamicRoutes = [];
Countries.forEach(el => {
  dynamicRoutes.push(`journey/${el.id}`)
  // let album = require(`./static/data/albums/${el.id}.json`)
  // for(var i = 1; i <= album.length; i++) {
  //   dynamicRoutes.push(`${el.id}/${i}`)
  // }
});

export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=PT+Sans&display=swap'},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    middleware: 'pages'
  },
  generate: {
    routes: dynamicRoutes
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    // imageUrl: process.env.IMAGE_URL || 'https://cdn.statically.io/img/world-rosy.now.sh/images/'
    imageUrl: process.env.IMAGE_URL || 'http://localhost:3000/images'
  },
  loading: { color: '#fff' },
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/main.css'
  ],
  plugins: [
  ],
  modules: [
    '@nuxtjs/axios',
    "@nuxtjs/svg"
  ],
  axios: {
  },
  build: {
    extend (config, ctx) {
    }
  }
}
