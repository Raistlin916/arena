export default class Gun {

  render(ctx) {
    ctx.save()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = '#8B8C8B'
    ctx.beginPath()
    ctx.moveTo(0, -5)
    ctx.lineTo(25, -5)
    ctx.lineTo(25, 5)
    ctx.lineTo(0, 5)
    ctx.lineTo(0, -5)
    ctx.fillStyle = '#B9B5B5'
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}
