import Obj from './Obj'
import Vector from '../lib/Vector'

export default class Entity extends Obj {
  constructor(config = {}) {
    super(config)

    if (!config.coord) {
      throw new Error('Entity need coord')
    }

    config = Object.assign({
      velocity: { x: 0, y: 0 },
      acc: { x: 0, y: 0 },
      drawingRotate: 0
    }, config)

    this.coord = new Vector(config.coord)
    this.velocity = new Vector(config.velocity)
    this.acc = new Vector(config.acc)
    this.drawingRotate = config.drawingRotate
  }

  update(dt) {
    this.velocity.add(this.acc.clone().scale(dt, dt))
    this.coord.add(this.velocity.clone().scale(dt, dt))
  }

  render() {

  }
}
