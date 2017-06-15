import Display from './Display'

export default class BoxDisplay extends Display {
  constructor() {
    super()
    this.bgColor = '#FAE766'
    this.strokeColor = '#8B8C8B'
  }

  render(ctx, { position, size, display }) {
    ctx.save()
    ctx.translate(position.x, position.y)
    ctx.globalAlpha = display.opacity
    ctx.rotate(display.angle)
    ctx.fillStyle = this.bgColor
    ctx.lineWidth = 2
    const x = -size.w / 2
    const y = -size.h / 2
    ctx.scale(display.scale, display.scale)
    ctx.fillRect(x, y, size.w, size.h)
    ctx.strokeStyle = this.strokeColor
    ctx.strokeRect(x, y, size.w, size.h)

    if (display.hurtProgress) {
      ctx.fillStyle = display.hurtColor
      ctx.globalAlpha = 1 - display.hurtProgress
      ctx.fillRect(x, y, size.w, size.h)
    }

    ctx.restore()
  }
}
