import koaRouter from 'koa-router'
const router = koaRouter()


router.get('/', async ctx => {
  ctx.render('index')
})


export default router
