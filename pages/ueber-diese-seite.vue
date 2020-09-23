<template>
    <div>
        <div class="conta">
            <svg :style="{ '--scale': scale }" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g class="group">
                    <circle cx="20" cy="20" :r="10 / scale" stroke-width="1" stroke="white" fill="darkblue"  vector-effect="non-scaling-stroke" />
                    <path d="M 60,60 h 0" class="path"/>
                    <path 
                        class="path" 
                        vector-effect="non-scaling-stroke" 
                        :d="`
                            M 0, 50
                            a ${10 / parseInt(scale)},${10 / parseInt(scale)} 0 1,1 ${20 / parseInt(scale)},0
                            a ${10 / parseInt(scale)},${10 / parseInt(scale)} 0 1,1 -${20 / parseInt(scale)},0
                        `" />
                    <line x1="44.99" x2="45" y1="40" y2="40" stroke="red" vector-effect="non-scaling-stroke" class="line" />
                </g>
            </svg>
            <destination-map-svg />
        </div>
        <input v-model="scale" type="number" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            scale: 2,
            position: '0%, 0%, 0'
        }
    },
    computed: {
        circleRadius() {
            // wanted to solve it with css `r: calc(12 / var(--scale))` 
            // but this does not work in osx safari, so I serve it via css var
            return 4 / parseInt(this.scale) 
        },
        offsetLeft() {
            return `${(100 * parseInt(this.scale) - 100) / -2}%`
        },
        offsetTop() {
            return `${(100 * parseInt(this.scale) - 100)}%`
        },
        width() {
            return `${100 * parseInt(this.scale)}%`
        }
    }
}
</script>
<style scoped>
    h1 {
        margin-bottom: var(--space-xl)
    }

    input {
        margin-top: 50px;
        position: relative;
        z-index: 22222
    }

    button {
        position: relative;
        z-index: 22222
    }

    .path {
        fill: none;
        stroke: #ccc;
        stroke-width: 3;
        stroke-linecap: round;
        vector-effect: non-scaling-size;
    }

    .line {
        stroke: var(--color-primary);
        stroke-width: 20;
        stroke-linecap: round;
    }

    .group {
        transform: scale(var(--scale))

    }

    .conta {
        width: 400px;
        margin: 30px auto 0;
        border: 1px yellow dotted
    }

    p {
        margin: 1rem 0
    }
    .box {
        position: relative; 
        border: 2px yellow solid;
        width: 400px;
        height: 400px;
        margin: 10vh auto 0;
    }

    .box >>> svg {
        border: 2px red solid;
        /* position: absolute; */
        /* z-index: -1; */
        width: 100%;
        height: 100%
        /* transform: translate3d(var(--position)); */
        /* transform-origin: top left; */
        /* left: 50%; */
        /* top: 50%; */
        /* position: relative;
        transition: transform .6s linear .4s;
        will-change: transform; */
    }

    .box >>> svg g {
        transition: all 1s var(--timing-function);
        transform: scale(var(--scale)) translate3d(var(--position))
    }

</style>