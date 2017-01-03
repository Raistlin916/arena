export default class PhysicsSystem {
  update(entity, dt) {
    const { position, transform, steering } = entity
    if (!position || !transform) {
      return
    }

    if (steering) {
      transform.velocity.x = Math.cos(steering.angle) * steering.maxSpeed
      transform.velocity.y = Math.sin(steering.angle) * steering.maxSpeed
    }

    position.x += transform.velocity.x * dt
    position.y += transform.velocity.y * dt
  }
}
