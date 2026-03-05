import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { generateHeight, getRiverPath } from '@/utils/noise';
import { getTerrainColor } from '@/utils/terrainColors';
import type { TerrainConfig } from '@/types';

export function useTerrain(config: TerrainConfig) {
  const { width, height, segments, heightScale, noiseScale } = config;
  const riverPathRef = useRef<{ x: number; y: number }[]>([]);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, segments, segments);
    const positions = geo.attributes.position.array as Float32Array;
    const colors = new Float32Array(positions.length);

    const riverWidth = 8;
    riverPathRef.current = getRiverPath(segments, segments, noiseScale * 2);

    const isNearRiver = (x: number, y: number): boolean => {
      for (const point of riverPathRef.current) {
        const dx = x - point.x;
        const dy = y - point.y;
        if (Math.sqrt(dx * dx + dy * dy) < riverWidth) {
          return true;
        }
      }
      return false;
    };

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      const gridX = Math.floor(((x + width / 2) / width) * segments);
      const gridY = Math.floor(((y + height / 2) / height) * segments);

      let terrainHeight = generateHeight(x, y, noiseScale);

      const nearRiver = isNearRiver(gridX, gridY);
      if (nearRiver) {
        terrainHeight = Math.min(terrainHeight, 0.08);
      }

      positions[i + 2] = terrainHeight * heightScale;

      const color = getTerrainColor(
        (terrainHeight + 1) / 2,
        0,
        nearRiver
      );
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const slopes = new Float32Array(positions.length / 3);
    const indices = geo.index?.array;
    if (indices) {
      for (let i = 0; i < indices.length; i += 3) {
        const a = indices[i];
        const b = indices[i + 1];
        const c = indices[i + 2];

        const vA = new THREE.Vector3(
          positions[a * 3],
          positions[a * 3 + 1],
          positions[a * 3 + 2]
        );
        const vB = new THREE.Vector3(
          positions[b * 3],
          positions[b * 3 + 1],
          positions[b * 3 + 2]
        );
        const vC = new THREE.Vector3(
          positions[c * 3],
          positions[c * 3 + 1],
          positions[c * 3 + 2]
        );

        const normal = new THREE.Vector3()
          .crossVectors(
            new THREE.Vector3().subVectors(vB, vA),
            new THREE.Vector3().subVectors(vC, vA)
          )
          .normalize();

        const slope = 1 - Math.abs(normal.z);
        slopes[a] = Math.max(slopes[a], slope);
        slopes[b] = Math.max(slopes[b], slope);
        slopes[c] = Math.max(slopes[c], slope);
      }
    }

    geo.setAttribute('slope', new THREE.BufferAttribute(slopes, 1));

    return geo;
  }, [width, height, segments, heightScale, noiseScale]);

  return { geometry, riverPath: riverPathRef.current };
}
