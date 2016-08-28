import Obj from './Obj'
import Vector from '../lib/Vector'

export default class PolarEntity extends Obj {
  constructor(bundle = {}) {
    super(bundle)

    if (!bundle.coord) {
      throw new Error('PolarEntity need coord')
    }

    bundle = Object.assign({
      width: 1,
      height: 1,
      speed: 0,
      speedOfRotate: 0,
      angle: 0,
      rotate: 0
    }, bundle)

    this.width = bundle.width
    this.height = bundle.height
    this.coord = new Vector(bundle.coord)
    this.speed = bundle.speed
    this.angle = bundle.angle
    this.speedOfRotate = bundle.speedOfRotate

    this.updateShortcut()
  }

  update(dt) {
    this.angle += dt * this.speedOfRotate

    this.updateShortcut()
    this.coord.add(this.direction.clone().scale(this.speed * dt, this.speed * dt))
  }

  updateShortcut() {
    const radians = this.angle / 180 * Math.PI
    this.radiansOfAngle = radians
    this.direction = new Vector({ x: Math.cos(radians), y: Math.sin(radians) })
  }

  merge(targetBundle) {
    this.coord = new Vector(targetBundle.coord)
    this.angle = targetBundle.angle
  }


  export() {
    return Object.assign(super.export(), {
      width: this.width,
      height: this.height,
      coord: this.coord,
      speed: this.speed,
      angle: this.angle,
      speedOfRotate: this.speedOfRotate
    })
  }
}
