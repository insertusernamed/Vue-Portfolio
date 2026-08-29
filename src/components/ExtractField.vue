<template>
  <div class="extract" aria-hidden="true">
    <canvas ref="canvasRef"></canvas>
    <p class="status">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { cssRgb, mixRgb, type RGB } from '../lib/color'
import { mulberry32 } from '../lib/rng'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const status = ref('PASS 1 · NODES / POIS')

let raf = 0
let reduced = false
let scanX = 0
let pass = 1
let cols = 0
let rows = 0
let cellW = 10
let cellH = 14
let lastTs = 0
let nodeDim = 1
let wipe = 0
const field = new Map<string, string>()
const nodes = new Set<string>()
const ways = new Set<string>()
const addrs = new Set<string>()

const NODE_TINTS: RGB[] = [
  { r: 0xe0, g: 0x89, b: 0x48 },
  { r: 0xf0, g: 0xa0, b: 0x5c },
  { r: 0xff, g: 0xc0, b: 0x91 },
  { r: 0xe8, g: 0xd8, b: 0xc4 },
  { r: 0xd4, g: 0x78, b: 0x3a },
  { r: 0xf4, g: 0xee, b: 0xe4 },
]

const WAY_TINTS: RGB[] = [
  { r: 0xe4, g: 0xd6, b: 0xc4 },
  { r: 0xf0, g: 0xe4, b: 0xd4 },
  { r: 0xe8, g: 0xb8, b: 0x88 },
  { r: 0xdc, g: 0xc8, b: 0xb4 },
]

const FLASH: RGB = { r: 0xff, g: 0xf4, b: 0xe8 }

let lastSize = ''

function tintAt(x: number, y: number, palettes: RGB[]) {
  return palettes[Math.abs(x * 7 + y * 13) % palettes.length]
}

function scanFlash(x: number, reveal: number) {
  const d = reveal - x
  if (d < 0 || d > 3.2) return 0
  return 1 - d / 3.2
}

function densityAt(x: number, y: number, w: number, h: number) {
  const nx = x / w
  const ny = y / h
  const a = Math.sin(nx * 5.4 + 0.4) * Math.cos(ny * 3.8)
  const b = Math.sin((nx + ny) * 7.1)
  const c = Math.cos(nx * 2.2 - ny * 4.6)
  return Math.max(0.32, Math.min(0.92, 0.58 + 0.22 * a + 0.14 * b + 0.1 * c))
}

function key(x: number, y: number) {
  return `${x},${y}`
}

function rebuild() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  if (!w || !h) return
  const sizeKey = `${Math.round(w)}x${Math.round(h)}`
  if (sizeKey === lastSize) return
  lastSize = sizeKey
  canvas.width = Math.floor(w * dpr)
  canvas.height = Math.floor(h * dpr)
  canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
  cellW = 10
  cellH = 14
  cols = Math.ceil(w / cellW)
  rows = Math.ceil(h / cellH)
  field.clear()
  nodes.clear()
  ways.clear()
  addrs.clear()
  const roll = mulberry32(0x051 + cols * 17 + rows * 13)

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const d = densityAt(x, y, cols, rows)
      const n = roll()
      if (n < 0.42 + d * 0.38) field.set(key(x, y), d > 0.62 && n < 0.18 ? ':' : '·')
      if (x > 0 && y > 0 && x < cols - 1 && y < rows - 1 && n < 0.08 + d * 0.17) {
        nodes.add(key(x, y))
      }
    }
  }

  const wayCount = Math.floor(cols * 0.6)
  for (let i = 0; i < wayCount; i++) {
    let x = 1 + Math.floor(roll() * (cols - 2))
    let y = 1 + Math.floor(roll() * (rows - 2))
    const len = 5 + Math.floor(roll() * 14)
    let dx = roll() < 0.5 ? (roll() < 0.5 ? 1 : -1) : 0
    let dy = dx === 0 ? (roll() < 0.5 ? 1 : -1) : roll() < 0.35 ? (roll() < 0.5 ? 1 : -1) : 0
    for (let s = 0; s < len; s++) {
      if (x <= 0 || y <= 0 || x >= cols - 1 || y >= rows - 1) break
      ways.add(key(x, y))
      if (roll() < 0.16) {
        const turn = roll() < 0.5 ? -1 : 1
        if (dx) {
          dy = turn
          dx = 0
        } else {
          dx = turn
          dy = 0
        }
      }
      x += dx
      y += dy
    }
  }

  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      if ((x * 19 + y * 47) % 13 === 0 && !nodes.has(key(x, y))) addrs.add(key(x, y))
    }
  }

  scanX = 0
  pass = 1
  nodeDim = 1
  wipe = 0
}

