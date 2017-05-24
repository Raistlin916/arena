require('babel-polyfill');
require('babel-core/register')({
  presets: ['latest', 'stage-0']
});
require('./www/app');
