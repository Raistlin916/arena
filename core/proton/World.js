import Retrieve from './quarks/Retrieve'
import Timer from './quarks/Timer'

export default class World {

  constructor(config) {
    this.rid = null
    this.objects = []
    this.lastTime = 0
    this.totalTime = 0
    this.info = {
      width: config.width,
      height: config.height
    }

    this.retrieve = new Retrieve(this.objects)
    this.timer = new Timer()
  }

  add(obj) {
    if (this.objects.indexOf(obj) > -1) {
      return;
    }
    this.objects.push(obj)
  }

  remove(obj) {
    const index = this.objects.indexOf(obj)
    if (index === -1) {
      return
    }
    this.objects.splice(index, 1)
  }

  run() {
    const r = time => {
      this.timer.requestFrame(r)
      let dt = time - this.lastTime
      if (dt < 10) return
      if (dt > 100) dt = 16
      this.lastTime = time
      dt /= 1000
      this.totalTime += dt

      this.objects.forEach(item => {
        if (item.isDead) {
          return this.remove(item)
        }
        return item.update(dt, this)
      })
    }
    this.timer.requestFrame(r)
  }

  pause() {
    this.timer.cancelAnimationFrame()
  }

  query(...args) {
    return this.retrieve.query(...args)
  }
}
