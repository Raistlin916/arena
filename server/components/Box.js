import Entity from '../proton/Entity'
import SAT from '../lib/SAT'

export default class Box extends Entity {
  constructor(...args) {
    super(...args)

    this.inCollision = false
  }
  getCollisionRange() {
    return new SAT.Box(this.getLTCoord(), this.width, this.height).toPolygon().rotate(this.angle)
  }

  update(dt, world) {
    if (this.inCollision) {
      return super.update(dt, world)
    }
    const a = this.getCollisionRange()

    world.query('Box').forEach(box => {
      if (box.gid === this.gid) {
        return false
      }

      const b = box.getCollisionRange()
      if (SAT.testPolygonPolygon(a, b)) {
        const direction = this.coord.clone().sub(box.coord)
        const s = this.velocity.len()
        this.velocity = direction.normalize().scale(s, s)
        this.inCollision = true
        this.addInterval('collision', 20, () => { this.inCollision = false })

        box.velocity = direction.clone().reverse()
        box.inCollision = true
        box.addInterval('collision', 20, () => { box.inCollision = false })
        return true
      }
      return false
    })

    return super.update(dt, world)
  }
}
