import { Vector } from '~/class/Vector'
import { Point2 } from '~/types'

class Render {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  w: number
  h: number
  private color: string
  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) {
      new DOMException('Canvas is not defined')
    }
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')!
    this.w = this.canvas.width
    this.h = this.canvas.height
    this.context.translate(0, this.w)
    this.context.rotate(Math.PI)
    this.context.scale(-1, 1)
    this.color = 'white'
  }

  private drawPixel = (x: number, y: number) => {
    this.context.fillStyle = this.color
    this.context.fillRect(x, y, 1, 1)
  }
  drawLine = (x1: number, y1: number, x2: number, y2: number, color: string) => {
    this.color = color
    let x = x1
    let y = y1
    let dx = x2 - x1
    let dy = y2 - y1
    const ux = dx > 0 ? 1 : -1
    const uy = dy > 0 ? 1 : -1
    dx = Math.abs(dx)
    dy = Math.abs(dy)
    if (dx > dy) {
      let p = 2 * dy - dx
      for (let i = 0; i <= dx; i++) {
        this.drawPixel(x, y)
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
        this.drawPixel(x, y)
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

  drawTriangle2 = (tPoint: Point2[], color: string) => {
    this.color = color
    const AB = new Vector(tPoint[1].x - tPoint[0].x, tPoint[1].y - tPoint[0].y)
    const BC = new Vector(tPoint[2].x - tPoint[1].x, tPoint[2].y - tPoint[1].y)
    const CA = new Vector(tPoint[0].x - tPoint[2].x, tPoint[0].y - tPoint[2].y)

    const { boxmin, boxmax } = this.getBoxRange(tPoint)

    const p: Point2 = { x: 0, y: 0 }
    for (p.x = boxmin[0]; p.x <= boxmax[0]; p.x++) {
      for (p.y = boxmin[1]; p.y <= boxmax[1]; p.y++) {
        const AP = new Vector(p.x - tPoint[0].x, p.y - tPoint[0].y)
        const BP = new Vector(p.x - tPoint[1].x, p.y - tPoint[1].y)
        const CP = new Vector(p.x - tPoint[2].x, p.y - tPoint[2].y)

        const ABp = AB.crossProduct2(AP)
        const BCp = BC.crossProduct2(BP)
        const CAp = CA.crossProduct2(CP)

        if (ABp >= 0 && BCp >= 0 && CAp >= 0) {
          this.drawPixel(p.x, p.y)
        }
      }
    }
  }

  drawTriangle = (tPoint: Point2[], color: string) => {
    this.color = color
    const { boxmin, boxmax } = this.getBoxRange(tPoint)
    const p: Point2 = { x: 0, y: 0 }

    for (p.x = boxmin[0]; p.x <= boxmax[0]; p.x++) {
      for (p.y = boxmin[1]; p.y <= boxmax[1]; p.y++) {
        const x = new Vector(tPoint[1].x - tPoint[0].x, tPoint[2].x - tPoint[0].x, tPoint[0].x - p.x)
        const y = new Vector(tPoint[1].y - tPoint[0].y, tPoint[2].y - tPoint[0].y, tPoint[0].y - p.y)
        let xy = x.crossProduct3(y)

        if (Math.abs(xy.components[2]) < 1) {
          xy = new Vector(-1, 1, 1)
        }
        xy = new Vector(
          1 - (xy.components[0] + xy.components[1]) / xy.components[2],
          xy.components[0] / xy.components[2],
          xy.components[1] / xy.components[2]
        )
        if (xy.components[0] >= 0 && xy.components[1] >= 0 && xy.components[2] >= 0) {
          this.drawPixel(p.x, p.y)
        }
      }
    }
  }

  getBoxRange = (p: Point2[]) => {
    const boxmin = [this.w, this.h]
    const boxmax = [0, 0]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        boxmin[0] = Math.min(boxmin[0], p[i].x)
        boxmin[1] = Math.min(boxmin[1], p[i].y)
        boxmax[0] = Math.max(boxmax[0], p[i].x)
        boxmax[1] = Math.max(boxmax[1], p[i].y)
      }
    }
    return { boxmin, boxmax }
  }
}

export { Render }
