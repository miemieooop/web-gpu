import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

async function createModel() {
  const loader = new GLTFLoader()
  const loaderDate = await loader.loadAsync('./wai-v3.glb').catch((err) => {
    console.log(err)
  })
  return loaderDate
}

export { createModel }
