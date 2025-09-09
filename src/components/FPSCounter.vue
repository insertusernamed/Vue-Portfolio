<template>
    <div class="fps-counter">
        {{ fps }} FPS
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const fps = ref(0)
let frameCount = 0
let lastTime = performance.now()
let animationFrameId: number

const updateFPS = () => {
    const now = performance.now()
    const delta = now - lastTime

    frameCount++
    if (delta >= 1000) {
        fps.value = Math.round((frameCount * 1000) / delta)
        frameCount = 0
        lastTime = now
    }

    animationFrameId = requestAnimationFrame(updateFPS)
}

onMounted(() => {
    animationFrameId = requestAnimationFrame(updateFPS)
})

onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrameId)
})
</script>


<style scoped>
.fps-counter {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
}
</style>
