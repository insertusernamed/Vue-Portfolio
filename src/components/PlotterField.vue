<template>
  <div ref="wrapRef" class="plotter-wrap">
    <canvas
      ref="canvasRef"
      class="plotter-field"
      aria-hidden="true"
      tabindex="-1"
      @pointermove="onMove"
      @pointerleave="onLeave"
      @pointerdown="onDown"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { cssRgb, mixRgb } from '../lib/color'
import {
  FIGURES,
  figureRadius,
  headingGlyph,
  hypotrochoid,
  period,
  type Figure,
} from '../lib/plotter'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const wrapRef = ref<HTMLElement | null>(null)

type Ink = { g: string; born: number; tint: { r: number; g: number; b: number } }

const INK_HOLD = 0.7
const INK_FADE = 14
const HOVER_TAU = 0.1
const HOVER_R = 44
const DUST = { r: 0x2c, g: 0x28, b: 0x22 }
const LIT = { r: 0x6a, g: 0x62, b: 0x58 }
const BG = { r: 0x0e, g: 0x0d, b: 0x0b }
const INK_TINTS = [
  { r: 0xd4, g: 0xa4, b: 0x88 },
  { r: 0xa8, g: 0xc0, b: 0xa4 },
  { r: 0xd6, g: 0xb4, b: 0x78 },
  { r: 0xc8, g: 0xa4, b: 0xa8 },
  { r: 0xaa, g: 0xb4, b: 0xb8 },
  { r: 0xb4, g: 0xc0, b: 0x90 },
  { r: 0xd0, g: 0x9c, b: 0x9a },
  { r: 0xd8, g: 0xb8, b: 0x96 },
]

let cssW = 0
let cssH = 0
let cellW = 10
let cellH = 14
let cols = 0
let rows = 0
let cx = 0
let cy = 0
let scale = 1
let figI = 0
let fig: Figure = FIGURES[0]
let t = 0
let tEnd = period(fig)
let lastX = 0
let lastY = 0
let lastTs = 0
let raf = 0
let reduced = false
let holdUntil = 0
let pointer: { x: number; y: number } | null = null
let ink = new Map<string, Ink>()
let dustLit = new Map<string, number>()
let observer: ResizeObserver | null = null
let lastSize = ''

function key(x: number, y: number) {
  return `${x},${y}`
}

function layout() {
  const wide = cssW >= 720
  cx = cssW * (wide ? 0.74 : 0.54)
  cy = cssH * (wide ? 0.5 : 0.7)
  const maxR = Math.min(
    cssW - cx - 28,
    cx - cssW * (wide ? 0.38 : 0.08),
    cy - 36,
    cssH - cy - 48,
  )
  scale = Math.max(48, maxR) / figureRadius(fig)
}

function beginFigure(index: number, clearPlate: boolean) {
  if (clearPlate) ink = new Map()
  figI = ((index % FIGURES.length) + FIGURES.length) % FIGURES.length
  fig = FIGURES[figI]
  t = 0
  tEnd = period(fig)
  layout()
  const start = hypotrochoid(0, fig)
  lastX = cx + start.x * scale
  lastY = cy + start.y * scale
  holdUntil = 0
}

function stampCell(col: number, row: number, g: string, now: number) {
  if (col < 0 || row < 0 || col >= cols || row >= rows) return
  ink.set(key(col, row), { g, born: now, tint: INK_TINTS[figI % INK_TINTS.length] })
}

function stampSegment(x0: number, y0: number, x1: number, y1: number, now: number) {
  const dx = x1 - x0
  const dy = y1 - y0
  const dist = Math.hypot(dx, dy)
  const steps = Math.max(1, Math.ceil(dist / 2))
  const g = headingGlyph(dx, dy)
  const len = dist || 1
  const ox = (-dy / len) * (cellH * 0.35)
  const oy = (dx / len) * (cellH * 0.35)
  for (let i = 1; i <= steps; i++) {
    const x = x0 + (dx * i) / steps
    const y = y0 + (dy * i) / steps
    stampCell(Math.floor(x / cellW), Math.floor(y / cellH), g, now)
    stampCell(Math.floor((x + ox) / cellW), Math.floor((y + oy) / cellH), g, now)
  }
}

function inkFill(age: number, tint: { r: number; g: number; b: number }) {
  const heat =
    age < 0.18 ? { r: 0xff, g: 0xc0, b: 0x91 } : age < 0.55 ? { r: 0xe0, g: 0x89, b: 0x48 } : tint
  const fadeT = age <= INK_HOLD ? 0 : Math.min(1, (age - INK_HOLD) / INK_FADE)
  return { color: cssRgb(mixRgb(heat, BG, fadeT)), gone: fadeT >= 1 }
}

function stepHover(dt: number) {
  const k = 1 - Math.exp(-dt / HOVER_TAU)
  const seen = new Set<string>()
  if (pointer) {
    const edge = Math.min(cellW, cellH)
    const col0 = Math.floor((pointer.x - HOVER_R) / cellW)
    const col1 = Math.ceil((pointer.x + HOVER_R) / cellW)
    const row0 = Math.floor((pointer.y - HOVER_R) / cellH)
    const row1 = Math.ceil((pointer.y + HOVER_R) / cellH)
    for (let y = row0; y <= row1; y++) {
      for (let x = col0; x <= col1; x++) {
        const dx = (x + 0.5) * cellW - pointer.x
        const dy = (y + 0.5) * cellH - pointer.y
        const d = Math.hypot(dx, dy)
        if (d > HOVER_R) continue
        const target = d <= HOVER_R - edge ? 1 : 1 - (d - (HOVER_R - edge)) / edge
        const id = key(x, y)
        const cur = dustLit.get(id) ?? 0
        dustLit.set(id, cur + (target - cur) * k)
        seen.add(id)
      }
    }
  }
  for (const [id, cur] of [...dustLit]) {
    if (seen.has(id)) continue
    const next = cur + (0 - cur) * k
    if (next < 0.012) dustLit.delete(id)
    else dustLit.set(id, next)
  }
}

