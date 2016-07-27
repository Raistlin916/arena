import Rules from '../core/rules'

let HumanID = 0

export default class Server {
  constructor(io) {
    this.io = io

    this.rules = new Rules()
    io.on('connection', this.onInit.bind(this))
  }

  onInit(socket) {
    const id = HumanID
    HumanID += 1
    const human = this.rules.addHuman(id)


    socket.emit('init', {
      enities: this.rules.getEnities()
    })

    socket.on('action', data => {
      human.hear(data)
      socket.emit('action', data)
    })

    socket.on('disconnect', () => {
      human.destroy()
    })
  }
}

