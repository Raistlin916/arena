// Reconciliation --> http://www.gabrielgambetta.com/fpm2.html

const MAX_PENDING_BEAT = 5


export default class HeartBeatClient {
  constructor(socket) {
    this.clientBeats = []

    this.socket = socket

    this.lastBid = 0
    this.isLagPending = false

    this.start()
  }

  start() {
    this.tid = setInterval(() => {
      this.update()
    }, 1000)
  }

  destroy() {
    clearInterval(this.tid)
    this.socket = null
  }

  bindJudge(onJudge) {
    this.onJudge = onJudge
    return this
  }

  bindPump(onPump) {
    this.onPump = onPump
    return this
  }

  bindLagPending(onLagPending, onLagReconnection) {
    this.onLagPending = onLagPending
    this.onLagReconnection = onLagReconnection
    return this
  }

  pumpFromEnity() {
    const bundle = this.onPump()
    const data = {
      bid: this.lastBid ++,
      bundle
    }
    this.clientBeats.push(data)
  }

  flush() {
    this.clientBeats = []
  }

  update() {
    if (this.isLagPending) {
      return
    }
    this.pumpFromEnity()
    if (this.clientBeats.length > MAX_PENDING_BEAT) {
      this.onLagPending()
      this.isLagPending = true
    }

    this.socket.emit('heartBeat', {
      bid: this.clientBeats[this.clientBeats.length - 1].bid
    }, serverBeat => this.onReconciliation(serverBeat))
  }

  onReconciliation(serverBeat) {
    console.log(serverBeat.bid, this.clientBeats.map(item => item.bid))
    let clientBeatIndex = -1
    this.clientBeats.some((item, index) => {
      if (serverBeat.bid === item.bid) {
        clientBeatIndex = index
        return true
      }
      return false
    })
    const clientBeat = this.clientBeats[clientBeatIndex]
    if (!clientBeat) {
      this.flush()
      this.lastBid = serverBeat.bid + 1
      throw new Error('unknown serverBeat')
    }

    this.clientBeats.splice(0, clientBeatIndex + 1)

    if (!this.onJudge(serverBeat, clientBeat)) {
      this.flush()
    }

    if (this.isLagPending) {
      this.isLagPending = false
      this.onLagReconnection()
    }
  }
}
