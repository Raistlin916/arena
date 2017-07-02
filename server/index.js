import Rules from './rules'

export default class Server {
  constructor(io) {
    this.io = io

    this.rules = new Rules()
    io.on('connection', this.onInit.bind(this))
    this.syncLoop()
  }

  onInit(socket) {
    socket.on('init', (data, cb) => {
      const human = this.rules.addHuman(data.userData.name || '匿名')

      human.entity.onReconciliation = (seq, bundle) => {
        socket.emit('reconciliation', { seq, bundle })
      }
      cb({
        gid: human.entity.gid,
        entities: this.rules.getEntities(),
        worldInfo: this.rules.getWorldInfo()
      })

      socket.on('input_pack', pack => human.entity.receivePack(pack))
      socket.on('disconnect', () => human.destroy())
    })
  }

  syncLoop() {
    setInterval(() =>
      this.io.sockets.emit('sync', {
        entities: this.rules.getEntities()
      })
      , 100)

    setInterval(() =>
      this.io.sockets.emit('business', {
        onlineNum: this.rules.countOnlineNumber()
      })
      , 1000)
  }
}

