<template>
    <header class="l-index">
        <nav class="nav">
            <ul>
                <li><nuxt-link to="/">Start</nuxt-link></li>
                <li><nuxt-link to="/trips">Trips</nuxt-link></li>
                <li><nuxt-link to="/about">About</nuxt-link></li>
            </ul>
        </nav>
    </header>
</template>
<style scoped>
    header {
        border-bottom: 1px black solid;
    }
    .nav ul {
        display: flex;
        max-width: 1200px;
        margin: 0 auto
    }

    .nav li {
        margin-right: 1rem
    }

    .nav li a {
        display: block;
        height: 2rem;
        line-height: 2rem;
    }
</style>