import Entity from '../proton/Entity'
import SAT from '../lib/SAT'

export default class Bullet extends Entity {
  constructor(...args) {
    super(...args)
    this.radius = 5
    this.distance = 0
  }
  update(dt, world) {
    if (this.distance > 300) {
      this.die()
      return
    }
    this.previousCoord = this.coord.clone()
    super.update(dt, world)

    this.distance += this.coord.clone().sub(this.previousCoord).len()

    const circle = new SAT.Circle(this.coord.clone(), this.radius)
    world.query('Box').forEach(box => {
      const b = box.getCollisionRange()
      if (SAT.testCircleCircle(circle, b)) {
        box.die()
        this.die()
      }
    })
  }
}
