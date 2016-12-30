export default class PhysicsSystem {
  update(entity, dt) {
    if (!entity.position || !entity.transform) {
      return
    }
    entity.position.x += entity.transform.velocity.x * dt
    entity.position.y += entity.transform.velocity.y * dt
  }
}
