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

    this.updateShortcut()
  }

  update(dt) {
    this.velocity.add(this.acc.clone().scale(dt, dt))
    this.coord.add(this.velocity.clone().scale(dt, dt))
  }

  updateShortcut() {
    this.centerCoord = new Vector({
      x: this.coord.x + this.width / 2,
      y: this.coord.y + this.height / 2
    })
  }

  merge(targetBundle) {
    this.coord = new Vector(targetBundle.coord)
  }

  setInterpolate(targetBundle) {
    const now = Date.now()
    this.intervalOfInterp = now - this.lastInterpolateTime
    this.lastInterpolateTime = now
    this.interpBaseCoord = this.coord.clone()
    this.interpCoord = new Vector(targetBundle.coord).sub(this.coord.clone())
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

    this.updateShortcut()
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
