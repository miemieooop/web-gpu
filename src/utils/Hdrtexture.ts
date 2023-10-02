import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import * as THREE from 'three'

async function createHdrtexture() {
  const loader = new RGBELoader()
  const textureHdr = await loader.loadAsync('./dikhololo_night_1k.hdr')
  textureHdr.mapping = THREE.EquirectangularReflectionMapping
  return textureHdr
}

export { createHdrtexture }
