<template>
  <div class="w-100vw h-100vh bg-gray-300">
    <canvas class="w-1/1 h-1/1"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'

const init = async () => {
  const canvas = document.querySelector('canvas')!
  // 找到gpu适配器
  const adapter = await navigator.gpu.requestAdapter()
  if (!adapter) {
    console.log('不支持webGpu')
    return
  }
  // 寻找gpu设备
  const device = await adapter.requestDevice()
  // 获取canvas的WebGPU上下文
  const context = canvas.getContext('webgpu')!
  // 获取设备支持的画布格式
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat()
  // 配置WebGPU上下文
  context.configure({ device: device, format: canvasFormat })
  // 创建一个渲染命令编码器
  const encoder = device.createCommandEncoder()
  // 开始渲染命令
  const pass = encoder.beginRenderPass({
    // 设置渲染颜色附件
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(),
        loadOp: 'clear',
        clearValue: { r: 0, g: 0, b: 0.4, a: 1 },
        storeOp: 'store'
      }
    ]
  })
  // 结束渲染命令
  pass.end()
  // 结束渲染命令编码
  const commandBuffer = encoder.finish()
  // 提交渲染命令
  device.queue.submit([commandBuffer])
}
onMounted(() => {
  init()
})
</script>
