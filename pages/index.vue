<template>
    <div id="index" class="u-scrollContainer">
        <div class="grid">
            <div class="nav">
                <MainNavigation />
            </div>
            <div class="video">
                <div class="u-ghost" style="--delay: .16s;--duration: .44s">
                    <video autoplay muted loop playsinline>
                        <source src="/hero.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="text u-ghost" style="--delay: .08s;--duration: .52s">
                <h1>1x Ost-Europa, Kaukasus, Asien & zurück</h1>
                <FactsList :facts="facts" mode="horizontal" />
            </div>
            <div class="date">
                <span class="u-ghost" style="--duration: .6s">MAI 2019 – MÄRZ 2020</span>
            </div>
            <div class="worldmap" v-html="worldmap"></div>
            <div class="button">
                <nuxt-link to="/journey/niederlande" class="a-button">Start</nuxt-link>
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
                        title: `10.000 km`,
                        sub: 'gefahren'
                    }, {
                        icon: 'headphones',
                        title: `30 Std.`,
                        sub: 'in Bus & Bahn'
                    }, {
                        icon: 'location',
                        title: `3 Orte`,
                        sub: 'in 14 Tagen'
                    }
                ]
            }
        }
    }
</script>
<style scoped>
.grid {
    max-width: var(--body-width);
    margin: 0 auto;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 80px minmax(10rem, 2fr) min-content minmax(0, 1fr);
    gap: 0px 16px;
}

.nav { 
    display: flex;
    align-items: center;
    grid-area: 1 / 1 / 2 / 13; 
}

.video { 
    grid-area: 2 / 5 / 5 / 13;
    padding: 0 var(--space-md);
}

.text { 
    position: relative;
    z-index: 1;
    grid-area: 3 / 2 / 4 / 7;
    background: var(--body-bgColor);
    text-align: center;
    padding: var(--space-md);
}

.button { 
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    z-index: 2;
    grid-area: 1 / 11 / 6 / 13;
}

h1 {
    margin: 0 0 var(--space-lg)
}

.date { 
    grid-area: 2 / 1 / 5 / 2; 
    writing-mode: vertical-lr;
}

.worldmap { 
    position: relative;
    z-index: 1;
    grid-area: 2 / 2 / 5 / 13; 
}
</style>