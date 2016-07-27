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
      angle: 90,
      rotate: 0
    }, bundle)

    this.width = bundle.width
    this.height = bundle.height
    this.coord = new Vector(bundle.coord)
    this.speed = bundle.speed
    this.angle = bundle.angle
    this.speedOfRotate = bundle.speedOfRotate

    this.centerCoord = new Vector({
      x: bundle.coord.x + this.width / 2,
      y: bundle.coord.y + this.height / 2
    })
    this.radiansOfAngle = this.angle / 180 * Math.PI
  }

  update(dt) {
    this.angle += dt * this.speedOfRotate
    const radians = this.angle / 180 * Math.PI
    this.radiansOfAngle = radians
    this.direction = new Vector({ x: Math.sin(radians), y: -Math.cos(radians) })
    this.coord.add(this.direction.clone().scale(this.speed * dt, this.speed * dt))

    this.centerCoord = new Vector({
      x: this.coord.x + this.width / 2,
      y: this.coord.y + this.height / 2
    })
  }

  merge(targetBundle) {
    const targetCoord = new Vector(targetBundle.coord)
    if (targetCoord.clone().sub(this.coord).len() >= 5) {
      this.coord = targetCoord
    }
    this.speed = targetBundle.speed
    this.angle = targetBundle.angle
    this.speedOfRotate = targetBundle.speedOfRotate
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
