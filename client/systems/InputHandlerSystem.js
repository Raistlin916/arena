export default class InputHandlerSystem {
  update(entity, dt) {
    if (!entity.position || !entity.input || !entity.transform) {
      return
    }
    const { activeMap } = entity.input
    entity.transform.velocity.x = 0
    entity.transform.velocity.y = 0

    if (activeMap.left) {
      entity.transform.velocity.x = -100
    }
    if (activeMap.right) {
      entity.transform.velocity.x = 100
    }
    if (activeMap.top) {
      entity.transform.velocity.y = -100
    }
    if (activeMap.bottom) {
      entity.transform.velocity.y = 100
    }
  }
}