function paint() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  ctx.fillStyle = '#161410'
  ctx.fillRect(0, 0, w, h)
  ctx.font = '11px "IBM Plex Mono", ui-monospace, monospace'
  ctx.textBaseline = 'top'

  const fading = wipe > 0
  const reveal1 = reduced || pass === 2 || fading ? cols : scanX
  const reveal2 = reduced || fading ? cols : pass === 2 ? scanX : -1

  ctx.save()
  if (fading) ctx.globalAlpha = wipe

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const k = key(x, y)
      const px = x * cellW
      const py = y * cellH
      const inP1 = x <= reveal1
      const inP2 = x <= reveal2
      const isNode = nodes.has(k)
      const isWay = ways.has(k)
      const isAddr = addrs.has(k)

      if (inP1 && isNode) {
        const settled = tintAt(x, y, NODE_TINTS)
        const lit = mixRgb(settled, FLASH, pass === 1 ? scanFlash(x, reveal1) * 0.85 : 0)
        ctx.fillStyle = cssRgb(lit, nodeDim)
        ctx.fillText('*', px, py)
      } else if (inP2 && isWay) {
        const settled = tintAt(x, y, WAY_TINTS)
        const lit = mixRgb(settled, FLASH, scanFlash(x, reveal2) * 0.7)
        ctx.fillStyle = cssRgb(lit)
        ctx.fillText('+', px, py)
      } else if (inP2 && isAddr) {
        ctx.fillStyle = '#8a8174'
        ctx.fillText('·', px, py)
      } else {
        const g = field.get(k)
        if (g) {
          ctx.fillStyle = inP1 ? '#3f3a32' : '#2a261f'
          ctx.fillText(g, px, py)
        }
      }
    }
  }

  if (!reduced && !fading) {
    const scan = pass === 1 ? reveal1 : reveal2
    ctx.fillStyle = 'rgba(224, 137, 72, 0.7)'
    ctx.fillRect(Math.max(0, scan) * cellW, 0, 2, h)
  }
  ctx.restore()
}

function tick(now: number) {
  const dt = lastTs ? Math.min(0.05, (now - lastTs) / 1000) : 0.016
  lastTs = now

  if (!reduced) {
    const dimK = 1 - Math.exp(-dt / 0.32)
    if (wipe > 0) {
      wipe = Math.max(0, wipe - dt / 0.3)
      if (wipe <= 0) {
        wipe = 0
        scanX = 0
        pass = 1
        nodeDim = 1
      }
    } else {
      scanX += 0.48
      if (scanX > cols + 16) {
        if (pass === 1) {
          scanX = 0
          pass = 2
        } else {
          wipe = 1
        }
      }
      const target = pass === 2 ? 0.72 : 1
      nodeDim += (target - nodeDim) * dimK
    }
    status.value = pass === 1 && wipe <= 0 ? 'PASS 1 · NODES / POIS' : 'PASS 2 · WAYS / ADDRESSES'
  } else {
    status.value = 'TWO-PASS EXTRACT · NODES THEN WAYS'
    scanX = cols
    pass = 2
    nodeDim = 0.72
    wipe = 0
  }
  paint()
  raf = requestAnimationFrame(tick)
}

let observer: ResizeObserver | null = null

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const canvas = canvasRef.value
  observer = new ResizeObserver(rebuild)
  if (canvas) observer.observe(canvas)
  rebuild()
  if (!reduced) scanX = Math.floor(cols * 0.45)
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
})
</script>

<style scoped>
.extract {
  position: relative;
  min-height: 28rem;
  background: var(--bg-2);
  border: 1px solid var(--line);
  overflow: hidden;
}

canvas {
  width: 100%;
  height: 28rem;
  display: block;
}

.status {
  position: absolute;
  left: 0.75rem;
  bottom: 0.75rem;
  z-index: 1;
  margin: 0;
  padding: 0.38rem 0.6rem 0.32rem;
  background: #161410;
  box-shadow: 0 0 0 1px var(--line);
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

@media (max-width: 720px) {
  .extract,
  canvas {
    min-height: 18rem;
    height: 18rem;
  }
}
</style>
