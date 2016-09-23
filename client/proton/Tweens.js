const EasingFunctions = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: t => t * t * t,
  easeOutCubic: t => (--t) * t * t + 1,
  easeInOutCubic: t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - (--t) * t * t * t,
  easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t),
  easeInQuint: t => t * t * t * t * t,
  easeOutQuint: t => 1 + (--t) * t * t * t * t,
  easeInOutQuint: t => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t)
}

export default class Tweens {
  add(name, duration, cb, easingFunctionsName = 'linear') {
    if (!this.map) {
      this.map = {}
    }
    let elapse = 0
    let percent = 0
    duration /= 1000
    this.map[name] = {
      update: dt => {
        if (percent >= 1) {
          delete this.map[name]
          return
        }
        elapse += dt
        percent = Math.min(elapse / duration, 1)
        const easingFunc = EasingFunctions[easingFunctionsName]
        if (!easingFunc) {
          throw new Error(`${easingFunctionsName} is a invalid easing`)
        }
        percent = easingFunc(percent)
        cb(percent)
      }
    }
  }

  update(dt) {
    if (!this.map) {
      return
    }
    Object.keys(this.map).forEach(key => {
      this.map[key].update(dt)
    })
  }
}
