import Obj from './Obj'
import Vector from '../lib/Vector'

export default class Entity extends Obj {
  constructor(bundle = {}) {
    super(bundle)

    if (!bundle.coord) {
      throw new Error('Entity need coord')
    }

    bundle = Object.assign({
      velocity: { x: 0, y: 0 },
      acc: { x: 0, y: 0 },
      width: 1,
      height: 1
    }, bundle)

    this.coord = new Vector(bundle.coord)
    this.velocity = new Vector(bundle.velocity)
    this.acc = new Vector(bundle.acc)
    this.width = bundle.width
    this.height = bundle.height

    this.centerCoord = new Vector({
      x: bundle.coord.x + this.width / 2,
      y: bundle.coord.y + this.height / 2
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

  merge(targetBundle) {
    this.coord = new Vector(targetBundle.coord)
    this.velocity = new Vector(targetBundle.velocity)
    this.acc = new Vector(targetBundle.acc)
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
