<template>
    <div class="country-item item">
        <figure class="cover">
            <img class="a-photo" :src="getImageUrl(`cover/${country.cover}?w=800&h=700&quality=80&f=auto`)" />
        </figure>
        <div class="text">
            <div>
                <h2 class="a-sectionH1">{{ country.title }}</h2>
                <p class="a-subline">{{ country.time.from }} – {{ country.time.to }}</p>
                <FactsList :facts="getFacts" />
                <nuxt-link :to="`/${country.id}`" class="a-button" v-if="country.photoCount > 0">
                    {{ country.photoCount }} Fotos
                    <span v-html="iconArrowRight"></span>
                </nuxt-link>
                <nuxt-link class="a-button a-button--icon button-more" :to="`/${country.id}`" v-html="iconArrowRight"></nuxt-link>
            </div>
            <div>
                <svg width="500px" height="300px" viewBox="0 0 500 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->
                    <title>Artboard 2</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <polygon id="PL" fill="#F3F3F3" points="258.41573 21.9101124 219.651685 21.0674157 215.438202 9.26966292 174.988764 0 126.955056 17.6966292 67.1235955 41.2921348 41 55.6179775 52.7977528 81.741573 42.6853933 95.2247191 59.5393258 113.764045 71.3370787 141.573034 70.494382 159.269663 89.8764045 192.134831 110.101124 208.146067 141.280899 213.202247 140.438202 227.52809 163.191011 237.640449 168.247191 225 196.898876 230.05618 202.797753 246.910112 233.134831 249.438202 255.044944 275.561798 257.573034 278.932584 273.58427 271.348315 296.337079 289.88764 319.932584 278.932584 340.157303 283.988764 368.808989 277.247191 410.101124 296.629213 419.370787 300 405.88764 276.404494 437.910112 233.426966 457.292135 227.52809 459.820225 212.359551 433.696629 167.696629 429.483146 144.94382 413.47191 120.505618 436.224719 110.393258 433.696629 90.1685393 419.370787 70.7865169 414.314607 48.0337079 402.516854 32.0224719 381.449438 26.9662921 308.134831 27.8089888 258.41573 21.9101124"></polygon>
                            <polyline id="trip2" stroke="#E02323" points="400.442067 4.99892335 393.018468 73.1819407 260.193894 152.627119 217.93405 24.7859424 29.5434067 83.9766608"></polyline>
                            <circle v-on:mouseover="svgHover" v-on:mouseout="svgBlur" id="posen" fill="#E02222" cx="155" cy="123" :r="svg.r"></circle>
                            <circle id="warschau" fill="#E02222" cx="165" cy="192" r="5"></circle>
                            <circle id="krakau" fill="#E02222" cx="286" cy="239" r="5"></circle>
                            <circle id="bialystok" fill="#E02222" cx="392" cy="73" r="5"></circle>
                            <circle id="lodz" fill="#E02222" cx="258" cy="153" r="5"></circle>
                            <circle id="danzig" fill="#E02222" cx="217" cy="26" r="5"></circle>
                            <polyline id="trip1" stroke="#E02323" points="50.3603807 135.300108 156.548736 123.887415 165.259778 191.844635 286.449822 240.525851 469.211366 234.251049"></polyline>
                    </g>
                </svg>
                <!-- <img :src="`/images/countries/${country.id}.svg`" class="map" /> -->
            </div>
        </div>
    </div>
</template>
<script>
import FactsList from '~/components/FactsList';
import iconArrowRight from '~/assets/images/icons/arrow-right.svg?raw';

export default {
    props: {
        country: Object
    },
    components: {
        FactsList
    },
    data () {
        return {
            iconArrowRight,
            svg: {
                r: 5
            }
        }
    },
    computed: {
        photoCount() {
            return '3'
        },
        getFacts() {
            const facts = [
                {
                    icon: 'card',
                    title: `${this.formatNumber(this.country.stats.distance)} km`,
                    sub: 'gefahren'
                }, {
                    icon: 'headphones',
                    title: `${this.country.stats.transportHours} Std.`,
                    sub: 'in Bus & Bahn'
                }, {
                    icon: 'location',
                    title: this.pluralize(this.country.stats.cities, 'Ort', 'Orte'),
                    sub: `in ${this.pluralize(this.country.stats.days, 'Tag', 'Tagen')}`
                }
            ]
            return facts
        }
    },
    methods: {
        pluralize(num, singular, plural) {
            return num > 1 ? `${num} ${plural}` : `${num} ${singular}`
        },
        getImageUrl(path) {
            return `${process.env.imageUrl}${path}`
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        },
        svgHover() {
            return this.svg.r = 20
        },
        svgBlur() {
            return this.svg.r = 5
        }
    }
}
</script>
<style scoped>
    circle {
        transition: .1s all ease-out
    }
    .item {
        --cover-height: 30vh;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: var(--header-height) var(--body-pad)
    }
    .cover {
        position: relative;
        margin-bottom: var(--space-2xl);
        max-height: var(--cover-height);
    }
    .cover * {
        display: block;
        max-height: var(--cover-height)
    }
    .text {
        position: relative;
        width: 100%;
        text-align: center;
    }
    .button-more {
        display: none
    }
    .map {
        max-width: 100%;
        /* position: absolute; */
        z-index: -1;
        /* top: 50%;
        left: 50%;
        max-width: 140%; */
        /* transform: translate3d(-50%,-30%, 0); */
    }

    @media only screen and (min-width: 900px) {
        .item {
            --cover-height: 60vh;
            flex-direction: row;
        }
        .cover {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            flex-shrink: 0;
            width: var(--grid-col6);
            margin-left: var(--grid-col1);
        }
        .text {
            width: var(--grid-col5);
            margin-left: var(--grid-col1);
            text-align: left
        }
        .map {
            /* transform: translate3d(-60%,-70%, 0); */
        }
    }
</style>
<style>
    @media only screen and (min-width: 900px) {
        .country-item .facts {
            margin-bottom: var(--space-lg)
        }
    }
</style>