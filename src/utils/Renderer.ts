import * as THREE from 'three'

// 创建WebGL渲染器
function createRenderer() {
  // 创建WebGL渲染器，设置antialias为true，logarithmicDepthBuffer为true
  const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true })
  // 设置渲染器的输出颜色空间为sRGB
  renderer.outputColorSpace = THREE.SRGBColorSpace
  // 返回渲染器
  return renderer
}

// 导出createRenderer函数
export { createRenderer }
