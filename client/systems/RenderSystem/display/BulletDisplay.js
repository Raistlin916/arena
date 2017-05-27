import Display from './Display'

export default class BulletDisplay extends Display {

  constructor() {
    super()
    this.radius = 5
  }

  render(ctx, { position }) {
    ctx.save()
    ctx.fillStyle = '#68C9E9'
    ctx.strokeStyle = '#8B8C8B'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(position.x, position.y, this.radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}
