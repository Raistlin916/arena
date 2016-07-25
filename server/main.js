export default class Server {
  constructor(io) {
    this.io = io

    io.on('connection', socket => {
      socket.emit('init', {
        hello: 'world'
      })
    })
  }
}

