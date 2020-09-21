<template>
    <layout-welcome>
        <template slot="nav">
            <the-nav />
            <app-button href="/destination/netherlands" type="secondary">
                Tour starten
            </app-button>
        </template>
        <template slot="article">
            <main class="c-welcome">
                <div>
                    <h1>1x Ost-Europa, Kaukasus, Asien & zurück</h1>
                    <p>
                        Hi, ich bin Christian. Fast ein Jahr lang war ich unterwegs in Richtung Ost-Asien. Nun mache ich Corona-Ferien. In welche Länder meine Reise bisher führte, erfährst du hier.
                    </p>
                    <p>
                        <app-button href="/destination/netherlands" size="md">
                            Tour starten
                        </app-button>
                    </p>
                </div>
            </main>
        </template>
        <template slot="video">
            <video id="video" class="c-welcome__video u-fluid" poster="/images/loader.svg" preload="auto" autoplay muted loop playsinline>
                <!-- <img src="/images/video-fallback.webp" /> -->
                <source src="/hero.mp4" type="video/mp4">
            </video>
        </template>
        <template slot="map">
            <figure>
                <destination-map-svg 
                    :places="places" 
                    :countries="countries" 
                    :destinations="destinations" />
            </figure>
        </template>
        <template slot="stats">
            <destination-stats :stats="stats" />
        </template>
    </layout-welcome>
</template>
<script>
    import destinations from '~/static/data/destinations.json';
    import countries from '~/static/data/countries.json';
    import places from '~/static/data/places.json';

    export default {
        head: {
            title: 'ON A JOURNEY – Reisedokumentation & Lern-Projekt',
            meta: [
                { hid: 'description', name: 'description', content: 'Dokumentation meiner Reise in den Osten vom Mai 2019 bis März 2020. Ein Lern-Projekt für Nuxt.js.' }
            ]
        },
        layout: 'welcome',
        data() {
            return {
                destinations, countries, places
            }
        },
        computed: {
            stats() {
                return  {
                    distance: 49350,
                    transportHours: 480,
                    cities: 108,
                    days: 318
                }
            }
        }
    }
</script>
<style scoped>
    .c-welcome {
        /* display: flex;
        place-items: center;
        padding: var(--space-lg);
        background: var(--color-gray-darker);
        box-shadow: var(--shadow-lg);
        border-radius: var(--space-xs) var(--space-md) var(--space-xs) var(--space-md);
        text-align: center; */
        text-align: center;
    }
    .c-welcome p:first-of-type {
        margin: var(--space-md) 0;
        color: var(--color-gray-lighter)
    }
    .c-welcome p:last-of-type {
        text-align: center;
        
    }
    .c-welcome__video {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        box-shadow: var(--shadow-lg);
        border-radius: var(--border-radius-xs) var(--border-radius-xs);
        background: var(--color-gray-darker);
        object-fit: cover;
        transition: all 3s linear;
    } 
</style>