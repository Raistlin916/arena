import Display from './Display'

export default class BoxDisplay extends Display {
  constructor() {
    super()
    this.bgColor = '#FAE766'
    this.angle = 0
    this.scale = 1
    this.opacity = 1
  }

  render(ctx, { position, size }) {
    ctx.save()
    ctx.translate(position.x, position.y)
    ctx.globalAlpha = this.opacity
    ctx.rotate(this.angle)
    ctx.fillStyle = this.bgColor
    ctx.lineWidth = 2
    const x = -size.w / 2
    const y = -size.h / 2
    ctx.scale(this.scale, this.scale)
    ctx.fillRect(x, y, size.w, size.h)
    ctx.strokeStyle = '#8B8C8B'
    ctx.strokeRect(x, y, size.w, size.h)
    ctx.restore()
  }
}
