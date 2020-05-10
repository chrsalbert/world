<template>
    <div id="index" class="u-scrollContainer">
        <div class="grid">
            <div class="grid__nav">
                <MainNavigation />
            </div>
            <div class="grid__video">
                <div class="video-wrapper">
                    <!-- <div class="u-ghost" style="--delay: .16s;--duration: .44s"> -->
                        <video class="u-fluid" autoplay muted loop playsinline>
                            <source src="/hero.mp4" type="video/mp4">
                        </video>
                    <!-- </div> -->
                </div>
            </div>
            <div class="grid__main">
                <div class="main u-ghost" style="--delay: .08s;--duration: .52s">
                    <h1>1x Ost-Europa, Kaukasus, Asien <nobr>& zurück</nobr></h1>
                    <!-- <FactsList :facts="facts" mode="horizontal" /> -->
                    <div class="grid__cta__inner">
                        <!-- <img class="avatar" src="/images/avatar.webp" style="flex-shrink: 0"/> -->
                        <div><p class="cta">Hi, ich bin Christian. Fast ein Jahr lang war ich unterwegs in Richtung Ost-Asien. Nun mache ich Corona-Ferien. In welche Länder meine Reise führte, erfährst du hier.</p><nuxt-link to="/journey/niederlande" class="a-button a-button--large"><span>Tour starten</span></nuxt-link></div>
                    </div>
                </div>
            </div>
            <div class="grid__date">
                <span class="date u-ghost" style="--duration: .6s">Mai 2019 – März 2020</span>
            </div>
            <div class="grid__map" v-html="worldmap"></div>
            <div class="grid__cta">
                <FactsList :facts="facts" mode="horizontal" />
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
        margin: 0 0 var(--space-lg);
        text-align: center;
    }

    .grid {
        max-width: var(--body-width);
        margin: 0 auto;
        height: 100vh;
        max-height: 52rem;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 5rem minmax(0, 1fr) minmax(0, 1fr) 10rem 5rem;
        gap: 0px 16px;
    }

    /* .grid > *:nth-child(1) { background: blue }
    .grid > *:nth-child(2) { background: yellow }
    .grid > *:nth-child(3) { background: green }
    .grid > *:nth-child(4) { background: white }
    .grid > *:nth-child(5) { background: rgba(40,60,20,.5) }
    .grid > *:nth-child(6) { background: turquoise } */

    .grid__nav { 
        display: flex;
        align-items: center;
        grid-area: 1 / 1 / 2 / 13; 
        padding-left: var(--space-md)
    }

    .grid__video { 
        position: relative;
        grid-area: 2 / 5 / 4 / 13;
        padding: 0 var(--space-md);
        overflow: hidden
    }

    .video-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .video {
        box-shadow: var(--shadow-lg);
    }

    .grid__main { 
        grid-area: 3 / 2 / 5 / 7;
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .main {
        padding: var(--space-md);
        background: var(--body-bgColor);
        box-shadow: var(--shadow-xl)
    }

    .grid__cta { 
        grid-area: 4 / 7 / 5 / 13;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        text-align: center;
        position: relative;
        z-index: 2;
        padding-bottom: var(--space-md)
    }

    .grid__cta__inner {
        display: flex;
        align-items: center;
        text-align: center
    }

    .a-button {
        box-shadow: var(--shadow-lg)
    }

    .avatar {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        margin-right: var(--space-md);
        box-shadow: var(--shadow-md)
    }

    .cta {
        margin-bottom: var(--space)
    }

    .grid__date { 
        grid-area: 2 / 1 / 5 / 3; 
        padding-left: var(--space-md)
    }

    .date {
        text-transform: uppercase;
        writing-mode: vertical-lr;
        transform: rotate(180deg)
    }

    .grid__map { 
        grid-area: 2 / 2 / 4 / 13; 
        position: relative;
        z-index: 1;
    }


    @media only screen and (max-width: 1100px) and (orientation: portrait) {
        .grid {
            grid-template-rows: 80px 1fr 1fr;
        }

        .grid__video {
            grid-area: 2 / 1 / 3 / 13
        }

        .grid__map {
            grid-area: 2 / 1 / 3 / 13;
        }

        .grid__main {
            grid-area: 3 / 3 / 4 / 11;
            margin-top: calc(var(--space-2xl) * -1);
            justify-content: flex-start;
        }

        .grid__date {
            grid-area: 3 / 1 / 4 / 2;
            padding-top: var(--space-md)
        }

        .grid__cta {
            grid-area: 4 / 1 / 5 / 13;
            padding-top: var(--space-2xl)
        }
    }

    @media only screen and (max-width: 600px) {
        h1 {
            font-size: var(--font-size-xl);
            line-height: 1.25;
        }

        .grid {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: 56px min-content min-content min-content;
            height: auto;
            min-height: 100vh;
            max-height: unset;
            padding-bottom: var(--space-xl)
        }

        .grid__nav {
            grid-area: 1 / 1 / 2 / 7;
            padding: 0;
        }

        .grid__video {
            grid-area: 2 / 1 / 3 / 7;
            padding: 0;
        }

        .grid__main {
            grid-area: 3 / 1 / 4 / 7
        }

        .main {
            box-shadow: none;
            padding-top: var(--space-xl)
        }

        .grid__map {
            display: none;
            grid-area: 2 / 2 / 3 / 7
        }

        .grid__cta {
            grid-area: 4 / 1 / 5 / 7;
            padding-top: var(--space-xl)
        }

        .grid__date {
            grid-area: 3 / 1 / 4 / 2;
            z-index: 99;
            padding: var(--space-md) 0 0;
            opacity: .5;
        }
    }
</style>