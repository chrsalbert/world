<template>
	<div class="c-menu">
		<div class="c-menu__header">
			<nuxt-link
				to="/" data-position="00" class="c-menu__link">
					Startseite
			</nuxt-link>
			<app-button v-on:click.native="closeMenu()" tag="button" type="secondary" icon="cross" />
		</div>
		<div class="c-menu__body">
			<ol class="menu" role="navigation">
				<li v-for="(destination, index) in destinations" :key="destination.id">
					<nuxt-link 
						class="c-menu__link" 
						:to="`/destination/${ destination.id }`" 
						:data-position="getStepNum(index)">
							{{ destination.title }}
					</nuxt-link>
				</li>
			</ol>
		</div>
	</div>
</template>
<script>
import destinations from '~/static/data/destinations.json';
import countries from '~/static/data/countries.json';
import places from '~/static/data/places.json';

export default {
    data () {
        return { destinations, countries, places }
    },
    props: {
        currentDestination: {
            type: Object,
            required: true
        },
        currentDestinationIndex: {
            type: Number,
            required: true
        }
    },
	methods: {
		getStepNum(index) {
			index++
			return index < 10 ?  `0${index}` : index
		},
        closeMenu() {
            this.$store.commit('navigation/SET_IS_MENU_VISIBLE', false)
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
	position: fixed;
	z-index: 999;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: space-between;
	/* height: 100%; */
	background: var(--color-gray-darkest);
	padding: var(--space-lg);
	/* max-height: 80vh; */
	/* border: 2px white dotted */
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