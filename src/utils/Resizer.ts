import { useThrottleFn } from '@vueuse/core'

const setSize = (container: HTMLElement, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
  //修改相机纵横比
  camera.aspect = container.clientWidth / container.clientHeight
  //修改视锥
  camera.updateProjectionMatrix()

  // 修改视窗
  renderer.setSize(container.clientWidth, container.clientHeight)

  // 设置像素比
  renderer.setPixelRatio(window.devicePixelRatio)
}

class Resizer {
  // 构造函数，传入容器、相机、渲染器
  constructor(container: HTMLElement, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    // 设置容器、相机、渲染器大小
    setSize(container, camera, renderer)
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      // 调用节流函数，传入容器、相机、渲染器
      this.throttledFn(container, camera, renderer)
    })
  }
  // 节流函数，传入容器、相机、渲染器
  throttledFn = useThrottleFn(
    (container: HTMLElement, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
      // 设置容器、相机、渲染器大小
      setSize(container, camera, renderer)
      // 调用onResize函数
      this.onResize()
    },
    500
  )
  // onResize函数
  onResize = () => {}
}

export { Resizer }
