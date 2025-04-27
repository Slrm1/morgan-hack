// shaders/climateOverlay.frag
uniform sampler2D heatMap;
uniform sampler2D map;
uniform float seaLevel;

varying vec2 vUv;

void main() {
  vec4 baseColor = texture2D(map, vUv);
  float heatValue = texture2D(heatMap, vUv).r;
  
  vec3 blendedColor = mix(
    baseColor.rgb, 
    vec3(heatValue, 0.0, 0.0), 
    smoothstep(0.4, 0.6, heatValue)
  );
  
  if(vUv.y < seaLevel) {
    blendedColor = mix(blendedColor, vec3(0.0, 0.0, 1.0), 0.7);
  }
  
  gl_FragColor = vec4(blendedColor, 1.0);
}
