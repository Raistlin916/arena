import Bullet from '../entities/Bullet'
import vector from '../lib/vector'

export default class InputHandlerSystem {
  update(entity, dt, world) {
    const { position, input, steering } = entity
    if (!position || !input || !steering) {
      return
    }

    const { activeMap } = input

    steering.maxSpeed = 0

    if (activeMap.left) {
      steering.angle -= steering.rotationSpeed * dt
    }
    if (activeMap.right) {
      steering.angle += steering.rotationSpeed * dt
    }
    if (activeMap.top) {
      steering.maxSpeed = 100
    }
    if (activeMap.bottom) {
      steering.maxSpeed = -100
    }


    if (activeMap.space) {
      const { gun } = entity

      if (gun.lastFiredElapse > gun.cooldown) {
        const bulletVelocity = vector.setAngle(gun.bulletSpeed, steering.angle)
        const bulletPosition = vector.add(position, gun.position)
        const bullet = new Bullet(bulletPosition, bulletVelocity)
        world.addEntity(bullet)
        gun.lastFiredElapse = 0
      } else {
        gun.lastFiredElapse += dt
      }
    }
  }
}
