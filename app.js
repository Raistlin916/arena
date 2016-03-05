'use strict';

const Koa = require('koa');
const logger = require('koa-logger');
const favicon = require('koa-favicon');
const Jade = require('koa-jade');
const jade = new Jade({
  viewPath: './views'
});

const app = new Koa();
const router = require('./routes');
jade.use(app);

app.use(logger())
  .use(favicon())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => console.log('server listening on port 3000'));
