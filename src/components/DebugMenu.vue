<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
    particleCount: number
}>()

const emit = defineEmits<{
    (e: 'update:particleCount', value: number): void
}>()

const isVisible = ref(false)
const fps = ref(0)
const particleInput = ref(props.particleCount)

const maxParticles = computed(() => window.innerWidth < 768 ? 5000 : 20000)

let frameCount = 0
let lastTime = performance.now()
let animationFrameId: number

const toggleVisibility = (e: KeyboardEvent) => {
    if (e.key === '`') {
        isVisible.value = !isVisible.value
    }
}

const updateParticleCount = () => {
    const count = Math.max(1000, Math.min(maxParticles.value, parseInt(particleInput.value.toString())))
    emit('update:particleCount', count)
}

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
    window.addEventListener('keydown', toggleVisibility)
    animationFrameId = requestAnimationFrame(updateFPS)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', toggleVisibility)
    cancelAnimationFrame(animationFrameId)
})
</script>

<template>
    <div v-show="isVisible" class="debug-menu">
        <div class="debug-header">
            Debug Menu (Press ` to toggle)
        </div>
        <div class="debug-content">
            <div class="debug-row">
                <label>Particle Count:</label>
                <input type="number" v-model="particleInput" @change="updateParticleCount" min="1000"
                    :max="maxParticles" step="100">
            </div>
            <div class="debug-row">
                <label>FPS:</label>
                <span class="fps-value">{{ fps }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.debug-menu {
    position: fixed;
    top: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 15px;
    color: #fff;
    font-family: monospace;
    z-index: 1000;
    min-width: 300px;
}

.debug-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.debug-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.debug-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.debug-row label {
    min-width: 100px;
}

input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    padding: 5px 8px;
    border-radius: 4px;
    font-family: monospace;
    width: 150px;
}

input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
}

.fps-value {
    font-family: monospace;
    color: #fff;
}
</style>
