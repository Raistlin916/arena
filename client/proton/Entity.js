import CoreEntity from '../../server/proton/Entity'
import Interpolation from './Interpolation'

export default class Entity extends CoreEntity {
  constructor(...args) {
    super(...args)
    this.interpolation = new Interpolation(this)
    this.dying = false
  }

  update(dt) {
    if (this.dying) {
      super.update(dt)
      return
    }
    this.updateIntervals(dt)
    this.interpolation.update(dt)
  }

  die() {
    if (this.dying) {
      return
    }
    this.dying = true
    this.addInterval(() => super.die(), 1000)
  }
}
