export default class Interval {
  constructor() {
    this.currentTid = 0
    this.intervals = {}
  }

  add(fn, delay = 0) {
    const lastTid = this.currentTid
    this.intervals[lastTid] = { fn, timeout: this.currentTime + delay / 1000 }
    this.currentTid += 1
    return lastTid
  }

  clear(tid) {
    delete this.intervals[tid]
  }

  update(currentTime) {
    this.currentTime = currentTime
    Object.keys(this.intervals).forEach(key => {
      if (currentTime >= this.intervals[key].timeout) {
        this.intervals[key].fn()
        delete this.intervals[key]
      }
    })
  }
}
