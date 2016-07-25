import Entity from '../proton/Entity'
import SAT from '../lib/SAT'

export default class Bullet extends Entity {
  constructor(...args) {
    super(...args)
    this.radius = 2
    this.distance = 0
  }
  update(dt, world) {
    if (this.distance > 300) {
      this.die()
      return
    }
    this.previousCoord = this.coord.clone()
    super.update(dt)

    this.distance += this.coord.clone().sub(this.previousCoord).len()

    const circle = new SAT.Circle(this.coord.clone(), this.radius)
    world.query('Box').forEach(box => {
      const b = new SAT.Box(box.coord.clone(), box.width, box.height).toPolygon()
      if (SAT.testCirclePolygon(circle, b)) {
        box.die()
        this.die()
      }
    })
  }
  render(ctx) {
    ctx.fillStyle = 'green'
    ctx.beginPath()
    ctx.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }
}
