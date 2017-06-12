import Display from './Display'

export default class GunDisplay extends Display {
  constructor() {
    super()
    this.width = 10
    this.height = 10
  }

  render(ctx, { position }) {
    const { x, y } = position
    const { width, height } = this
    ctx.save()
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.strokeStyle = '#8B8C8B'
    ctx.fillStyle = '#B9B5B5'
    ctx.fillRect(x, y, width, height)
    ctx.strokeRect(x, y, width, height)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}
