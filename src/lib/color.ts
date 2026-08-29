export type RGB = { r: number; g: number; b: number }

export function mixRgb(a: RGB, b: RGB, t: number): RGB {
  const m = Math.max(0, Math.min(1, t))
  return {
    r: a.r + (b.r - a.r) * m,
    g: a.g + (b.g - a.g) * m,
    b: a.b + (b.b - a.b) * m,
  }
}

export function cssRgb(c: RGB, dim = 1) {
  return `rgb(${Math.round(c.r * dim)}, ${Math.round(c.g * dim)}, ${Math.round(c.b * dim)})`
}
