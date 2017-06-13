import SAT from '../../server/lib/SAT'

export default class CollisionSystem {
  update(entity, dt, world) {
    const { collision, damage, position, size } = entity
    if (!collision) {
      return
    }

    if (!damage) {
      return
    }
    world.getEntities().forEach(item => {
      if (item === entity || !item.collision) {
        return
      }
      if (entity.damage.damagedObjects.indexOf(item) > -1) {
        return
      }

      if (SAT.testCircleCircle(
        new SAT.Circle(position, size.w / 2),
        new SAT.Circle(item.position, item.size.w / 2)
      )) {
        entity.damage.damagedObjects.push(item)
        entity.HP -= damage.value
        item.HP -= damage.value
      }
    })
  }
}
