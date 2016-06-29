import EventEmitter from '../lib/EventEmitter'

export default class Input extends EventEmitter {
  constructor() {
    super()
    this.bindEvent()
    console.log(this)
  }

  bindEvent() {
    document.body.addEventListener('keydown', e => {
      if ([38, 39, 40, 37].indexOf(e.which) !== -1) {
        this.emit('turnWheel', {})
      }
    })
  }
}
