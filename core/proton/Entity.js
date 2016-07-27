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
      width: 1,
      height: 1
    }, config)

    this.coord = new Vector(config.coord)
    this.velocity = new Vector(config.velocity)
    this.acc = new Vector(config.acc)
    this.width = config.width
    this.height = config.height

    this.centerCoord = new Vector({
      x: config.coord.x + this.width / 2,
      y: config.coord.y + this.height / 2
    })
  }

  update(dt) {
    this.velocity.add(this.acc.clone().scale(dt, dt))
    this.coord.add(this.velocity.clone().scale(dt, dt))

    this.centerCoord = new Vector({
      x: this.coord.x + this.width / 2,
      y: this.coord.y + this.height / 2
    })
  }

  export() {
    return Object.assign(super.export(), {
      coord: this.coord,
      velocity: this.velocity,
      acc: this.acc,
      width: this.width,
      height: this.height
    })
  }
}
