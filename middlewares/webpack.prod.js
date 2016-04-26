import convert from 'koa-convert';
import path from 'path';
import staticCache from 'koa-static-cache';

export const webpackProd = convert(staticCache(path.join(__dirname, '../static'), {
  maxAge: 3 * 24 * 60 * 60,
}));
