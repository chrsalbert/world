<template>
    <div id="index" class="u-scrollContainer">
        <div class="grid">
            <div class="grid__nav">
                <MainNavigation />
            </div>
            <div class="grid__video">
                <div class="u-ghost" style="--delay: .16s;--duration: .44s">
                    <video class="video" autoplay muted loop playsinline>
                        <source src="/hero.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="grid__main">
                <div class="main u-ghost" style="--delay: .08s;--duration: .52s">
                    <h1>1x Ost-Europa, Kaukasus, Asien & zurück</h1>
                    <FactsList :facts="facts" mode="horizontal" />
                </div>
            </div>
            <div class="grid__date">
                <span class="date u-ghost" style="--duration: .6s">Mai 2019 – März 2020</span>
            </div>
            <div class="grid__map" v-html="worldmap"></div>
            <div class="grid__button">
                <nuxt-link to="/journey/niederlande" class="a-button a-button--large"><span>Tour starten</span></nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Countries from '~/static/data/countries.json';
    import WorldMap from '~/static/images/world-map.svg?raw';
    import FactsList from "~/components/FactsList.vue";
    import MainNavigation from '~/components/MainNavigation';

    export default {
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
        }
    }
</script>
<style scoped>
    h1 {
        margin: 0 0 var(--space-lg)
    }

    .grid {
        max-width: var(--body-width);
        margin: 0 auto;
        min-height: 100vh;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 80px minmax(10rem, 2fr) min-content minmax(0, 1fr);
        gap: 0px 16px;
    }

    .grid__nav { 
        display: flex;
        align-items: center;
        grid-area: 1 / 1 / 2 / 13; 
        padding-left: var(--space-md)
    }

    .grid__video { 
        grid-area: 2 / 5 / 5 / 13;
        padding: 0 var(--space-md);
    }

    .video {
        box-shadow: var(--shadow-lg)
    }

    .grid__main { 
        position: relative;
        z-index: 1;
        grid-area: 3 / 2 / 4 / 7;
    }

    .main {
        text-align: center;
        padding: var(--space-md);
        background: var(--body-bgColor);
        box-shadow: var(--shadow-xl)
    }

    .grid__button { 
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: relative;
        z-index: 2;
        grid-area: 3 / 7 / 4 / 13;
        padding-bottom: var(--space-lg);
    }

    .a-button {
        box-shadow: var(--shadow-lg)
    }

    .grid__date { 
        grid-area: 2 / 1 / 5 / 2; 
        padding-left: var(--space-md)
    }

    .date {
        text-transform: uppercase;
        writing-mode: vertical-lr;
        transform: rotate(180deg)
    }

    .grid__map { 
        position: relative;
        z-index: 1;
        grid-area: 2 / 2 / 5 / 13; 
    }
</style>