export type Figure = { R: number; r: number; d: number }

export const FIGURES: Figure[] = [
  { R: 8, r: 3, d: 4.7 },
  { R: 11, r: 4, d: 5.4 },
  { R: 13, r: 5, d: 6.1 },
  { R: 7, r: 3, d: 4.2 },
  { R: 9, r: 5, d: 4.4 },
  { R: 5, r: 3, d: 2.8 },
  { R: 6, r: 1, d: 3.5 },
  { R: 8, r: 5, d: 3.6 },
]

function gcd(a: number, b: number) {
  a = Math.abs(Math.round(a))
  b = Math.abs(Math.round(b))
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return a || 1
}

export function period(fig: Figure) {
  return (Math.PI * 2 * fig.r) / gcd(fig.R, fig.r)
}

export function hypotrochoid(t: number, fig: Figure) {
  const k = (fig.R - fig.r) / fig.r
  return {
    x: (fig.R - fig.r) * Math.cos(t) + fig.d * Math.cos(k * t),
    y: (fig.R - fig.r) * Math.sin(t) - fig.d * Math.sin(k * t),
  }
}

export function figureRadius(fig: Figure) {
  return Math.abs(fig.R - fig.r) + fig.d
}

export function headingGlyph(dx: number, dy: number) {
  const ax = Math.abs(dx)
  const ay = Math.abs(dy)
  if (ax < 1e-6 && ay < 1e-6) return '+'
  if (ax > ay * 1.8) return '='
  if (ay > ax * 1.8) return '|'
  if (dx * dy > 0) return '\\'
  return '/'
}
