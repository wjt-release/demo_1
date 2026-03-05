import * as THREE from 'three';

export const terrainColors = {
  deepWater: new THREE.Color('#1a4a5e'),
  shallowWater: new THREE.Color('#2d8a8a'),
  sand: new THREE.Color('#c4a35a'),
  grass: new THREE.Color('#4a7c3f'),
  forest: new THREE.Color('#2d5a2d'),
  rock: new THREE.Color('#6b6b6b'),
  cliff: new THREE.Color('#4a4a4a'),
  snow: new THREE.Color('#f0f5f5'),
};

export function getTerrainColor(
  height: number,
  slope: number,
  isRiver: boolean = false
): THREE.Color {
  if (isRiver) {
    return terrainColors.shallowWater.clone();
  }

  if (slope > 0.7) {
    return terrainColors.cliff.clone();
  }

  if (height < 0.1) {
    return terrainColors.deepWater.clone().lerp(terrainColors.shallowWater, height / 0.1);
  }
  if (height < 0.2) {
    return terrainColors.shallowWater.clone().lerp(terrainColors.sand, (height - 0.1) / 0.1);
  }
  if (height < 0.35) {
    return terrainColors.sand.clone().lerp(terrainColors.grass, (height - 0.2) / 0.15);
  }
  if (height < 0.55) {
    return terrainColors.grass.clone().lerp(terrainColors.forest, (height - 0.35) / 0.2);
  }
  if (height < 0.75) {
    return terrainColors.forest.clone().lerp(terrainColors.rock, (height - 0.55) / 0.2);
  }
  if (height < 0.9) {
    return terrainColors.rock.clone().lerp(terrainColors.snow, (height - 0.75) / 0.15);
  }
  return terrainColors.snow.clone();
}

export const dayColors = {
  sky: new THREE.Color('#87ceeb'),
  horizon: new THREE.Color('#f0e6d3'),
  sun: new THREE.Color('#fff5e6'),
};

export const sunsetColors = {
  sky: new THREE.Color('#1a1a3e'),
  horizon: new THREE.Color('#ff6b35'),
  sun: new THREE.Color('#ff4500'),
};

export const nightColors = {
  sky: new THREE.Color('#0a0a1a'),
  horizon: new THREE.Color('#1a1a2e'),
  moon: new THREE.Color('#e6e6ff'),
};

export function lerpColor(a: THREE.Color, b: THREE.Color, t: number): THREE.Color {
  return a.clone().lerp(b, t);
}
