import Rules from '../core/rules'

export default class Server {
  constructor(io) {
    this.io = io

    this.rules = new Rules()
    io.on('connection', this.onInit.bind(this))
  }

  onInit(socket) {
    socket.emit('init', {
      enities: this.rules.getEnities()
    })

    socket.on('action', data => {
      this.rules.receiveAction(data)
      socket.emit('action', data)
    })
  }
}

