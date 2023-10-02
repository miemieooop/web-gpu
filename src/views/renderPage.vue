<template>
  <div class="w-100vw h-100vh bg-gray-200 flex justify-center items-center">
    <canvas class="w-500px h-500px bg-gray-900"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')!
  const w = canvas.width
  const h = canvas.height
  console.log(w, h)

  const canvasData = ctx.createImageData(w, h)
  const white: Color = {
    r: 255,
    g: 255,
    b: 255,
    a: 255
  }
  console.time()
  drawLine({ ctx: ctx, cad: canvasData }, 0, 0, w, h, white)
  updateCanvas(ctx, canvasData)
  ctx.beginPath()
  ctx.moveTo(0, h)
  ctx.lineTo(w, 0)
  ctx.closePath()
  ctx.strokeStyle = 'white'
  ctx.stroke()
  console.timeEnd()
})
type Color = {
  r: number
  g: number
  b: number
  a: number
}
const drawPixel = (ctx: CanvasRenderingContext2D, canvasData: ImageData, x: number, y: number, color: Color) => {
  const index = (x + y * ctx.canvas.width) * 4
  canvasData.data[index] = color.r
  canvasData.data[index + 1] = color.g
  canvasData.data[index + 2] = color.b
  canvasData.data[index + 3] = color.a
}
type conTend = {
  ctx: CanvasRenderingContext2D
  cad: ImageData
}
const drawLine = (con: conTend, x1: number, y1: number, x2: number, y2: number, color: Color) => {
  // 起点
  let x = x1
  let y = y1
  // xy差值
  let dx = x2 - x1
  let dy = y2 - y1
  // 单位增量
  let ux = dx > 0 ? 1 : -1
  let uy = dy > 0 ? 1 : -1
  // 差值取绝对值
  dx = Math.abs(dx)
  dy = Math.abs(dy)
  // 遍历生成直线点，以较长的轴向累加
  if (dx > dy) {
    // 初始判别式
    let p = 2 * dy - dx
    for (let i = 0; i <= dx; i++) {
      drawPixel(con.ctx, con.cad, x, y, color)
      x += ux
      if (p >= 0) {
        y += uy
        p += 2 * (dy - dx)
      } else {
        p += 2 * dy
      }
    }
  } else {
    let p = 2 * dx - dy
    for (let i = 0; i <= dy; i++) {
      drawPixel(con.ctx, con.cad, x, y, color)
      y += uy
      if (p >= 0) {
        x += ux
        p += 2 * (dx - dy)
      } else {
        p += 2 * dx
      }
    }
  }
}

const updateCanvas = (ctx: CanvasRenderingContext2D, canvasData: ImageData) => {
  ctx.putImageData(canvasData, 0, 0)
}
</script>
