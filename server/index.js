import Rules from './rules'
import HeartBeatServer from './proton/HeartBeatServer'

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

    const heartBeatServer = new HeartBeatServer(socket)
    heartBeatServer.bindPump(() => ({
      coord: human.entity.coord
    }))
  }

  syncLoop() {
    setInterval(() =>
      this.io.sockets.emit('sync', {
        entities: this.rules.getEntities()
      })
    , 100)
  }
}

