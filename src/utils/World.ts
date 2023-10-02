import * as THREE from 'three'
import { createCamera } from './Camera'
import { createScene } from './Scene'
import { createRenderer } from './Renderer'
import { Resizer } from './Resizer'
import { createModel } from './Model'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createLights } from './Light'
import { createHdrtexture } from './Hdrtexture'

class World {
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  constructor(container: HTMLElement) {
    //初始化相机场景和渲染器
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    createHdrtexture().then((textureHdr) => {
      this.scene.environment = textureHdr
      this.scene.background = textureHdr
    })
    container.appendChild(this.renderer.domElement)
    const resize = new Resizer(container, this.camera, this.renderer)
    resize.onResize = () => {
      this.render()
    }

    // 添加灯光
    const { pointLight, pointLightHelp } = createLights()
    this.scene.add(pointLight, pointLightHelp)
  }
  render = () => {
    const controls = this.setOrbitControls()
    this.renderer.setAnimationLoop(() => {
      controls.update()
      this.renderer.render(this.scene, this.camera)
    })
  }
  setOrbitControls = () => {
    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    controls.enableDamping = true
    return controls
  }

  loadOutsideModel = async () => {
    const date = await createModel()
    if (!date) return
    this.scene.add(date.scene)
  }
}

export { World }
