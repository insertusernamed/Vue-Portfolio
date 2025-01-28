<template>
    <div class="icon-wrapper" :class="{ 'is-loading': !isLoaded }">
        <i :class="iconClass"></i>
        <div class="icon-fallback"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
    iconClass: string
}>()

const isLoaded = ref(false)

onMounted(() => {
    // Check if Ionicons is loaded
    if (document.querySelector('link[href*="ionicons"]')) {
        isLoaded.value = true
    }
})
</script>

<style scoped>
.icon-wrapper {
    position: relative;
    width: var(--icon-size);
    height: var(--icon-size);
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.icon-fallback {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--icon-fallback-bg);
    border-radius: 4px;
    opacity: 0;
}

.is-loading .icon-fallback {
    opacity: 1;
}

.is-loading i {
    opacity: 0;
}
</style>
