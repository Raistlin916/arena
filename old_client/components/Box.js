import Entity from '../proton/Entity'
import ctxUtils from '../lib/ctxUtils'

export default class Box extends Entity {
  constructor(...args) {
    super(...args)

    this.bgColor = '#FAE766'
    this.opacity = 1
  }

  render(ctx) {
    ctx.save()
    ctx.translate(this.coord.x, this.coord.y)
    ctx.globalAlpha = this.opacity
    ctx.rotate(this.angle)
    ctx.fillStyle = this.bgColor
    ctx.lineWidth = 2
    const x = -this.width / 2
    const y = -this.height / 2
    ctx.scale(this.scale, this.scale)
    ctx.fillRect(x, y, this.width, this.height)
    ctx.strokeStyle = '#8B8C8B'
    ctx.strokeRect(x, y, this.width, this.height)
    ctx.restore()
  }

  onHeard(events) {
    if (events === 'init') {
      this.tweens.add('init', 1000, percent => {
        this.opacity = percent
      }, 'easeInQuad')
    }
  }

  onDie() {
    const originColor = this.bgColor
    this.tweens.add('injured', 150, percent => {
      // this.scale = 1.25 - Math.abs(0.5 - percent) / 2
      this.bgColor = ctxUtils.colorTween(0.5 - Math.abs(0.5 - percent), originColor, '#ff0000')
    }, 'easeInQuad')
  }
}
