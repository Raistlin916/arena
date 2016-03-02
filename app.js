'use strict';

const Koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const favicon = require('koa-favicon');

const app = new Koa();

app.use(logger())
  .use(favicon())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);


router
  .get('/', async (ctx) => {
    ctx.body = 'Hello World2!';
  });