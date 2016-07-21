import Entity from '../proton/Entity'

export default class Bullet extends Entity {
  constructor(...args) {
    super(...args)
    this.radius = 2
  }
  render(ctx) {
    ctx.fillStyle = 'green'
    ctx.beginPath()
    ctx.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }
}