function pruneInk(now: number) {
  for (const [id, cell] of ink) {
    if ((now - cell.born) / 1000 >= INK_HOLD + INK_FADE) ink.delete(id)
  }
}

function advance(dt: number, now: number) {
  if (holdUntil) {
    if (now >= holdUntil) beginFigure(figI + 1, false)
    return
  }

  const speed = tEnd / 7.2
  const next = Math.min(tEnd, t + dt * speed)
  const samples = Math.max(3, Math.ceil((next - t) * 72))
  for (let i = 1; i <= samples; i++) {
    const tt = t + ((next - t) * i) / samples
    const p = hypotrochoid(tt, fig)
    const x = cx + p.x * scale
    const y = cy + p.y * scale
    stampSegment(lastX, lastY, x, y, now)
    lastX = x
    lastY = y
  }
  t = next
  if (t >= tEnd - 1e-4) {
    t = tEnd
    holdUntil = now + 700
  }
}

function stampFullFigure(now: number) {
  const steps = 2800
  let px = lastX
  let py = lastY
  for (let i = 1; i <= steps; i++) {
    const tt = (tEnd * i) / steps
    const p = hypotrochoid(tt, fig)
    const x = cx + p.x * scale
    const y = cy + p.y * scale
    stampSegment(px, py, x, y, now)
    px = x
    py = y
  }
  t = tEnd
  lastX = px
  lastY = py
  holdUntil = now + 700
}

function dustGlyph(x: number, y: number, time: number) {
  const n = (x * 73 + y * 149) & 255
  const wave = Math.sin(time * 0.00035 + x * 0.08 + y * 0.055)
  if (n % 15 === 0 && wave > -0.2) return '·'
  if (n % 37 === 0 && wave > 0.05) return ':'
  return null
}

function paint(now: number) {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx || !cssW) return

  ctx.fillStyle = '#0e0d0b'
  ctx.fillRect(0, 0, cssW, cssH)
  ctx.font = `${Math.floor(cellH * 0.78)}px "IBM Plex Mono", ui-monospace, monospace`
  ctx.textBaseline = 'top'

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const g = dustGlyph(x, y, now)
      const lit = dustLit.get(key(x, y)) ?? 0
      if (!g && lit < 0.04) continue
      ctx.fillStyle = cssRgb(mixRgb(DUST, LIT, lit))
      ctx.fillText(g ?? '·', x * cellW, y * cellH)
    }
  }

  for (const [id, cell] of ink) {
    const comma = id.indexOf(',')
    const x = Number(id.slice(0, comma))
    const y = Number(id.slice(comma + 1))
    const { color, gone } = inkFill((now - cell.born) / 1000, cell.tint ?? INK_TINTS[0])
    if (gone) continue
    ctx.fillStyle = color
    ctx.fillText(cell.g, x * cellW, y * cellH)
  }

  const hx = Math.floor(lastX / cellW) * cellW
  const hy = Math.floor(lastY / cellH) * cellH
  ctx.fillStyle = '#ffc091'
  ctx.fillText('*', hx, hy)
}

function tick(now: number) {
  const dt = lastTs ? Math.min(0.05, (now - lastTs) / 1000) : 0.016
  lastTs = now
  if (!reduced) {
    stepHover(dt)
    pruneInk(now)
    advance(dt, now)
  }
  paint(now)
  raf = requestAnimationFrame(tick)
}

function sizeGrid() {
  const wrap = wrapRef.value
  const canvas = canvasRef.value
  if (!wrap || !canvas) return
  const w = wrap.clientWidth
  const h = wrap.clientHeight
  if (!w || !h) return
  const sizeKey = `${Math.round(w)}x${Math.round(h)}`
  if (sizeKey === lastSize) return
  lastSize = sizeKey
  cssW = w
  cssH = h
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.floor(cssW * dpr)
  canvas.height = Math.floor(cssH * dpr)
  canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
  cellW = cssW < 720 ? 10 : 8
  cellH = cssW < 720 ? 14 : 12
  cols = Math.ceil(cssW / cellW) + 1
  rows = Math.ceil(cssH / cellH) + 1
  beginFigure(figI, true)
  if (reduced) stampFullFigure(performance.now())
}

function pointerAt(e: PointerEvent) {
  const canvas = canvasRef.value
  if (!canvas) return null
  const rect = canvas.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

function onMove(e: PointerEvent) {
  pointer = pointerAt(e)
}

function onLeave() {
  pointer = null
}

function onDown() {
  if (reduced) return
  beginFigure(figI + 1, false)
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  sizeGrid()
  lastTs = 0
  raf = requestAnimationFrame(tick)
  observer = new ResizeObserver(() => sizeGrid())
  if (wrapRef.value) observer.observe(wrapRef.value)
  if (!cssW) requestAnimationFrame(sizeGrid)
  void nextTick(() => {
    if (!cssW) sizeGrid()
  })
  void document.fonts.ready.then(() => paint(performance.now())).catch(() => undefined)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
})
</script>

<style scoped>
.plotter-wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.plotter-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: crosshair;
}
</style>
