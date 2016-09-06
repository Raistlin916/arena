import Entity from '../proton/Entity'
import Bullet from './Bullet'

export default class Gun extends Entity {
  constructor(bundle) {
    super(bundle)
    this.fireInterval = 500
    this.cooldown = true
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
    this.addInterval(() => { this.cooldown = true }, this.fireInterval)
  }
}
