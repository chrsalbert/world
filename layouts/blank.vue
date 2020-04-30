<template>
    <div>
        <MainNavigation />
        <nuxt/>
    </div>
</template>
<script>
import MainNavigation from '~/components/MainNavigation';

export default {
    components: {
        MainNavigation
    }
}
</script>