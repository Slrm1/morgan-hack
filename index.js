// index.js
import { MultiScaleScene } from './modules/visualization/sceneController.js';
import { optimizationPresets, applyPreset } from './config/performance.js';

// Main application class
class EnvironmentalSimulation {
  constructor(config = {}) {
    this.config = {
      preset: 'desktop',
      canvasId: 'simulation-canvas',
      initialCoordinates: { lat: 40.7128, lng: -74.0060 }, // New York City
      ...config
    };
    
    this.initialized = false;
  }
  
  async initialize() {
    try {
      console.log("Initializing Environmental Simulation...");
      console.log(`Using performance preset: ${this.config.preset}`);
      
      // Create visualization scene
      this.scene = new MultiScaleScene(this.config.canvasId);
      
      // Apply performance settings
      const performanceConfig = applyPreset(
        this.scene.renderer, 
        this.scene.scene, 
        this.config.preset
      );
      
      // Load environment based on coordinates
      const terrain = await this.scene.loadEnvironment(this.config.initialCoordinates);
      console.log("Terrain loaded successfully");
      
      // Create dummy heatmap data
      const size = 100;
      const heatmapData = new Uint8Array(size * size * 4);
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const idx = (i * size + j) * 4;
          // Create a simple pattern
          const value = (Math.sin(i/10) * Math.cos(j/10) + 1) / 2;
          heatmapData[idx] = value * 255;     // R
          heatmapData[idx + 1] = 0;           // G
          heatmapData[idx + 2] = 0;           // B
          heatmapData[idx + 3] = 255;         // A
        }
      }
      
      // Add climate overlay
      this.overlay = this.scene.addClimateOverlay(heatmapData, 0.2);
      
      // Start animation loop
      this.scene.animate();
      
      this.initialized = true;
      console.log("Environmental Simulation initialized successfully");
      
      return true;
    } catch (error) {
      console.error("Failed to initialize Environmental Simulation:", error);
      return false;
    }
  }
  
  updateClimateData(newData) {
    if (!this.initialized) {
      console.error("Cannot update climate data - simulation not initialized");
      return false;
    }
    
    // In a real application, this would update the climate data
    console.log("Updating climate data...");
    // this.overlay.material.uniforms.heatMap.value = newData;
    
    return true;
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create canvas element
  const canvas = document.createElement('div');
  canvas.id = 'simulation-canvas';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  document.body.appendChild(canvas);
  
  // Create app instance
  const app = new EnvironmentalSimulation({
    preset: 'desktop',
    canvasId: 'simulation-canvas'
  });
  
  // Initialize the app
  app.initialize().then(success => {
    if (success) {
      console.log("Application started successfully");
    } else {
      console.error("Application failed to start");
    }
  });
});

// Export the application class
export default EnvironmentalSimulation;
