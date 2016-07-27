import Obj from './Obj'
import Vector from '../lib/Vector'

export default class PolarEntity extends Obj {
  constructor(config = {}) {
    super(config)

    if (!config.coord) {
      throw new Error('PolarEntity need coord')
    }

    config = Object.assign({
      width: 1,
      height: 1,
      speed: 0,
      speedOfRotate: 0,
      angle: 90,
      rotate: 0
    }, config)

    this.width = config.width
    this.height = config.height
    this.coord = new Vector(config.coord)
    this.speed = config.speed
    this.angle = config.angle
    this.speedOfRotate = config.speedOfRotate

    this.centerCoord = new Vector({
      x: config.coord.x + this.width / 2,
      y: config.coord.y + this.height / 2
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
