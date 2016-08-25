import Entity from '../proton/Entity'

export default class Bullet extends Entity {
  constructor(...args) {
    super(...args)
    this.radius = 5
  }

  render(ctx) {
    ctx.save()
    ctx.fillStyle = '#68C9E9'
    ctx.strokeStyle = '#8B8C8B'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}
