import CoreEntity from '../../server/proton/Entity'
import Interpolation from './Interpolation'
import Tweens from './Tweens'

class FSM {
  constructor(model, fsmMap, initialState) {
    this.model = model
    this.read(model, fsmMap)
    this.status = initialState
  }

  read(model, fsmMap) {
    Object.keys(fsmMap).forEach(key => {
      this[key] = () => {
        if (fsmMap[key].from === this.status) {
          const onEnterStatusFuncName = `on${key.charAt(0).toUpperCase() + key.slice(1)}`
          if (model[onEnterStatusFuncName]) {
            model[onEnterStatusFuncName]()
          }
          this.status = fsmMap[key].to
        }
      }
    })
  }

  isAt(status) {
    return this.status === status
  }
}

export default class Entity extends CoreEntity {
  constructor(...args) {
    super(...args)

    this.scale = 1
    this.interpolation = new Interpolation(this)

    this.fsm = new FSM(this, {
      injured: { from: 'idle', to: 'idle' },
      die: { from: 'idle', to: 'dead' }
    }, 'idle')

    this.tweens = new Tweens()
  }

  update(dt) {
    this.tweens.update(dt)

    if (this.fsm.isAt('dead')) {
      super.update(dt)
      return
    }
    this.updateIntervals(dt)
    this.interpolation.update(dt)
  }

  die() {
    if (this.fsm.isAt('dead')) {
      return
    }
    this.fsm.die()
    this.addInterval(() => super.die(), 1000)
  }
}
