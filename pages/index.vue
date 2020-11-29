<template>
    <layout-welcome>
        <template slot="article">
            <main class="c-welcome">
                <h1>East-Europe, Caucasus & Asia</h1>
                <p>
                    Hi, I'm Christian. For almost a year I was on my way to East Asia. Unfortunately I had to break off my trip due to the global pandemic in March 2020. Here you can find out where my path led me.
                </p>
                <p>
                    <app-button href="/destination/netherlands" size="md">
                        Start tour
                    </app-button>
                </p>
            </main>
        </template>
        <template slot="video">
            <div class="c-video">
                <video id="video" class="c-video__file" preload="auto" autoplay muted loop playsinline>
                    <source src="/hero.mp4" type="video/mp4">
                </video>
            </div>
        </template>
        <template slot="stats">
            <welcome-stats />
        </template>
    </layout-welcome>
</template>
<script>
    export default {
        head: {
            title: 'ON A JOURNEY – Reisedokumentation & Lern-Projekt',
            meta: [
                { id: 'description', name: 'description', content: 'Dokumentation meiner Reise in den Osten vom Mai 2019 bis März 2020. Ein Lern-Projekt für Nuxt.js.' }
            ]
        },
        layout: 'welcome',
    }
</script>
<style scoped>
    .c-welcome {
        text-align: center;
        padding-top: var(--space-2xl)
    }

    .c-welcome p:first-of-type {
        margin: var(--space-md) 0;
        color: var(--color-gray-lighter)
    }

    .c-video {
        position: relative;
        padding-bottom: 56.25%;
    }
    
    .c-video__file {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius-xs);
    } 
    
    @media only screen and (min-width: 600px) {
        .c-welcome {
            max-width: 30rem;
            background: var(--color-gray-darker);
            border-radius: var(--border-radius);
            padding: var(--space-2xl) var(--space-lg) var(--space-lg);
            box-shadow: var(--shadow-lg);
        }
        .c-video {
            position: static;
            padding: 0;
        }
        .c-video__file {
            object-fit: cover;
            border-radius: 0
        }
    }
</style>