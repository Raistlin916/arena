import convert from 'koa-convert';
import proxy from 'koa-proxy';

export default convert(proxy({
  host: 'http://0.0.0.0:8082/build',
  match: /^\/build/
}));
