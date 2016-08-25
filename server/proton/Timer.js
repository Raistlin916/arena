export default class Timer {
  constructor() {
    this.lastTime = 0
    this.totalTime = 0
  }
  requestFrame(cb) {
    setTimeout(() => {
      const time = new Date().getTime()
      let dt = time - this.lastTime
      if (dt > 100) {
        dt = 16
      }
      this.lastTime = time
      dt /= 1000
      this.totalTime += dt
      cb(dt)
    }, 16)
  }
  cancelFrame() {
    clearTimeout(this.tid)
  }
}
