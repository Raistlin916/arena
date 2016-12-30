const keyMap = {
  32: 'space',
  37: 'left',
  38: 'top',
  39: 'right',
  40: 'bottom'
}

export default class Input {
  constructor() {
    this.bindEvent()
    this.activeMap = {}
  }

  bindEvent() {
    document.body.addEventListener('keydown', this.handleEvent('start'))
    document.body.addEventListener('keyup', this.handleEvent('end'))
  }

  handleEvent(type) {
    return e => {
      const keyName = keyMap[e.which]
      if (!keyName) {
        return
      }
      e.preventDefault()
      if (type === 'start') {
        if (this.activeMap[keyName]) {
          return
        }
        this.activeMap[keyName] = true
      }

      if (type === 'end') {
        if (!this.activeMap[keyName]) {
          return
        }
        delete this.activeMap[keyName]
      }
    }
  }
}
