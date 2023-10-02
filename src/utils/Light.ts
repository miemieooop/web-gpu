import * as THREE from 'three'

function createLights() {
  const pointLight = new THREE.PointLight('white', 30000)
  pointLight.position.set(20, 100, 100)

  const pointLightHelp = new THREE.PointLightHelper(pointLight, 10)

  return { pointLight, pointLightHelp }
}

export { createLights }
