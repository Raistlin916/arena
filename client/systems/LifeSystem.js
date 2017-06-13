export default class LifeSystem {
  update(entity, dt, world) {
    if (entity.HP === undefined) {
      return
    }
    if (entity.HP <= 0) {
      world.removeEntity(entity)
    }
  }
}
