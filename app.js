import Koa from 'koa'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import Jade from 'koa-jade'
import send from 'koa-send'
import path from 'path'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'

import router from './routes'
import webpack from 'webpack'
import webpackConfig from './webpack.config'

const app = new Koa()
const jade = new Jade({
  viewPath: './views'
})
jade.use(app)
const compiler = webpack(webpackConfig)

app.use(logger())
  .use(favicon())
  .use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
  .use(hotMiddleware(compiler))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx) => {
    return send(ctx, ctx.path, { root: path.join(__dirname, '/static') })
  })
  .listen(3000, () => console.log('server listening on port 3000'))
