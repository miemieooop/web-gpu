<template>
  <div class="w-100vw h-100vh bg-gray-200 flex justify-center items-center">
    <canvas width="800" height="800" class="w-500px h-500px bg-gray-900"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { Vector } from '~/class/Vector'
import { Point2 } from '~/types'
import { load } from '~/utils/OBJLoader'
import { Render } from '~/utils/Render'

onMounted(async () => {
  console.time()
  await init()

  // testDrawTrangle()

  console.timeEnd()
})

const init = async () => {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement
  const render = new Render(canvas)
  const { vertices, faceVertices } = await load('./teapot.obj')
  const light = new Vector(0, 0, -1)
  for (const item of faceVertices) {
    // 遍历三角面片
    const pointList: Point2[] = []
    const screenCoords: Vector[] = []
    const worldCoords: Vector[] = []
    for (let i = 0; i < 3; i++) {
      // 获取三角面片的三个顶点
      const v0 = parseInt(item[i][0]) - 1
      const x0 = ((vertices[v0].x + 3) * render.w) / 6
      const y0 = ((vertices[v0].y + 1) * render.h) / 6
      pointList.push({ x: x0, y: y0 })
      screenCoords.push(new Vector(x0, y0, 0))
      worldCoords.push(new Vector(vertices[v0].x, vertices[v0].y, vertices[v0].z))
      // const v1 = parseInt(item[(i + 1) % 3][0]) - 1
      // const x1 = ((vertices[v1].x + 3) * render.w) / 6
      // const y1 = ((vertices[v1].y + 1) * render.h) / 6

      // render.drawLine(x0, y0, x1, y1, 'white')
    }
    const n = worldCoords[2].sub(worldCoords[0]).crossProduct3(worldCoords[1].sub(worldCoords[0])).normalize()

    const intensity = n.dot(light)

    if (intensity > 0) {
      const color = `rgb(${intensity * 255}, ${intensity * 255}, ${intensity * 255}, 255)`

      render.drawTriangle(pointList, color)
    }
  }
}

// const testDrawTrangle = () => {
//   const canvas = document.querySelector('canvas') as HTMLCanvasElement
//   const render = new Render(canvas)
//   const A: Point2 = { x: 10, y: 10 }
//   const B: Point2 = { x: 150, y: 30 }
//   const C: Point2 = { x: 70, y: 160 }

//   render.drawTriangle([A, B, C], 'red')
// }
</script>
