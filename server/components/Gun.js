import Entity from '../proton/Entity'
import Bullet from './Bullet'

export default class Gun extends Entity {
  constructor(bundle) {
    super(bundle)
    this.fireInterval = 0.1
    this.cooldown = true
    this.elapseAfterFired = 0
  }

  tryToFire(world, positionOfFire, direction) {
    if (!this.cooldown) {
      return
    }

    world.add(new Bullet({
      coord: positionOfFire.add(
          this.coord.clone()
            .add({ x: this.width, y: this.height / 2 })
            .rotate(Math.atan2(direction.y, direction.x))
          ),
      velocity: direction.scale(200, 200)
    }))
    this.cooldown = false
  }

  update(dt) {
    if (this.cooldown) {
      return
    }
    this.elapseAfterFired += dt
    if (this.elapseAfterFired >= this.fireInterval) {
      this.cooldown = true
      this.elapseAfterFired = 0
    }
  }
}
