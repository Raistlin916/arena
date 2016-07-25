import PlainWorld from '../../core/proton/World'

export default class World extends PlainWorld {

  constructor(config, canvas) {
    super(config)
    this.ctx = canvas.getContext('2d')
    this.info = {
      width: canvas.width,
      height: canvas.height
    }
  }

  onIterate(objs, dt) {
    super.onIterate(objs, dt)
    objs.forEach(item => item.render(this.ctx, this.info))
  }
}
