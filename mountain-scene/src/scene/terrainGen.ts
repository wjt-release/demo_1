import * as THREE from 'three'
import { smoothstep } from '../lib/damp'
import { makeFbm2D } from './noise'

export type TerrainBundle = {
  geometry: THREE.PlaneGeometry
  minHeight: number
  maxHeight: number
  riverCurve: THREE.CatmullRomCurve3
}

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v))
}

function colorStops(t: number) {
  const c0 = new THREE.Color('#0b1f1a')
  const c1 = new THREE.Color('#1f4b3a')
  const c2 = new THREE.Color('#506255')
  const c3 = new THREE.Color('#cfd8dd')
  if (t < 0.34) return c0.clone().lerp(c1, smoothstep(0.08, 0.34, t))
  if (t < 0.7) return c1.clone().lerp(c2, smoothstep(0.34, 0.7, t))
  return c2.clone().lerp(c3, smoothstep(0.7, 0.98, t))
}

export function generateTerrain(seed: number, size = 44, segments = 200): TerrainBundle {
  const fbm = makeFbm2D(seed)
  const geo = new THREE.PlaneGeometry(size, size, segments, segments)
  geo.rotateX(-Math.PI / 2)

  const riverCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-12.5, 0, -20),
      new THREE.Vector3(-6.2, 0, -12),
      new THREE.Vector3(-2.8, 0, -4.4),
      new THREE.Vector3(1.1, 0, 1.5),
      new THREE.Vector3(6.4, 0, 10.5),
      new THREE.Vector3(12.8, 0, 20.5),
    ],
    false,
    'catmullrom',
    0.6,
  )

  const pos = geo.attributes.position as THREE.BufferAttribute
  const vCount = pos.count
  const heights = new Float32Array(vCount)

  let minH = Infinity
  let maxH = -Infinity

  const sampleRiver = (() => {
    const pts = riverCurve.getPoints(84)
    return (x: number, z: number) => {
      let best = Infinity
      for (let i = 0; i < pts.length; i += 1) {
        const dx = x - pts[i].x
        const dz = z - pts[i].z
        const d2 = dx * dx + dz * dz
        if (d2 < best) best = d2
      }
      return Math.sqrt(best)
    }
  })()

  for (let i = 0; i < vCount; i += 1) {
    const x = pos.getX(i)
    const z = pos.getZ(i)

    const n1 = fbm(x * 0.045, z * 0.045, 5, 2, 0.52)
    const n2 = fbm(x * 0.11 + 12.3, z * 0.11 - 8.9, 4, 2.1, 0.5)
    const ridge = 1 - Math.abs(fbm(x * 0.085 - 2.2, z * 0.085 + 5.7, 4, 2, 0.55))
    const base = n1 * 8.5 + n2 * 2.6 + ridge * ridge * 7.2

    const plate = fbm(x * 0.016 + 40.0, z * 0.016 - 33.0, 3, 2, 0.5)
    const fault = Math.tanh((x * 0.72 + z * 0.16 + plate * 6.0) * 0.22)
    const cliffMask = smoothstep(0.15, 0.85, Math.abs(fault))
    const cliff = fault * (2.8 + cliffMask * 6.5)

    const edge = Math.sqrt((x / (size * 0.5)) ** 2 + (z / (size * 0.5)) ** 2)
    const island = 1 - smoothstep(0.62, 1.02, edge)

    const riverD = sampleRiver(x, z)
    const riverWidth = 0.75 + 0.35 * fbm(x * 0.12, z * 0.12, 2, 2, 0.5)
    const riverInfluence = 1 - smoothstep(riverWidth, riverWidth + 2.6, riverD)
    const carve = -Math.pow(clamp(riverInfluence, 0, 1), 1.8) * 7.1

    const h = (base + cliff + carve) * island - 1.4

    heights[i] = h
    if (h < minH) minH = h
    if (h > maxH) maxH = h
  }

  const colors = new Float32Array(vCount * 3)
  const grid = segments + 1
  const idx = (x: number, y: number) => y * grid + x
  const hAt = (x: number, y: number) => heights[idx(clamp(x, 0, grid - 1), clamp(y, 0, grid - 1))]

  const invRange = 1 / Math.max(1e-6, maxH - minH)
  const rock = new THREE.Color('#5b5d58')
  const moss = new THREE.Color('#203b2e')

  for (let y = 0; y < grid; y += 1) {
    for (let x = 0; x < grid; x += 1) {
      const i = idx(x, y)
      const h = heights[i]
      const t = clamp((h - minH) * invRange, 0, 1)

      const dx = hAt(x + 1, y) - hAt(x - 1, y)
      const dz = hAt(x, y + 1) - hAt(x, y - 1)
      const slope = Math.sqrt(dx * dx + dz * dz)
      const slopeMask = smoothstep(0.18, 0.9, slope)

      const c = colorStops(t)
      c.lerp(moss, 0.08 * (1 - t))
      c.lerp(rock, 0.65 * slopeMask)

      colors[i * 3 + 0] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
  }

  for (let i = 0; i < vCount; i += 1) {
    pos.setY(i, heights[i])
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.computeVertexNormals()

  return { geometry: geo, minHeight: minH, maxHeight: maxH, riverCurve }
}
