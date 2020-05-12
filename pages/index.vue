<template>
    <div class="grid">
        <div class="grid__date">
            <span class="date">Mai 2019 – März 2020</span>
        </div>
        <div class="grid__video">
            <video id="video" class="video u-fluid" poster="/images/loader.svg" preload="auto" autoplay muted loop playsinline>
                <source src="/hero.mp4" type="video/mp4">
                <img src="/images/video-fallback.webp" />
            </video>
        </div>
        <div class="grid__main">
            <div class="main">
                <h1 class="title">1x Ost-Europa, Kaukasus, Asien <nobr>& zurück</nobr></h1>
                <p class="text">
                    Hi, ich bin Christian. Fast ein Jahr lang war ich unterwegs in Richtung Ost-Asien. Nun mache ich Corona-Ferien. In welche Länder meine Reise führte, erfährst du hier.
                </p>
                <nuxt-link to="/journey/niederlande" class="a-button a-button--large">
                    <span>Tour starten</span>
                </nuxt-link>
            </div>
        </div>
        <div class="grid__map" v-html="worldmap"></div>
        <div class="grid__facts">
            <FactsList :facts="facts" mode="horizontal" />
        </div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import WorldMap from '~/static/images/world-map.svg?raw';
    import FactsList from "~/components/FactsList.vue";
    import MainNavigation from '~/components/MainNavigation';

    export default {
        head: {
            title: 'ON A JOURNEY – Reisedokumentation & Lern-Projekt',
            meta: [
                { hid: 'description', name: 'description', content: 'Dokumentation meiner Reise in den Osten vom Mai 2019 bis März 2020. Ein Lern-Projekt für Nuxt.js.' }
            ]
        },
        data () {
            return {
                worldmap: WorldMap
            }
        },
        transition: {
            duration: '600'
        },
        components: {
            FactsList,
            MainNavigation
        },
        computed: {
            facts() {
                return  [
                    {
                        icon: 'card',
                        title: `49.350 km`,
                        sub: 'gefahren'
                    }, {
                        icon: 'headphones',
                        title: `480 Std.`,
                        sub: 'in Bus & Bahn'
                    }, {
                        icon: 'location',
                        title: `108 Orte`,
                        sub: 'in 318 Tagen'
                    }
                ]
            }
        },
        mounted() {
            const video = document.getElementById("video")
            video.onloadeddata = function() {
                video.classList.add('video--loaded');
            }
        }
    }
</script>
<style scoped>
    .grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) 10rem 5rem;
        gap: 0px 16px;
    }

    .title {
        margin: 0 0 var(--space-sm);
        text-align: center;
    }

    .text {
        margin-bottom: var(--space-lg)
    }

    .main {
        padding: var(--space-md);
        background: var(--body-bgColor);
        box-shadow: var(--shadow-xl);
        border-radius: var(--space-sm);
        text-align: center;
    }

    .grid__video { 
        position: relative;
        grid-area: 1 / 5 / 3 / 13;
        padding: 0 var(--space-md);
        overflow: hidden;
        display: flex;
    }

    .video {
        flex: 1;
        box-shadow: var(--shadow-lg);
        border-radius: var(--space-sm);
        background: #1B263D;
        object-fit: none;
        transition: all 3s linear
    }

    .video--loaded {
        object-fit: cover;
    }

    .grid__main { 
        grid-area: 2 / 2 / 4 / 7;
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .grid__facts { 
        grid-area: 3 / 8 / 4 / 12;
        position: relative;
        z-index: 2;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        text-align: center;
        padding-bottom: var(--space-md)
    }

    .a-button {
        box-shadow: var(--shadow-lg)
    }

    .grid__date { 
        grid-area: 1 / 1 / 4 / 3; 
        padding-left: var(--space-md)
    }

    .date {
        text-transform: uppercase;
        writing-mode: vertical-lr;
        transform: rotate(180deg)
    }

    .grid__map { 
        grid-area: 1 / 2 / 3 / 13; 
        position: relative;
        z-index: 1;
    }

    @media only screen and (max-width: 1280px) {
        .grid__facts {
            grid-area: 3 / 8 / 4 / 13
        }
    }

    @media only screen and (max-width: 900px) {
        .grid {
            grid-template-rows: 8rem 10rem 10rem min-content min-content min-content
        }

        .grid__date {
            grid-area: 2 / 1 / 4 / 2
        }

        .grid__main {
            grid-area: 3 / 1 / 5 / 9
        }

        .grid__video {
            grid-area: 1 / 4 / 4 / 13;
            padding: 0
        }

        .grid__map {
            grid-area: 1 / 1 / 3 / 13
        }

        .grid__facts {
            grid-area: 5 / 1 / 6 / 13;
            padding: var(--space-xl) 0
        }
    }

    @media only screen and (max-width: 600px) {
        .grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
            grid-template-rows: 24vh min-content min-content
        }

        .grid__date {
            grid-area: 2 / 1 / 3 / 7;
            text-align: center;
            padding: var(--space-md);
        }

        .date {
            writing-mode: unset;
            transform: rotate(0deg);
        }

        .grid__video {
            grid-area: 1 / 1 / 2 / 7
        }

        .grid__map {
            display: none
        }

        .grid__main {
            grid-area: 3 / 1 / 4 / 7;
        }

        .main {
            background: none;
            box-shadow: none
        }

        .grid__facts {
            grid-area: 4 / 1 / 5 / 7;
            padding: var(--space-xl) 0
        }
    }
</style>