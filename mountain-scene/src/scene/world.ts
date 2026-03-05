import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'

export const WORLD = {
  size: 120,
  segments: 256,
  height: 15.5,
  river: {
    a: 10.5,
    b: 3.4,
    f1: 0.06,
    f2: 0.13,
    width: 3.6,
    depth: 3.1,
    waterOffset: 0.18,
  },
  cliff: {
    drop: 4.6,
    sharpness: 0.06,
    bias: 0.12,
  },
}

const noise = new ImprovedNoise()

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

const fbm2 = (x: number, y: number) => {
  let f = 0
  let a = 0.55
  let fx = x
  let fy = y
  for (let i = 0; i < 5; i += 1) {
    f += a * noise.noise(fx, fy, i * 19.13)
    fx *= 2.02
    fy *= 2.02
    a *= 0.52
  }
  return f
}

export const riverX = (z: number) =>
  WORLD.river.a * Math.sin(z * WORLD.river.f1) +
  WORLD.river.b * Math.sin(z * WORLD.river.f2 + 1.3)

export const heightAt = (x: number, z: number) => {
  const nx = x / WORLD.size
  const nz = z / WORLD.size

  const ridge1 = Math.exp(-Math.pow(nx * 1.1, 2)) * (1.08 - Math.pow(nz * 0.82, 2))
  const ridge2 =
    Math.exp(-Math.pow((nx * 0.75 + nz * 0.35) * 1.2, 2)) *
    (0.95 - Math.pow((nz * 0.9 - nx * 0.1) * 0.9, 2))

  const slope = (0.62 - (nz + 0.5)) * 1.35
  const n = fbm2(nx * 5.2, nz * 5.2) * 0.55 + fbm2(nx * 11.4, nz * 11.4) * 0.18

  let h = (ridge1 * 0.85 + ridge2 * 0.6 + slope * 0.35 + n) * WORLD.height

  const fault = nx * 0.95 + nz * 0.52 - WORLD.cliff.bias
  const step = smoothstep(-WORLD.cliff.sharpness, WORLD.cliff.sharpness, fault)
  h -= step * WORLD.cliff.drop

  const cx = riverX(z)
  const d = Math.abs(x - cx)
  const valley = Math.exp(-(d * d) / (WORLD.river.width * WORLD.river.width)) * WORLD.river.depth
  h -= valley

  return h
}

