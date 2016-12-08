import Entity from '../proton/Entity'
import ctxUtils from '../lib/ctxUtils'

export default class Box extends Entity {
  constructor(...args) {
    super(...args)

    this.bgColor = '#FAE766'
  }

  render(ctx) {
    ctx.save()
    this.renderNewBirth(ctx)
    ctx.translate(this.coord.x, this.coord.y)
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

  renderNewBirth(ctx) {
    if (this.lifeAtClient < 0.5) {
      ctx.globalAlpha = this.lifeAtClient * 2
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
