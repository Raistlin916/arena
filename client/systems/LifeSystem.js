export default class LifeSystem {
  update(entity, dt, world) {
    if (!entity.life) {
      return
    }
    const { life, display } = entity
    if (life.HP <= 0 && !life.deadAt) {
      life.deadAt = world.elapsed
    }
    if (life.destroyed) {
      world.removeEntity(entity)
    }

    if (life.deadAt) {
      const percent = Math.min(1, (world.elapsed - life.deadAt) * 1000 / 200)
      display.opacity = 1 - percent
      display.scale = 1 + 1.5 * percent

      if (percent === 1) {
        life.destroyed = true
      }
    } else if (life.lastHurtAt) {
      const percent = Math.min(1, (world.elapsed - life.lastHurtAt) * 1000 / 300)

      display.hurtColor = '#e74c3c'
      display.hurtProgress = percent

      if (percent === 1) {
        life.lastHurtAt = null
        display.hurtProgress = 0
      }
    }
  }
}
