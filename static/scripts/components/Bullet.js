import Entity from '../proton/Entity'

export default class Bullet extends Entity {
  constructor(...args) {
    super(...args)
    this.radius = 2
    this.distance = 0
  }
  update(dt) {
    if (this.distance > 300) {
      this.isDead = true
    }
    this.previousCoord = this.coord.clone()
    super.update(dt)

    this.distance += this.coord.clone().sub(this.previousCoord).len()
  }
  render(ctx) {
    ctx.fillStyle = 'green'
    ctx.beginPath()
    ctx.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }
}
