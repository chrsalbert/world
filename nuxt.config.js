import Countries from './static/data/countries.json'

const dynamicRoutes = [];
Countries.forEach(el => {
  dynamicRoutes.push(`${el.id}`)
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    middleware: 'pages'
  },
  generate: {
    routes: dynamicRoutes
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
    '@aceforth/nuxt-optimized-images'
  ],
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: false
  },
  axios: {
  },
  build: {
    extend (config, ctx) {
    }
  }
}
