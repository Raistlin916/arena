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
    this.direction = new Vector({ x: Math.sin(radians), y: -Math.cos(radians) })
    this.centerCoord = new Vector({
      x: this.coord.x + (this.width / 2),
      y: this.coord.y + (this.height / 2)
    })
  }

  merge(targetBundle) {
    this.coord = new Vector(targetBundle.coord)
    this.angle = targetBundle.angle
  }

  setInterpolate(targetBundle) {
    const now = Date.now()
    this.intervalOfInterp = now - this.lastInterpolateTime
    this.lastInterpolateTime = now
    this.interpBaseCoord = this.coord.clone()
    this.interpCoord = new Vector(targetBundle.coord).sub(this.coord.clone())
    this.interpBaseAngle = this.angle
    this.interpAngle = targetBundle.angle - this.angle
  }

  updateInterpolate() {
    if (!this.intervalOfInterp) {
      return
    }
    const elapse = Date.now() - this.lastInterpolateTime
    const percent = Math.min(elapse / this.intervalOfInterp, 1)

    if (this.interpBaseCoord && this.interpCoord) {
      this.coord = this.interpBaseCoord.clone()
        .add(this.interpCoord.clone().scale(percent, percent))
    }

    if (this.interpBaseAngle && this.interpAngle) {
      this.angle = this.interpBaseAngle + this.interpAngle * percent
    }

    this.updateShortcut()
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
