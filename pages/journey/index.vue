<template>
    <div id="country" class="u-scrollContainer">
        <div class="grid">
            <div class="nav">
                <MainNavigation />
            </div>        
            <div class="cover ghost" style="--duration: .3s;--delay: .2s;background-image: url('http://localhost:3000/images/albums/niederlande/amsterdam-centraal-hauptbahnhof.jpg?w=1000&h=800&quality=80&f=auto')">
            </div>
            <div class="date">
                <span class="ghost" style="--duration: .3s;">JANUAR 2019</span>
            </div>
            <div class="text">
                <div class="textbox ghost" style="--duration: .3s;--delay: .4s">
                    Von Amsterdam aus nahm ich den Zug nach Posen.  Mit 14 Stunden Reisezeit war das meine längste Zufahrt bisher.  Die 2 Stunden Aufenthalt in Berlin habe ich ausgenutzt, um im JAM Mit 14 Stunden Reisezeit war das meine längste Zufahrt bisher.  ein paar Bier zu trinken… 
                </div>
            </div>
            <div class="article">
                <div class="ghost" style="--duration: .6s;--delay:.6s">
                    <h1>Niederlande</h1>
                    <FactsList :facts="facts" />
                    <div v-html="map"></div>
                    <nuxt-child />
                </div>
            </div>
            <div class="leftCol"><nuxt-link to="/journey/" class="a-button a-button--icon" v-html="iconArrowLeft"></nuxt-link></div>
            <div class="rightCol"><nuxt-link to="/journey/lol" class="a-button a-button--icon" v-html="iconArrowRight"></nuxt-link></div>
        </div>
    </div>
</template>
<script>
    import FactsList from "~/components/FactsList.vue";
    import MainNavigation from '~/components/MainNavigation';
    import PolenMap from '~/static/images/countries/polen.svg?raw';
    import iconArrowLeft from "~/assets/images/icons/arrow-left.svg?raw";
    import iconArrowRight from "~/assets/images/icons/arrow-right.svg?raw";

    export default {
        components: {
            MainNavigation,
            FactsList,
            PolenMap
        },
        data () {
            return {
                map: PolenMap,
                blogIsVisible: false,
                iconArrowLeft,
                iconArrowRight
            }
        },
        transition: {
            duration: '600'
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
        },
        methods: {
            toggleBlog() {
                this.blogIsVisible = !this.blogIsVisible
            }
        }
    }
</script>
<style scoped>
    .leftCol,
    .rightCol {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 3;
        grid-area: 2 / 1 / 3 / 1;
    }

    .rightCol {
        grid-area: 2 / 13 / 4 / 14;
    }
    .blog {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: var(--color-secondary);
        overflow-y: scroll;
        height: 100%;
        padding: var(--space-md);
        font-size: var(--font-size-md);
        line-height: 2;
    }

    .grid {
        max-width: var(--body-width);
        margin: 0 auto;
        min-height: 100vh;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 80px 1fr repeat(2, 40px);
        grid-column-gap: 16px;
        grid-row-gap: 0px;
    }

    .nav { 
        display: flex;
        align-items: center;
        grid-area: 1 / 1 / 2 / 13; 
    }

    .date {
        grid-area: 2 / 1 / 3 / 1;
        writing-mode: vertical-lr;
    }
    
    .cover {
        grid-area: 2 / 2 / 2 / 8;
        background-size: cover;
        background-position: 50% 50%;
        min-height: 0;
    }

    .text {
        position: relative;
        z-index: 1;
        grid-area: 2 / 1 / 4 / 5;
        display: flex;
        align-items: flex-end;
        transition: all 1s linear;
    }

    .textbox {
        background: var(--color-secondary);
        padding: var(--space-md)
    }

    .article {
        position: relative;
        z-index: 1;
        grid-area: 2 / 8 / 2 / 13;
        text-align: center
    }

    h1 {
        position: relative;
        padding: var(--space-md) 0 var(--space-xl)
    }

    h1::before {
        z-index: -1;
        position: absolute;
        font-size: 2em;
        font-weight: 600;
        margin-left: -.5em;
        content: '02';
        opacity: .1;
    }
</style>
<style>
    #country .facts {
        margin-bottom: var(--space-lg)
    }

    #posen,
    #warschau,
    #krakau {
        animation: example 8s infinite;
        animation-timing-function: cubic-bezier(.3,1.01,.56,.96)
    }

    #posen:hover,
    #warschau:hover,
    #krakau:hover {
        fill: var(--color-primary)
    }

    @keyframes example {
        0% {rx: 8;ry: 8;}
        50% {rx: 16;ry: 16;}
        100% {rx: 8;ry: 8;}
    }
</style>