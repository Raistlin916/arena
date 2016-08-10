import Rules from './rules'

let HumanID = 0

export default class Server {
  constructor(io) {
    this.io = io

    this.rules = new Rules()
    io.on('connection', this.onInit.bind(this))
    this.syncLoop()
  }

  onInit(socket) {
    const hid = HumanID
    HumanID += 1
    const human = this.rules.addHuman(hid)

    socket.emit('init', {
      gid: human.entity.gid,
      entities: this.rules.getEntities()
    })

    socket.on('action', data => {
      human.hear(data)
    })

    socket.on('disconnect', () => {
      human.destroy()
    })
  }

  syncLoop() {
    setInterval(() =>
      this.io.sockets.emit('sync', {
        entities: this.rules.getEntities()
      })
    , 100)
  }
}

