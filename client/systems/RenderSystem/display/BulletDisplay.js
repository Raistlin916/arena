import Display from './Display'

export default class BulletDisplay extends Display {
  render(ctx, { position, size, display }) {
    ctx.save()
    ctx.globalAlpha = display.opacity
    ctx.translate(position.x, position.y)
    ctx.fillStyle = '#68C9E9'
    ctx.strokeStyle = '#8B8C8B'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 0, size.w, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}
