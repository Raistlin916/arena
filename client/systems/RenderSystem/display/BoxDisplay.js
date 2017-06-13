import Display from './Display'

export default class BoxDisplay extends Display {
  constructor() {
    super()
    this.bgColor = '#FAE766'
    this.strokeColor = '#8B8C8B'
  }

  render(ctx, { position, size, life, display }, world) {
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

    if (life.deadAt) {
      const percent = Math.min(1, (world.elapsed - life.deadAt) * 5)
      display.opacity = 1 - percent
      display.scale = 1 + 1.5 * percent

      if (percent === 1) {
        life.destroyed = true
      }
    } else if (life.lastHurtAt) {
      const percent = Math.min(1, (world.elapsed - life.lastHurtAt) * 10)
      ctx.fillStyle = 'pink'
      ctx.globalAlpha = 1 - percent
      ctx.fillRect(x, y, size.w, size.h)

      if (percent === 1) {
        life.lastHurtAt = null
      }
    }

    ctx.restore()
  }
}
