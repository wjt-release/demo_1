function fract(v: number) {
  return v - Math.floor(v);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function hash2(ix: number, iz: number, seed: number) {
  const s = seed * 0.00001337;
  const v = Math.sin(ix * 127.1 + iz * 311.7 + s * 43758.5453) * 43758.5453;
  return fract(v);
}

export function valueNoise2D(x: number, z: number, seed: number) {
  const x0 = Math.floor(x);
  const z0 = Math.floor(z);
  const x1 = x0 + 1;
  const z1 = z0 + 1;

  const sx = smoothstep(fract(x));
  const sz = smoothstep(fract(z));

  const n00 = hash2(x0, z0, seed);
  const n10 = hash2(x1, z0, seed);
  const n01 = hash2(x0, z1, seed);
  const n11 = hash2(x1, z1, seed);

  const nx0 = lerp(n00, n10, sx);
  const nx1 = lerp(n01, n11, sx);
  return lerp(nx0, nx1, sz);
}

export function fbm2D(x: number, z: number, seed: number, octaves = 5) {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * (valueNoise2D(x * freq, z * freq, seed + i * 101) * 2 - 1);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / Math.max(1e-6, norm);
}

export function ridge2D(x: number, z: number, seed: number) {
  const n = fbm2D(x, z, seed, 4);
  const r = 1 - Math.abs(n);
  return r * r;
}

export type TerrainParams = {
  sizeX: number;
  sizeZ: number;
  heightScale: number;
};

export const defaultTerrainParams: TerrainParams = {
  sizeX: 92,
  sizeZ: 70,
  heightScale: 16.5,
};

export function terrainHeight(x: number, z: number, seed: number, p: TerrainParams = defaultTerrainParams) {
  const nx = x / p.sizeX;
  const nz = z / p.sizeZ;

  const base = fbm2D(nx * 3.2, nz * 3.2, seed, 5) * 0.9;
  const ridges = ridge2D(nx * 4.8 + 3.1, nz * 4.8 - 1.7, seed + 19) * 0.9;

  const warpX = fbm2D(nx * 2.0 + 8.2, nz * 2.0 - 4.6, seed + 73, 3) * 0.35;
  const warpZ = fbm2D(nx * 2.0 - 1.4, nz * 2.0 + 6.8, seed + 97, 3) * 0.35;
  const warped = fbm2D((nx + warpX) * 6.0, (nz + warpZ) * 6.0, seed + 7, 4) * 0.65;

  const valleyCurve = Math.sin(nx * 2.35 + 0.5) * 0.22 + Math.sin(nx * 6.1 - 1.2) * 0.06;
  const valleyDist = Math.abs(nz - (0.52 + valleyCurve));
  const valley = Math.exp(-Math.pow(valleyDist * 7.2, 2)) * 0.65;

  const fault = (nx * 0.92 + nz * 0.36) - 0.48;
  const faultStep = 1 / (1 + Math.exp(-fault * 26));
  const cliff = (faultStep - 0.5) * 0.85;

  const h01 = (base * 0.55 + warped * 0.35 + ridges * 0.55 + cliff) - valley;
  const shape = Math.max(-1, Math.min(1, h01));
  const eased = Math.sign(shape) * Math.pow(Math.abs(shape), 1.18);
  return eased * p.heightScale;
}

export function riverCenterZ01(x01: number, seed: number) {
  const a = Math.sin(x01 * 2.35 + 0.5) * 0.22;
  const b = Math.sin(x01 * 6.1 - 1.2) * 0.06;
  const drift = fbm2D(x01 * 3.0, 0.3, seed + 501, 2) * 0.06;
  return 0.52 + a + b + drift;
}

