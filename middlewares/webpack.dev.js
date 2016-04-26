import convert from 'koa-convert';
import proxy from 'koa-proxy';

export const webpackDev = convert(proxy({
  host: 'http://0.0.0.0:8081/build',
  match: /^\/build/,
}));
