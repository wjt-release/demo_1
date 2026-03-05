import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

export function fbm(x: number, y: number, octaves: number = 6): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency);
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value / maxValue;
}

export function ridgedNoise(x: number, y: number, octaves: number = 4): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    const n = noise2D(x * frequency, y * frequency);
    const ridged = 1 - Math.abs(n);
    value += amplitude * ridged * ridged;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value / maxValue;
}

export function generateHeight(
  x: number,
  y: number,
  scale: number = 0.02
): number {
  const nx = x * scale;
  const ny = y * scale;

  const base = fbm(nx, ny, 6) * 0.5;
  const ridged = ridgedNoise(nx * 0.5 + 10, ny * 0.5 + 10, 4) * 0.3;
  const detail = fbm(nx * 4, ny * 4, 3) * 0.2;

  return base + ridged + detail;
}

export function getRiverPath(
  width: number,
  height: number,
  scale: number = 0.03
): { x: number; y: number }[] {
  const path: { x: number; y: number }[] = [];
  let x = width * 0.3;
  let y = 0;

  while (y < height) {
    path.push({ x, y });
    const noiseVal = noise2D(x * scale, y * scale);
    x += noiseVal * 3;
    x = Math.max(5, Math.min(width - 5, x));
    y += 2;
  }

  return path;
}
