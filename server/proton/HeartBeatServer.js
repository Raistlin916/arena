export default class HeartBeatServer {
  constructor(socket) {
    this.socket = socket
    this.lastBid = 0
    this.start()
  }

  start() {
    this.socket.on('heartBeat', (data, cb) => {
      const bundle = this.onPump()
      const beat = {
        bundle,
        bid: this.lastBid ++
      }

      cb(beat)
    })
  }

  bindPump(onPump) {
    this.onPump = onPump
  }
}
