import Retrieve from './quarks/Retrieve'
import Timer from './Timer'

export default class World {

  constructor(bundle) {
    this.objects = []

    this.retrieve = new Retrieve(this.objects)
    this.timer = new Timer()
  }

  add(obj) {
    if (this.objects.indexOf(obj) > -1) {
      return false;
    }
    this.objects.push(obj)

    return true
  }

  remove(obj) {
    const index = this.objects.indexOf(obj)
    if (index === -1) {
      return false
    }
    this.objects.splice(index, 1)
    return true
  }

  run() {
    this.timer.cancelFrame()
    const round = dt => {
      this.timer.requestFrame(round)

      this.objects.forEach(item => {
        if (item.isDead) {
          return this.remove(item)
        }
        return item.update(dt, this)
      })
    }
    this.timer.requestFrame(round)
  }

  pause() {
    this.timer.cancelFrame()
  }

  destroy() {

  }

  export() {
    return this.objects.map(item => (item.export ? item.export() : item))
  }

  query(...args) {
    return this.retrieve.query(...args)
  }
}
