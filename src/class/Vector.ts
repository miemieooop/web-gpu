class Vector {
  components: number[]
  constructor(...components: number[]) {
    this.components = components
  }
  toString = () => this.components
  add = ({ components }: { components: number[] }) => {
    return new Vector(...this.components.map((component, index) => component + components[index]))
  }
  sub = ({ components }: { components: number[] }) => {
    return new Vector(...this.components.map((component, index) => component - components[index]))
  }
  dot = ({ components }: { components: number[] }) => {
    return this.components.reduce((acc, component, index) => acc + component * components[index], 0)
  }
  length = () => {
    const sum = this.components.reduce((acc, component) => acc + component ** 2, 0)
    return Math.sqrt(sum)
  }
  crossProduct = ({ components }: { components: number[] }) => {
    return new Vector(
      this.components[1] * components[2] - this.components[2] * components[1],
      this.components[2] * components[0] - this.components[0] * components[2],
      this.components[0] * components[1] - this.components[1] * components[0]
    )
  }
}

export { Vector }
