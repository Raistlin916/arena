let lastTime = 0
const vendors = ['ms', 'moz', 'webkit', 'o']
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`]
  window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`]
                             || window[`${vendors[x]}CancelRequestAnimationFrame`]
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = callback => {
    const currTime = new Date().getTime()
    const timeToCall = Math.max(0, 16 - (currTime - lastTime))
    const id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = id => clearTimeout(id)
}

export default class Timer {
  constructor() {
    this.lastTime = 0
    this.totalTime = 0
  }
  requestFrame(cb) {
    this.tid = requestAnimationFrame(time => {
      let dt = time - this.lastTime
      if (dt > 100) dt = 16
      this.lastTime = time
      dt /= 1000
      this.totalTime += dt
      cb(dt)
    })
  }
  cancelFrame() {
    cancelAnimationFrame(this.tid)
  }
}
