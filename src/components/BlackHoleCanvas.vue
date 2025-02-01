<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
    particleCount: number
}>()

const getRadiusValues = () => {
    const isMobile = window.innerWidth < 768
    return {
        minRadius: isMobile ? 150 : 300,
        maxRadius: isMobile ? 500 : 1000,
        eventHorizonRadius: isMobile ? 150 : 300
    }
}

let radiusValues = getRadiusValues()
const MIN_RADIUS = radiusValues.minRadius
const MAX_RADIUS = radiusValues.maxRadius
const EVENT_HORIZON_RADIUS = radiusValues.eventHorizonRadius

const TARGET_FPS = 60
const FRAME_TIME = 1000 / TARGET_FPS

let particlePool: Float32Array

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let ctx: CanvasRenderingContext2D | null
let lastFrameTime = 0

// Pre-calculate constants
const TWO_PI = Math.PI * 2
const SPIRAL_TIGHTNESS = 0.99975
const GRAV_CONSTANT = 2000

const createParticle = (index: number, canvas: HTMLCanvasElement, initialRadius?: number) => {
    const angle = Math.random() * TWO_PI
    const radius = initialRadius || MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS)
    const baseIndex = index * 6

    particlePool[baseIndex] = canvas.width / 2 + Math.cos(angle) * radius  // x
    particlePool[baseIndex + 1] = canvas.height / 2 + Math.sin(angle) * radius // y
    particlePool[baseIndex + 2] = angle // angle
    particlePool[baseIndex + 3] = Math.random() * 0.2 + 0.1 // speed
    particlePool[baseIndex + 4] = Math.random() * 2 + 1 // radius
    particlePool[baseIndex + 5] = Math.random() * 60 + 260 // hue
}

watch(() => props.particleCount, (newCount) => {
    particlePool = new Float32Array(newCount * 6)
    if (canvasRef.value) {
        initBlackHole()
    }
}, { immediate: true })

const initBlackHole = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    ctx.imageSmoothingEnabled = false

    const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // Update radius values on resize
        radiusValues = getRadiusValues()
        initParticles()
    }

    const initParticles = () => {
        for (let i = 0; i < props.particleCount; i++) {
            createParticle(i, canvas)
        }
    }

    window.addEventListener('resize', resize)
    resize()
    requestAnimationFrame(animate)
}

const animate = (timestamp: number) => {
    if (!ctx || !canvasRef.value) return

    if (timestamp - lastFrameTime < FRAME_TIME) {
        animationFrameId = requestAnimationFrame(animate)
        return
    }
    lastFrameTime = timestamp

    // Changing the alpha value of this fillRect call will change the trail length. 0.1 is the original
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const centerX = ctx.canvas.width / 2
    const centerY = ctx.canvas.height / 2
    const horizonRadiusSq = EVENT_HORIZON_RADIUS * EVENT_HORIZON_RADIUS

    ctx.save()
    for (let i = 0; i < props.particleCount; i++) {
        const baseIndex = i * 6
        const x = particlePool[baseIndex]
        const y = particlePool[baseIndex + 1]

        const dx = centerX - x
        const dy = centerY - y
        const distanceSq = dx * dx + dy * dy

        if (distanceSq < horizonRadiusSq) {
            createParticle(i, ctx.canvas, MAX_RADIUS)
            continue
        }

        const distance = Math.sqrt(distanceSq)
        const gravitationalPull = GRAV_CONSTANT / distanceSq

        particlePool[baseIndex + 2] += particlePool[baseIndex + 3] * gravitationalPull
        const newDistance = distance * SPIRAL_TIGHTNESS
        const angle = particlePool[baseIndex + 2]

        particlePool[baseIndex] = centerX + Math.cos(angle) * newDistance
        particlePool[baseIndex + 1] = centerY + Math.sin(angle) * newDistance

        const radius = particlePool[baseIndex + 4]
        const hue = particlePool[baseIndex + 5]

        ctx.beginPath()
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.6)`
        ctx.arc(particlePool[baseIndex], particlePool[baseIndex + 1], radius, 0, TWO_PI)
        ctx.fill()
    }
    ctx.restore()

    const horizonGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, EVENT_HORIZON_RADIUS * 1.5
    )
    horizonGradient.addColorStop(0, 'rgba(0, 0, 0, 1)')
    horizonGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.8)')
    horizonGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = horizonGradient
    ctx.fillRect(
        centerX - EVENT_HORIZON_RADIUS * 1.5,
        centerY - EVENT_HORIZON_RADIUS * 1.5,
        EVENT_HORIZON_RADIUS * 3,
        EVENT_HORIZON_RADIUS * 3
    )

    animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
    initBlackHole()
})

onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrameId)
})
</script>

<template>
    <canvas ref="canvasRef" class="black-hole-canvas" aria-hidden="true"></canvas>
</template>

<style scoped>
.black-hole-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 1;
}
</style>
