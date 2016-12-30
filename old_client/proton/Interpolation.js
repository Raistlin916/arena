import Vector from '../../server/lib/Vector'

export default class Interpolation {
  constructor(host) {
    this.host = host
  }

  set(targetBundle) {
    const now = Date.now()
    if (!this.lastInterpolateTime) {
      this.lastInterpolateTime = now
      this.valid = false
      return
    }
    this.valid = true
    const { host } = this
    this.intervalOfInterp = now - this.lastInterpolateTime
    this.lastInterpolateTime = now
    this.interpBaseCoord = host.coord.clone()
    this.interpCoord = new Vector(targetBundle.coord).sub(host.coord.clone())
    this.interpBaseAngle = host.angle
    this.interpAngle = targetBundle.angle - host.angle
  }

  update() {
    if (!this.valid) {
      return
    }
    const { host } = this
    const elapse = Date.now() - this.lastInterpolateTime
    const percent = Math.min(elapse / this.intervalOfInterp, 1)

    host.coord = this.interpBaseCoord.clone()
        .add(this.interpCoord.clone().scale(percent, percent))
    host.angle = this.interpBaseAngle + this.interpAngle * percent
    host.updateShortcut()
  }
}
