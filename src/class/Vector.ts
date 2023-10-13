class Vector {
  components: number[]
  constructor(...components: number[]) {
    this.components = components
  }
  toString = () => this.components
  add = ({ components }: { components: number[] }) => {
    return new Vector(...components.map((component, index) => this.components[index] + component))
  }
  sub = ({ components }: { components: number[] }) => {
    return new Vector(...components.map((component, index) => this.components[index] - component))
  }
  dot = ({ components }: { components: number[] }) => {
    return components.reduce((acc, component, index) => acc + component * this.components[index], 0)
  }
  length = () => {
    return Math.hypot(...this.components)
  }
  scaleBy = (factor: number) => {
    return new Vector(...this.components.map((component) => component * factor))
  }
  normalize = () => {
    const length = this.length()

    return this.scaleBy(1 / length)
  }

  crossProduct2 = ({ components }: { components: number[] }) => {
    return this.components[0] * components[1] - this.components[1] * components[0]
  }
  crossProduct3 = ({ components }: { components: number[] }) => {
    return new Vector(
      this.components[1] * components[2] - this.components[2] * components[1],
      this.components[2] * components[0] - this.components[0] * components[2],
      this.components[0] * components[1] - this.components[1] * components[0]
    )
  }
}

export { Vector }
