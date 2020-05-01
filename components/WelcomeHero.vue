<template>
    <div class="container">
        <div class="video">
            <video autoplay muted loop playsinline class="a-photo">
                <source src="/hero.mp4" type="video/mp4">
            </video>
        </div>
        <div class="header">
            <h1>ON A JOURNEY</h1>
            <p>Die Foto-Story über meine Reise nach Osten. Vom 1. Mai 2019 bis vorerst zur weltweiten Reisewarnung am 16. Märzt 2020. Immer der Nase lang.</p>
            <FactsList :facts="facts" mode="horizontal" />
        </div>
    </div>
</template>
<script>
import FactsList from "~/components/FactsList.vue"

export default {
    components: {
        FactsList
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
    body {
        height: 100vh;
        overflow: hidden
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        padding: var(--header-height) var(--body-pad);
        text-align: center
    }

    .video {
        height: 30vh;
        margin: 0 0 var(--space-xl);
        filter: saturate(.6) brightness(.8) contrast(.8);
    }

    .header {
        width: 100%;
    }

    .worldmap {
        display: none
    }

    h1 {
        font-size: var(--font-size-3xl);
        letter-spacing: 0;
        margin-bottom: var(--space-xs)        
    }

    p {
        max-width: 26rem;
        margin: 0 auto var(--space-2xl)
    }

    @media only screen and (min-width: 900px) {
        .container {
            flex-direction: row-reverse;
            text-align: left;
        }

        .video {
            display: flex;
            justify-content: center;
            align-items: center;
            width: var(--grid-col6);
            margin: 0;
            height: 80vh;
        }

        .header {
            width: var(--grid-col5);
            padding-right: var(--space-2xl)
        }

        p {
            margin-left: 0
        }
    }
</style>