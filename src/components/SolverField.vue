<template>
  <div class="solver" aria-hidden="true">
    <canvas ref="canvasRef"></canvas>
    <p class="status">{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const status = ref('SOLVING_ACTIVE')

const ROOMS = ['SCI 101', 'SCI 102', 'SCI 201', 'ENG 110', 'ENG 220', 'BUS 301', 'ART ST1']
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']

type Mark = 'ok' | 'try' | 'bad'
type Cell = { code: string; mark: Mark }
type Pos = { room: number; day: number }
type Job =
  | { kind: 'goto'; room: number; day: number }
  | { kind: 'write'; room: number; day: number; code: string; mark: Mark; note?: string }
  | { kind: 'restore'; room: number; day: number }
  | { kind: 'pause'; ms: number }
  | { kind: 'reset' }
type Placement = { code: string; room: number; day: number }
type Scene = { term: string; placements: Placement[]; jobs: Job[] }

function emptyGrid(): (Cell | null)[][] {
  return ROOMS.map(() => DAYS.map(() => null))
}

const SCENES: Scene[] = [
  {
    term: 'WINTER 2026',
    placements: [
      { code: 'CS101', room: 0, day: 0 },
      { code: 'CS201', room: 1, day: 0 },
      { code: 'MATH101', room: 4, day: 0 },
      { code: 'ENG201', room: 3, day: 0 },
      { code: 'PHYS101', room: 2, day: 1 },
      { code: 'CS301', room: 3, day: 1 },
      { code: 'BUS301', room: 5, day: 1 },
      { code: 'CS401', room: 0, day: 2 },
      { code: 'ENG101', room: 4, day: 2 },
      { code: 'MATH201', room: 3, day: 3 },
      { code: 'PHYS201', room: 2, day: 3 },
      { code: 'ART101', room: 6, day: 4 },
      { code: 'BUS101', room: 4, day: 4 },
    ],
    jobs: [
      { kind: 'goto', room: 0, day: 0 },
      { kind: 'write', room: 0, day: 0, code: 'CS101', mark: 'try' },
      { kind: 'pause', ms: 220 },
      { kind: 'goto', room: 0, day: 0 },
      { kind: 'write', room: 0, day: 0, code: 'CS201', mark: 'bad', note: 'ROOM CONFLICT' },
      { kind: 'pause', ms: 520 },
      { kind: 'restore', room: 0, day: 0 },
      { kind: 'goto', room: 1, day: 0 },
      { kind: 'write', room: 1, day: 0, code: 'CS201', mark: 'try' },
      { kind: 'pause', ms: 180 },
      { kind: 'goto', room: 4, day: 0 },
      { kind: 'write', room: 4, day: 0, code: 'MATH101', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 3, day: 0 },
      { kind: 'write', room: 3, day: 0, code: 'ENG201', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 2, day: 1 },
      { kind: 'write', room: 2, day: 1, code: 'PHYS101', mark: 'try' },
      { kind: 'pause', ms: 180 },
      { kind: 'goto', room: 2, day: 0 },
      { kind: 'write', room: 2, day: 0, code: 'MATH201', mark: 'bad', note: 'INSTRUCTOR CONFLICT' },
      { kind: 'pause', ms: 520 },
      { kind: 'restore', room: 2, day: 0 },
      { kind: 'goto', room: 3, day: 3 },
      { kind: 'write', room: 3, day: 3, code: 'MATH201', mark: 'try' },
      { kind: 'pause', ms: 180 },
      { kind: 'goto', room: 3, day: 1 },
      { kind: 'write', room: 3, day: 1, code: 'CS301', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 5, day: 1 },
      { kind: 'write', room: 5, day: 1, code: 'BUS301', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 0, day: 2 },
      { kind: 'write', room: 0, day: 2, code: 'CS401', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 4, day: 2 },
      { kind: 'write', room: 4, day: 2, code: 'ENG101', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 2, day: 3 },
      { kind: 'write', room: 2, day: 3, code: 'PHYS201', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 6, day: 4 },
      { kind: 'write', room: 6, day: 4, code: 'ART101', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 4, day: 4 },
      { kind: 'write', room: 4, day: 4, code: 'BUS101', mark: 'try' },
      { kind: 'pause', ms: 2600 },
      { kind: 'reset' },
    ],
  },
  {
    term: 'FALL 2025',
    placements: [
      { code: 'CS101', room: 0, day: 0 },
      { code: 'MATH101', room: 1, day: 0 },
      { code: 'ENG101', room: 3, day: 0 },
      { code: 'BUS101', room: 5, day: 0 },
      { code: 'CS201', room: 0, day: 1 },
      { code: 'PHYS101', room: 2, day: 1 },
      { code: 'BUS301', room: 5, day: 1 },
      { code: 'CS301', room: 3, day: 2 },
      { code: 'ENG201', room: 4, day: 2 },
      { code: 'MATH201', room: 4, day: 3 },
      { code: 'PHYS201', room: 2, day: 3 },
      { code: 'ART201', room: 6, day: 3 },
      { code: 'ART101', room: 6, day: 4 },
    ],
    jobs: [
      { kind: 'goto', room: 0, day: 0 },
      { kind: 'write', room: 0, day: 0, code: 'CS101', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 1, day: 0 },
      { kind: 'write', room: 1, day: 0, code: 'MATH101', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 3, day: 0 },
      { kind: 'write', room: 3, day: 0, code: 'ENG101', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 5, day: 0 },
      { kind: 'write', room: 5, day: 0, code: 'BUS101', mark: 'try' },
      { kind: 'pause', ms: 200 },
      { kind: 'goto', room: 0, day: 0 },
      { kind: 'write', room: 0, day: 0, code: 'CS201', mark: 'bad', note: 'ROOM CONFLICT' },
      { kind: 'pause', ms: 500 },
      { kind: 'restore', room: 0, day: 0 },
      { kind: 'goto', room: 0, day: 1 },
      { kind: 'write', room: 0, day: 1, code: 'CS201', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 2, day: 1 },
      { kind: 'write', room: 2, day: 1, code: 'PHYS101', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 5, day: 1 },
      { kind: 'write', room: 5, day: 1, code: 'BUS301', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 3, day: 2 },
      { kind: 'write', room: 3, day: 2, code: 'CS301', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 4, day: 2 },
      { kind: 'write', room: 4, day: 2, code: 'ENG201', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 4, day: 3 },
      { kind: 'write', room: 4, day: 3, code: 'MATH201', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 2, day: 3 },
      { kind: 'write', room: 2, day: 3, code: 'PHYS201', mark: 'try' },
      { kind: 'pause', ms: 180 },
      { kind: 'goto', room: 6, day: 4 },
      { kind: 'write', room: 6, day: 4, code: 'ART101', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 6, day: 4 },
      { kind: 'write', room: 6, day: 4, code: 'ART201', mark: 'bad', note: 'CAPACITY' },
      { kind: 'pause', ms: 560 },
      { kind: 'restore', room: 6, day: 4 },
      { kind: 'goto', room: 6, day: 3 },
      { kind: 'write', room: 6, day: 3, code: 'ART201', mark: 'try' },
      { kind: 'pause', ms: 2600 },
      { kind: 'reset' },
    ],
  },
  {
    term: 'SPRING 2026',
    placements: [
      { code: 'CS101', room: 0, day: 0 },
      { code: 'CS201', room: 1, day: 0 },
      { code: 'MATH101', room: 4, day: 0 },
      { code: 'PHYS101', room: 2, day: 1 },
      { code: 'ENG201', room: 3, day: 1 },
      { code: 'BUS301', room: 5, day: 1 },
      { code: 'CS301', room: 0, day: 2 },
      { code: 'ENG101', room: 4, day: 2 },
      { code: 'CS401', room: 1, day: 3 },
      { code: 'MATH201', room: 3, day: 3 },
      { code: 'PHYS201', room: 2, day: 3 },
      { code: 'BUS101', room: 5, day: 4 },
      { code: 'ART101', room: 6, day: 4 },
    ],
    jobs: [
      { kind: 'goto', room: 0, day: 0 },
      { kind: 'write', room: 0, day: 0, code: 'CS101', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 0, day: 0 },
      { kind: 'write', room: 0, day: 0, code: 'CS201', mark: 'bad', note: 'ROOM CONFLICT' },
      { kind: 'pause', ms: 420 },
      { kind: 'restore', room: 0, day: 0 },
      { kind: 'goto', room: 1, day: 0 },
      { kind: 'write', room: 1, day: 0, code: 'CS201', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 4, day: 0 },
      { kind: 'write', room: 4, day: 0, code: 'MATH101', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 3, day: 1 },
      { kind: 'write', room: 3, day: 1, code: 'ENG201', mark: 'try' },
      { kind: 'pause', ms: 160 },
      { kind: 'goto', room: 4, day: 1 },
      { kind: 'write', room: 4, day: 1, code: 'ENG101', mark: 'bad', note: 'INSTRUCTOR CONFLICT' },
      { kind: 'pause', ms: 480 },
      { kind: 'restore', room: 4, day: 1 },
      { kind: 'goto', room: 2, day: 0 },
      { kind: 'write', room: 2, day: 0, code: 'CS301', mark: 'bad', note: 'STUDENT CONFLICT' },
      { kind: 'pause', ms: 520 },
      { kind: 'restore', room: 2, day: 0 },
      { kind: 'goto', room: 2, day: 1 },
      { kind: 'write', room: 2, day: 1, code: 'PHYS101', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 5, day: 1 },
      { kind: 'write', room: 5, day: 1, code: 'BUS301', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 4, day: 2 },
      { kind: 'write', room: 4, day: 2, code: 'ENG101', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 0, day: 2 },
      { kind: 'write', room: 0, day: 2, code: 'CS301', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 1, day: 3 },
      { kind: 'write', room: 1, day: 3, code: 'CS401', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 3, day: 3 },
      { kind: 'write', room: 3, day: 3, code: 'MATH201', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 2, day: 3 },
      { kind: 'write', room: 2, day: 3, code: 'PHYS201', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 5, day: 4 },
      { kind: 'write', room: 5, day: 4, code: 'BUS101', mark: 'try' },
      { kind: 'pause', ms: 140 },
      { kind: 'goto', room: 6, day: 4 },
      { kind: 'write', room: 6, day: 4, code: 'ART101', mark: 'try' },
      { kind: 'pause', ms: 2600 },
      { kind: 'reset' },
    ],
  },
]

const FINAL = emptyGrid()
const grid = emptyGrid()
let sceneI = 0
let scene = SCENES[0]
let jobI = 0

function applyScene(index: number) {
  sceneI = ((index % SCENES.length) + SCENES.length) % SCENES.length
  scene = SCENES[sceneI]
  for (let r = 0; r < ROOMS.length; r++) {
    for (let d = 0; d < DAYS.length; d++) FINAL[r][d] = null
  }
  for (const p of scene.placements) FINAL[p.room][p.day] = { code: p.code, mark: 'ok' }
}

function sceneTotal() {
  return scene.placements.length
}

function currentJob() {
  return scene.jobs[jobI % scene.jobs.length]
}

applyScene(0)
let cursor: Pos = { room: 0, day: 0 }
let walk: Pos[] = []
let typed = 0
let pauseUntil = 0
let lastBeat = 0
let raf = 0
let reduced = false
let cssW = 0
let cssH = 0

function assigned() {
  let n = 0
  for (const row of grid) {
    for (const cell of row) {
      if (cell && cell.mark !== 'bad' && cell.code.length >= 4) n++
    }
  }
  return n
}

function hardCount() {
  let n = 0
  for (const row of grid) for (const cell of row) if (cell?.mark === 'bad') n++
  return n
}

function softScore() {
  return -(8 + Math.max(0, sceneTotal() - assigned()) * 3)
}

function setStatus(extra?: string) {
  const hard = hardCount()
  const done = assigned()
  const total = sceneTotal()
  if (extra) {
    status.value = `${extra} · ${done}/${total} · ${hard}HARD/${softScore()}SOFT`
    return
  }
  if (done >= total && hard === 0) {
    status.value = `0HARD · FEASIBLE · ${scene.term}`
    return
  }
  status.value = `SOLVING_ACTIVE · ${done}/${total} · ${hard}HARD/${softScore()}SOFT`
}

function pathTo(target: Pos): Pos[] {
  const out: Pos[] = []
  let r = cursor.room
  let d = cursor.day
  while (d !== target.day) {
    d += Math.sign(target.day - d)
    out.push({ room: r, day: d })
  }
  while (r !== target.room) {
    r += Math.sign(target.room - r)
    out.push({ room: r, day: d })
  }
  if (!out.length) out.push({ ...target })
  return out
}

function settleWrites() {
  for (const row of grid) {
    for (let i = 0; i < row.length; i++) {
      const cell = row[i]
      if (cell?.mark === 'try' && cell.code.length >= 4) row[i] = { code: cell.code, mark: 'ok' }
    }
  }
}

function beginJob(now: number) {
  const job = currentJob()
  if (job.kind === 'goto') {
    walk = pathTo({ room: job.room, day: job.day })
    return
  }
  if (job.kind === 'write') {
    settleWrites()
    typed = 0
    cursor = { room: job.room, day: job.day }
    grid[job.room][job.day] = { code: '', mark: job.mark }
    if (job.mark === 'bad') setStatus(job.note ?? 'ROOM CONFLICT')
    else setStatus()
    return
  }
  if (job.kind === 'restore') {
    const cell = FINAL[job.room][job.day]
    grid[job.room][job.day] = cell ? { ...cell } : null
    jobI++
    beginJob(now)
    return
  }
  if (job.kind === 'pause') {
    settleWrites()
    pauseUntil = now + job.ms
    if (assigned() >= sceneTotal()) setStatus()
    return
  }
  if (job.kind !== 'reset') return
  for (let r = 0; r < ROOMS.length; r++) {
    for (let d = 0; d < DAYS.length; d++) grid[r][d] = null
  }
  cursor = { room: 0, day: 0 }
  typed = 0
  walk = []
  status.value = 'SOLVING_ACTIVE'
  applyScene(sceneI + 1)
  jobI = 0
  beginJob(now)
}

function beat(now: number) {
  const job = currentJob()
  if (job.kind === 'goto') {
    if (walk.length) {
      cursor = walk.shift()!
      return
    }
    jobI++
    beginJob(now)
    return
  }
  if (job.kind === 'write') {
    typed += 1
    const shown = job.code.slice(0, typed)
    grid[job.room][job.day] = { code: shown, mark: job.mark }
    if (typed >= job.code.length) {
      if (job.mark === 'try') grid[job.room][job.day] = { code: job.code, mark: 'ok' }
      jobI++
      beginJob(now)
    }
    return
  }
  if (job.kind === 'pause') {
    if (now >= pauseUntil) {
      jobI++
      beginJob(now)
    }
  }
}

function size() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  cssW = canvas.clientWidth
  cssH = canvas.clientHeight
  if (!cssW || !cssH) return
  canvas.width = Math.floor(cssW * dpr)
  canvas.height = Math.floor(cssH * dpr)
  canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function paint() {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx || !cssW) return

  ctx.fillStyle = '#161410'
  ctx.fillRect(0, 0, cssW, cssH)

  const padL = Math.min(88, cssW * 0.14)
  const padT = 56
  const padB = 44
  const padR = 18
  const colW = (cssW - padL - padR) / DAYS.length
  const rowH = (cssH - padT - padB) / ROOMS.length

  ctx.font = '11px "IBM Plex Mono", ui-monospace, monospace'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillStyle = '#8f867a'
  ctx.fillText(scene.term, 16, 22)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#c9bfb1'
  DAYS.forEach((day, d) => {
    ctx.fillText(day, padL + colW * (d + 0.5), padT - 16)
  })

  ctx.textAlign = 'right'
  ctx.font = '10px "IBM Plex Mono", ui-monospace, monospace'
  ROOMS.forEach((room, r) => {
    ctx.fillStyle = '#8f867a'
    ctx.fillText(room, padL - 12, padT + rowH * (r + 0.5))
  })

  const fontSize = Math.max(11, Math.min(14, colW * 0.18))
  ctx.textAlign = 'center'
  ctx.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`

  for (let r = 0; r < ROOMS.length; r++) {
    for (let d = 0; d < DAYS.length; d++) {
      const x = padL + colW * d
      const y = padT + rowH * r
      const cx = x + colW / 2
      const cy = y + rowH / 2
      const cell = grid[r][d]
      const active = cursor.room === r && cursor.day === d

      ctx.strokeStyle = active ? 'rgba(224, 137, 72, 0.65)' : 'rgba(58, 52, 43, 0.95)'
      ctx.lineWidth = active ? 1.5 : 1
      ctx.strokeRect(x + 4, y + 4, colW - 8, rowH - 8)

      if (!cell || !cell.code) {
        ctx.fillStyle = active ? '#e08948' : '#3a342b'
        ctx.fillText(active ? '*' : '·', cx, cy)
        continue
      }
      const label = cell.mark === 'bad' ? `× ${cell.code}` : cell.code
      if (cell.mark === 'bad') ctx.fillStyle = '#e08948'
      else if (cell.mark === 'try') ctx.fillStyle = '#e7a06a'
      else ctx.fillStyle = '#e4d6c4'
      ctx.fillText(label, cx, cy)
    }
  }
}

function tick(now: number) {
  if (!reduced) {
    const job = currentJob()
    const wait = job.kind === 'write' ? 95 : job.kind === 'goto' ? 70 : 32
    if (now - lastBeat > wait) {
      lastBeat = now
      beat(now)
    }
  }
  paint()
  raf = requestAnimationFrame(tick)
}

function showFinal() {
  for (let r = 0; r < ROOMS.length; r++) {
    for (let d = 0; d < DAYS.length; d++) {
      const cell = FINAL[r][d]
      grid[r][d] = cell ? { ...cell } : null
    }
  }
  status.value = `0HARD · FEASIBLE · ${scene.term}`
}

let observer: ResizeObserver | null = null

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const canvas = canvasRef.value
  observer = new ResizeObserver(() => {
    size()
    paint()
  })
  if (canvas) observer.observe(canvas)
  size()
  if (reduced) showFinal()
  else beginJob(performance.now())
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
})
</script>

<style scoped>
.solver {
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
  .solver,
  canvas {
    min-height: 20rem;
    height: 20rem;
  }
}
</style>
