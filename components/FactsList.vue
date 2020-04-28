<template>
    <ul :class="`m-facts ${classes}`">
        <li v-for="(fact, index) in facts" :key="index">
            <img class="a-icon" :src="`/icons/${fact.icon}.svg`">
            <strong>{{ fact.title }}</strong>
            <span>{{ fact.sub }}</span>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        facts: Array,
        classes: String
    }
}
</script>