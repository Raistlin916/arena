import Entity from '../proton/Entity'
import SAT from '../lib/SAT'

export default class Box extends Entity {
  constructor(...args) {
    super(...args)

    this.inCollision = false
  }
  getCollisionSize() {
    return new SAT.Box(this.getLTCoord(), this.width, this.height).toPolygon().rotate(this.angle)
  }

  update(dt, world) {
    if (this.inCollision) {
      return super.update(dt, world)
    }
    const a = this.getCollisionSize()
    // 会检测两次
    world.query('Box').forEach(box => {
      if (box.gid === this.gid) {
        return false
      }

      const b = box.getCollisionSize()
      if (SAT.testPolygonPolygon(a, b)) {
        const direction = this.coord.clone().sub(box.coord)
        this.velocity = direction.project(this.velocity)
        this.inCollision = true
        this.addInterval('collision', 100, () => { this.inCollision = false })
        return true
      }
      return false
    })

    return super.update(dt, world)
  }
}
