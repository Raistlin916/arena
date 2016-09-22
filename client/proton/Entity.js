import CoreEntity from '../../server/proton/Entity'
import Interpolation from './Interpolation'

class FSM {
  constructor(model, fsmMap, initialState) {
    this.model = model
    this.read(model, fsmMap)
    this.status = initialState
  }

  read(model, fsmMap) {
    Object.keys(fsmMap).forEach((key) => {
      this[key] = () => {
        model[`on${key.charAt(0).toUpperCase() + key.slice(1)}`]()
        this.status = fsmMap[key].to
      }
    })
  }

  isAt(status) {
    return this.status === status
  }
}

class Tweens {
  constructor() {
    this.map = {}
  }

  add(name, duration, cb) {
    let elapse = 0
    let percent = 0
    duration /= 1000
    this.map[name] = {
      update: (dt) => {
        if (percent >= 1) {
          return delete this.map[name]
        }
        elapse += dt
        percent = Math.min(elapse / duration, 1)
        return percent
      },
      render: ctx => cb(ctx, percent)
    }
  }

  update(dt) {
    Object.keys(this.map).forEach((key) => {
      this.map[key].update(dt)
    })
  }

  render(ctx) {
    Object.keys(this.map).forEach((key) => {
      this.map[key].render(ctx)
    })
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

  onInjured() {
    this.tweens.add('injured', 1000, (ctx, percent) => {
      // ctx.scale(percent, percent)
      console.log(percent)
    })
  }

  onDie() {
    this.tweens.add('injured', 100, (ctx, percent) => {
      this.scale = 1 + 1 * percent
    })
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

  render(ctx) {
    this.tweens.render(ctx)
  }

  die() {
    if (this.fsm.isAt('dead')) {
      return
    }
    this.fsm.die()
    this.addInterval(() => super.die(), 1000)
  }
}
