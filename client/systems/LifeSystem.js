export default class LifeSystem {
  update(entity, dt, world) {
    if (!entity.life) {
      return
    }
    if (entity.life.HP <= 0 && !entity.life.deadAt) {
      entity.life.deadAt = world.elapsed
    }
    if (entity.life.destroyed) {
      world.removeEntity(entity)
    }
  }
}
