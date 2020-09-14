<template>
	<div class="c-menu">
		<div class="c-menu__map">
			<destination-map-svg 
				:places="places" 
				:countries="countries" 
				:destinations="destinations" 
				:currentDestination="currentDestination"
				:currentDestinationIndex="currentDestinationIndex" />
		</div>
		<div class="c-menu__body">
			<div>
				<h2>Alle Stopps</h2>
				<ol class="menu" role="navigation">
					<li v-for="(destination, index) in destinations" :key="destination.id">
						<nuxt-link :to="`/destination/${ destination.id }`" :data-position="getStepNum(index)">{{ destination.title }}</nuxt-link>
					</li>
				</ol>
			</div>
			<div>
				<nuxt-link to="/ueber-diese-seite">Über diese Seite</nuxt-link> – <nuxt-link to="/impressum">Impressum</nuxt-link>
			</div>
		</div>
	</div>
</template>
<script>
import destinations from '~/static/data/destinations.json';

export default {
    props: {
        countries: {
            type: Array,
            required: true
        },
        places: {
            type: Array,
            required: true
        },
        destinations: {
            type: Array,
            required: true
        },
        currentDestination: {
            type: Object,
            required: true
        },
        currentDestinationIndex: {
            type: Number,
            required: true
        }
    },
	data () {
		return {
			destinations: destinations
		}
	},
	methods: {
		getStepNum(index) {
			index++
			return index < 10 ?  `0${index}` : index
		}
	}
}
</script>
<style scoped>
h2 {
	margin: var(--space-lg) 0 var(--space-md)
}

.c-menu {
	position: fixed;
	z-index: 1000;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow-y: scroll;
	padding: var(--header-height) var(--body-pad) var(--space-xl);
	background: var(--color-gray-darkest);
}

.c-menu__map {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: -1
}

.c-menu__body {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100%;
	max-width: var(--body-width);
	margin: 0 auto;
	padding: 0 var(--space-md)
}

.menu {
	column-count: 5;
}

.menu li {
	margin-bottom: var(--space-lg)
}

.menu a {
	z-index: 2;
	position: relative;
	display: block;
	text-overflow: ellipsis;
	padding: 0 var(--space-md) 0 1.5em;
	font-weight: 600;
	font-size: var(--font-size-md)
}

.menu a::before {
	z-index: -1;
	position: absolute;
	font-size: 1em;
	font-weight: 600;
	top: 50%;
	left: 0;
	text-align: right;
	transform: translateY(-50%);
	content: attr(data-position);
	opacity: .3
}

@media only screen and (max-width: 1240px) {
	.menu {
			column-count: 4
	}
}

@media only screen and (max-width: 900px) {
	.menu {
			column-count: 3
	}
	.menu li {
			margin-bottom: var(--space-md)
	}
}

@media only screen and (max-width: 600px) {
	.menu {
			column-count: unset;
			margin-bottom: var(--space-lg)
	}

	.menu li {
			margin-bottom: var(--space)
	}

	.c-menu__body {
			padding: 0 .25rem
	}
}
</style>