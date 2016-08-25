import Entity from '../proton/Entity'
import Bullet from './Bullet'

export default class Gun {
  constructor(bundle) {
    this.fireInterval = 0.1
    this.cooldown = true
    this.elapseAfterFired = 0
  }

  tryToFire(world, coord, direction) {
    if (!this.cooldown) {
      return
    }
    world.add(new Bullet({
      coord,
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
