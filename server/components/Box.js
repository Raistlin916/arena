import Entity from '../proton/Entity'
import SAT from '../lib/SAT'

export default class Box extends Entity {
  getCollisionSize() {
    return new SAT.Box(this.getLTCoord(), this.width, this.height).toPolygon().rotate(this.angle)
  }

  update(dt, world) {
    const a = this.getCollisionSize()
    world.query('Box').forEach(box => {
      if (box.gid === this.gid) {
        return false
      }

      const b = box.getCollisionSize()
      if (SAT.testPolygonPolygon(a, b)) {
        box.die()
        this.die()
        return true
      }
      return false
    })

    super.update(dt, world)
  }
}
