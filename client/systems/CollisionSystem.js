import SAT from '../../server/lib/SAT'

export default class CollisionSystem {
  update(entity, dt, world) {
    const { collision, position, size } = entity
    if (!collision) {
      return
    }
    world.getEntities().forEach(item => {
      if (item === entity || !item.collision) {
        return
      }
      if (SAT.testCircleCircle(
        new SAT.Circle(position, size.w / 2),
        new SAT.Circle(item.position, item.size.w / 2)
      )) {
        world.removeEntity(item)
        world.removeEntity(entity)
      }
    })
  }
}
