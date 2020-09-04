<template>
	<span class="c-icon" v-html="icons[icon]"></span>
</template>
<script>
import iconRoute from "~/assets/images/icons/route.svg?raw"
import iconHome from "~/assets/images/icons/home.svg?raw"
import iconBuilding from "~/assets/images/icons/building.svg?raw"
import iconMenu from "~/assets/images/icons/menu.svg?raw"
import iconTransport from "~/assets/images/icons/transport.svg?raw"
import iconCross from "~/assets/images/icons/cross.svg?raw"
import iconArrowLeft from "~/assets/images/icons/arrow-left.svg?raw";
import iconArrowRight from "~/assets/images/icons/arrow-right.svg?raw";

export default {
	props: {
		icon: String
	},
	data () {
		return {
			icons: {
				home: iconHome,
				route: iconRoute,
				building: iconBuilding,
				transport: iconTransport,
				menu: iconMenu,
				cross: iconCross,
				arrowLeft: iconArrowLeft,
				arrowRight: iconArrowRight
			}
		}
	}
}
</script>
<style scoped>
.c-icon {
	display: inline-block
}
.c-icon >>> svg {
	width: 100%;
	height: 100%;
	stroke: var(--text-color)
}
</style>