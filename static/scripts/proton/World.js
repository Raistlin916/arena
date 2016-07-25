import '../utils/raf_polyfill'
import Retrieve from './quarks/Retrieve'

export default class World {

  constructor(canvas) {
    this.rid = null
    this.objects = []
    this.lastTime = 0
    this.totalTime = 0
    this.ctx = canvas.getContext('2d')
    this.info = {
      width: canvas.width,
      height: canvas.height
    }

    this.retrieve = new Retrieve(this.objects)
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
      this.rid = requestAnimationFrame(r)
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

      this.objects.forEach(item => {
        item.render(this.ctx, this.info)
      })
    }
    this.rid = requestAnimationFrame(r)
  }

  pause() {
    cancelAnimationFrame(this.rid)
  }

  query(...args) {
    return this.retrieve.query(...args)
  }
}
