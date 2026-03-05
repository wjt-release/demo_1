import * as THREE from 'three';

export interface TerrainConfig {
  width: number;
  height: number;
  segments: number;
  heightScale: number;
  noiseScale: number;
}

export interface DayNightState {
  time: number;
  sunPosition: THREE.Vector3;
  moonPosition: THREE.Vector3;
  skyColor: THREE.Color;
  ambientIntensity: number;
  directionalIntensity: number;
  isDay: boolean;
}

export interface SceneState {
  showContours: boolean;
  dayNightTime: number;
  isAutoCycle: boolean;
  cycleSpeed: number;
}

export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';
