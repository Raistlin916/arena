export default class PhysicsSystem {
  update(entity, dt) {
    const { position, velocity, steering, acc } = entity
    if (!position || !velocity) {
      return
    }

    if (steering) {
      velocity.x = Math.cos(steering.angle) * steering.maxSpeed
      velocity.y = Math.sin(steering.angle) * steering.maxSpeed
    }

    if (acc) {
      velocity.x += acc.x * dt
      velocity.y += acc.y * dt
    }

    position.x += velocity.x * dt
    position.y += velocity.y * dt
  }
}
