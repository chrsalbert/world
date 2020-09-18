<template>
    <div class="c-grid">
        <slot></slot>
    </div>
</template>
<style scoped>
.c-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: var(--space);
}
</style>