<template>
  <div class="w-100vw h-100vh bg-gray-200 flex justify-center items-center">
    <canvas width="800" height="800" class="w-500px h-500px bg-gray-900"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { load } from '~/utils/OBJLoader'
import { Render } from '~/utils/Render'

onMounted(async () => {
  console.time()
  await init()
  console.timeEnd()
})

const init = async () => {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement
  const render = new Render(canvas)
  const { vertices, faceVertices } = await load('./african_head.obj')
  for (const item of faceVertices) {
    // 遍历三角面片
    for (let i = 0; i < 3; i++) {
      // 获取三角面片的三个顶点
      const v0 = parseInt(item[i][0]) - 1
      const v1 = parseInt(item[(i + 1) % 3][0]) - 1

      const x0 = ((vertices[v0].x + 1) * render.w) / 2
      const y0 = ((vertices[v0].y + 1) * render.h) / 2
      const x1 = ((vertices[v1].x + 1) * render.w) / 2
      const y1 = ((vertices[v1].y + 1) * render.h) / 2

      render.drawLine(x0, y0, x1, y1, 'white')
    }
  }
}
</script>
