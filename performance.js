import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
applyPreset(renderer, scene, 'desktop');

export const optimizationPresets = {
  desktop: {
    textureResolution: 4096,
    physicsSteps: 60,
    quantumWorkers: 4,
    maxPolyCount: 500000,
    shadowResolution: 2048,
    antialiasing: true,
    postProcessing: true,
  },
  web: {
    textureResolution: 2048,
    physicsSteps: 30,
    quantumWorkers: 1,
    maxPolyCount: 100000,
    shadowResolution: 1024,
    antialiasing: false,
    postProcessing: false,
  },
  mobile: {
    textureResolution: 1024,
    physicsSteps: 15,
    quantumWorkers: 0,
    maxPolyCount: 50000,
    shadowResolution: 512,
    antialiasing: false,
    postProcessing: false,
  },
};

export function applyPreset(renderer, scene, preset = "web") {
  const config = optimizationPresets[preset] || optimizationPresets.web;

  // Apply renderer settings
  if (renderer) {
    renderer.shadowMap.enabled = config.shadowResolution > 0;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.antialias = config.antialiasing;

    if (config.postProcessing) {
      console.log("Post-processing enabled with preset:", preset);
      // Here you would initialize post-processing effects
    }
  }

  // Apply physics settings
  if (window.physicsEngine) {
    window.physicsEngine.setTimeStep(1 / config.physicsSteps);
  }

  console.log(`Applied performance preset: ${preset}`);
  console.log(`- Texture resolution: ${config.textureResolution}`);
  console.log(`- Physics steps: ${config.physicsSteps}`);
  console.log(`- Max polygon count: ${config.maxPolyCount}`);

  return config;
}