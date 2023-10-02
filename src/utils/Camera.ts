import * as THREE from 'three'

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    10000 // far clipping plane
  )

  camera.position.set(0, 150, 400)

  return camera
}

export { createCamera }
