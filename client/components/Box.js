import Entity from '../proton/Entity'

export default class Box extends Entity {
  render(ctx) {
    ctx.save()
    super.render(ctx)

    ctx.translate(this.coord.x, this.coord.y)
    ctx.rotate(this.angle)
    ctx.fillStyle = '#FAE766'
    ctx.lineWidth = 2
    const x = -this.width / 2
    const y = -this.height / 2
    ctx.scale(this.scale, this.scale)
    ctx.fillRect(x, y, this.width, this.height)
    ctx.strokeStyle = '#8B8C8B'
    ctx.strokeRect(x, y, this.width, this.height)
    ctx.restore()
  }
}
