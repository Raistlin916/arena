import SAT from '../../server/lib/SAT'
import vector from '../lib/vector'
import Acceleration from '../components/Acceleration'

const knock = (world, target, direction, force) => {
  if (target.collision.knocked) {
    return
  }
  const previousVelocity = Object.assign({}, target.velocity)
  const normDirection = vector.norm(direction)
  target.acc = new Acceleration(vector.scale(normDirection, force))
  target.collision.knocked = true
  world.addInterval(() => {
    target.acc = null
    target.collision.knocked = false
    target.velocity = previousVelocity
  }, 800)
}

export default class CollisionSystem {
  update(entity, dt, world) {
    const { collision, damage, position, size } = entity
    if (!collision) {
      return
    }

    const { rigid } = collision
    const SATCircle = new SAT.Circle(position, size.w / 2)
    if (rigid) {
      world.getEntities().forEach(item => {
        if (item === entity || !item.collision || !item.collision.rigid) {
          return
        }
        if (SAT.testCircleCircle(
          SATCircle,
          new SAT.Circle(item.position, item.size.w / 2)
        )) {
          const direction = vector.sub(position, item.position)
          knock(world, entity, direction, 50)
          knock(world, item, vector.reverse(direction), 50)
        }
      })
    }

    if (damage) {
      world.getEntities().forEach(item => {
        if (item === entity || !item.collision) {
          return
        }

        // damage
        if (entity.damage.damagedObjects.indexOf(item) > -1 || !item.life) {
          return
        }
        if (SAT.testCircleCircle(
          SATCircle,
          new SAT.Circle(item.position, item.size.w / 2)
        )) {
          entity.damage.damagedObjects.push(item)
          entity.life.HP -= damage.value

          item.life.lastHurtAt = world.elapsed
          item.life.HP -= damage.value
        }
      })
    }
  }
}
