import Koa from 'koa'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import Jade from 'koa-jade'
import send from 'koa-send'
import path from 'path'

import router from './routes'
import * as middlewares from './middlewares'

const app = new Koa()
const jade = new Jade({
  viewPath: './views'
})
jade.use(app)

app.use(logger())
app.use(favicon())
if (process.env.NODE_ENV === 'dev') {
  app.use(middlewares.webpackDev);
} else {
  app.use(middlewares.webpackProd);
}

app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (ctx) =>
  send(ctx, ctx.path, { root: path.join(__dirname, '/static') })
)
.listen(3000, () => console.log('server listening on port 3000'))
