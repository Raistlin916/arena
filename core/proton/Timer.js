export default class Timer {
  requestFrame(cb) {
    this.tid = setTimeout(cb, 16)
  }
  cancelFrame() {
    clearTimeout(this.tid)
  }
}
