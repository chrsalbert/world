<template>
	<transition name="c-menu">
		<ol id="menu" class="c-menu" key="currentDestinationIndex" :style="{ '--offsetLeft': `${offsetLeft * -1}px` }">
			<li v-for="(destination, index) in destinations" 
				:key="destination.id"
				:id="`destination${index}`"
				:ref="`destination${index}`"
				:style="{ '--width': `${destination.stats.days * 1.5}vw` }"
				class="c-menu__item">
				<nuxt-link class="c-menu__title" :to="`/destination/${destination.id}`">
					{{ destination.title }}
				</nuxt-link>
				<div class="c-menu__line">

				</div>
			</li>
		</ol>
	</transition>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			offsetLeft: 0
		}
	},
	mounted() {
		this.scrollToCurrentDestination()
	},
	computed: {
        ...mapGetters({
            currentDestinationIndex: 'destination/getCurrentDestinationIndex',
            currentDestination: 'destination/getCurrentDestination',
			destinations: 'destination/getDestinations',
			places: 'destination/getPlaces',
			countries: 'destination/getCountries',
        })
	},
	methods: {
		scrollToCurrentDestination() {
			let currentNode = document.querySelector(`#destination${this.currentDestinationIndex}`).getBoundingClientRect().x
			let firstNode = document.querySelector(`#destination0`).getBoundingClientRect().x
			let offset = currentNode - firstNode
			document.querySelector('#menu').scrollTo({
				left: offset,
				behavior: 'smooth'
			});
		}
	},
	watch: {
		'$store.state.navigation.isMenuVisible': {
			handler: function(nv) {
				this.scrollToCurrentDestination()
			}
		},
		'$store.state.destination.currentDestinationIndex': {
			handler: function(nv) {
				this.scrollToCurrentDestination()
			}
		}
	}
}
</script>
<style scoped>
h3 {
	margin: 0;
	font-weight: var(--font-weight-bold);
	color: var(--color-gray-light)
}

.c-menu {
	--height: 10rem;
	position: absolute;
	z-index: 1;
	height: var(--height);
	top: -2px;
	right: 0;
	left: 0;
	display: flex;
	background: linear-gradient(rgba(var(--color-gray-darkest-rgb), 0), var(--color-gray-darkest) 50%);
	transition: transform .6s var(--timing-function);
	transform: translateY(calc(var(--height) * -1));
	overflow-x: scroll;
    overflow-y: hidden;
	padding: 0 0 1rem calc(50% - .5rem);
}

.c-menu-enter,
.c-menu-leave-to { transform: translateY(0);opacity: 0 }
.c-menu-leave,
.c-menu-enter-to { transform: translateY(calc(var(--height) * -1));opacity: 1 }

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: .5rem;
  height: .5rem;
}

::-webkit-scrollbar-thumb {
  border-radius: .5rem;
  background-color: var(--color-gray-dark);
}

.c-menu__item {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
	width: var(--width);
	min-width: 2rem;
    height: 100%;
    justify-content: flex-end;
}

.c-menu__line {
	position: relative;
	width: 100%;
	height: 2px;
	background: var(--color-primary)
}

.c-menu__line::before {
	content: '';
	position: absolute;
	top: -0.5rem;
	left: 0;
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
	background: var(--color-gray-darker);
	border: 2px var(--color-primary) solid
}

.c-menu__title {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	transform: rotate(-45deg) translate(.5rem, .5rem);
	transform-origin: bottom left;
	margin-bottom: var(--space-md);
	width: 300%;
	font-weight: var(--font-weight-bold);
	text-shadow: var(--shadow-lg);
}

.c-menu__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px var(--color-gray-dark) solid;
	padding-bottom: var(--space-md)
}

.c-menu__body {
	flex: 1;
	overflow-y: scroll;
	padding: var(--space-md) 0;
}

.c-menu__link {
	z-index: 2;
	position: relative;
	display: block;
	text-overflow: ellipsis;
	padding: var(--space-xs) var(--space-md) var(--space-xs) 2em;
	font-weight: var(--font-weight-bold);
	font-size: var(--font-size-md);
}

.c-menu__link::before {
	z-index: 1;
	position: absolute;
	font-size: 1em;
	font-weight: 600;
	top: 50%;
	left: 0;
	text-align: right;
	transform: translateY(-50%);
	content: attr(data-position);
	color: var(--color-gray-dark)
}
</style>