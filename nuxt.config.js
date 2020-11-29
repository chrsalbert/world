import destinations from './static/data/destinations.json'

const dynamicRoutes = [];
destinations.forEach(el => {
  dynamicRoutes.push(`destination/${el.id}`)
  // let album = require(`./static/data/albums/${el.id}.json`)
  // for(var i = 1; i <= album.length; i++) {
  //   dynamicRoutes.push(`${el.id}/${i}`)
  // }
});
export default {
	mode: 'universal',
	layoutTransition: {
		name: 'layout',
		mode: 'out-in'
	},
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Montserrat:wght@400;600&display=swap'},
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	components: true,
	generate: {
		routes: dynamicRoutes
	},
	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000',
		imageUrl: process.env.IMAGE_URL || 'http://localhost:3000/images'
	},
	loading: { color: '#fff' },
	css: [
		'~/assets/css/reset.css',
		'~/assets/css/main.css'
	],
	modules: [
		"@nuxtjs/svg"
	]
}
