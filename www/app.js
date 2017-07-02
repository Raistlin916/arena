import Koa from 'koa'
import Socket from 'socket.io'
import http from 'http'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import Jade from 'koa-jade'
import send from 'koa-send'
import path from 'path'
import session from 'koa-generic-session'
import RedisStore from 'koa-redis'
import convert from 'koa-convert'
import cookie from 'cookie'
import co from 'co'

import router from './routes'
import * as middlewares from './middlewares'

import GameServer from '../server'

const app = new Koa()
const jade = new Jade({
  viewPath: path.join(__dirname, './views')
})
jade.use(app)

const sessionStore = new RedisStore()

app.keys = ['arena']
app.use(convert(session({
  store: sessionStore
})))
app.use(logger())
app.use(favicon())
if (process.env.NODE_ENV === 'dev') {
  app.use(middlewares.webpackDev);
} else {
  app.use(middlewares.webpackProd);
}

app.use(router.routes())
app.use(router.allowedMethods())
app.use(async ctx =>
  send(ctx, ctx.path, { root: path.join(__dirname, '/static') })
)

const io = new Socket()
const server = http.createServer(app.callback())

io.attach(server)

io.use((socket, next) => {
  co(function* coFunc() {
    if (socket.handshake.headers.cookie === undefined) {
      return next(null, true)
    }
    const sid = cookie.parse(socket.handshake.headers.cookie)['koa.sid']
    socket.session = yield sessionStore.get(`koa:sess:${sid}`)
    return next(null, true)
  })
})

const gameServer = new GameServer(io)

server.listen(3000, () => console.log('server listening on port 3000'))
