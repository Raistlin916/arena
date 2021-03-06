let id = 0

export default class Obj {
  constructor(bundle = {}) {
    this.isDead = false
    this.className = this.constructor.name
    this.gid = bundle.gid ? bundle.gid : id++
  }

  update(dt) {
    this.updateIntervals(dt)
  }

  updateIntervals(dt) {
    if (this.intervals && this.intervals.length > 0) {
      this.intervals.forEach(item => {
        item.elapse += dt
        if (item.elapse >= item.interval) {
          this.intervals.splice(this.intervals.indexOf(item), 1)
          item.cb()
        }
      })
    }
  }

  addInterval(cb, interval) {
    if (!this.intervals) {
      this.intervals = []
    }
    this.intervals.push({
      cb, interval: interval / 1000, elapse: 0
    })
  }

  render() {

  }

  die() {
    this.isDead = true
  }

  trigger(name) {
    if (!this.events) {
      this.events = []
    }
    this.events.push(name)
  }

  export() {
    const bundle = {
      className: this.className,
      gid: this.gid
    }
    if (this.events) {
      bundle.events = this.events
      this.events = null
    }
    return bundle
  }
}
