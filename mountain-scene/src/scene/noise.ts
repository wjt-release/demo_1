export type Noise2D = (x: number, y: number) => number

function mulberry32(seed: number) {
  let a = seed | 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash2(ix: number, iy: number, seed: number) {
  let h = ix * 374761393 + iy * 668265263 + seed * 1442695041
  h = (h ^ (h >>> 13)) * 1274126177
  h = (h ^ (h >>> 16)) >>> 0
  return h / 4294967296
}

function fade(t: number) {
  return t * t * (3 - 2 * t)
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function makeValueNoise2D(seed: number): Noise2D {
  return (x: number, y: number) => {
    const x0 = Math.floor(x)
    const y0 = Math.floor(y)
    const x1 = x0 + 1
    const y1 = y0 + 1

    const sx = fade(x - x0)
    const sy = fade(y - y0)

    const n00 = hash2(x0, y0, seed)
    const n10 = hash2(x1, y0, seed)
    const n01 = hash2(x0, y1, seed)
    const n11 = hash2(x1, y1, seed)

    const ix0 = lerp(n00, n10, sx)
    const ix1 = lerp(n01, n11, sx)
    return lerp(ix0, ix1, sy) * 2 - 1
  }
}

export function makeFbm2D(seed: number) {
  const base = makeValueNoise2D(seed)
  return (x: number, y: number, octaves = 5, lacunarity = 2, gain = 0.5) => {
    let amp = 0.5
    let freq = 1
    let sum = 0
    let norm = 0
    for (let i = 0; i < octaves; i += 1) {
      sum += amp * base(x * freq, y * freq)
      norm += amp
      amp *= gain
      freq *= lacunarity
    }
    return sum / Math.max(1e-6, norm)
  }
}

export function makeSeed() {
  const rnd = mulberry32((Math.random() * 1e9) | 0)
  return (rnd() * 1e9) | 0
}

