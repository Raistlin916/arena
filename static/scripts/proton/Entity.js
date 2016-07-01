import Obj from './Obj'
import Vector from '../lib/Vector'

export default class Entity extends Obj {
  constructor(world, config = {}) {
    super(world, config)

    if (!config.coord) {
      throw new Error('Entity need coord')
    }

    config = Object.assign({
      velocity: { x: 10, y: 0 },
      acc: { x: 10, y: 10 },
      drawingRotate: 0
    }, config)

    this.coord = new Vector(config.coord)
    this.velocity = new Vector(config.velocity)
    this.acc = new Vector(config.acc)
    this.rotate = new Vector(config.rotate)
    this.drawingRotate = new Vector(config.drawingRotate)
  }

  update(dt) {
    this.velocity.add(this.acc.clone().scale(dt, dt))
    this.coord.add(this.velocity.clone().scale(dt, dt))
  }

  render() {

  }
}
