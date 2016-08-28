import Entity from '../proton/Entity'

export default class Box extends Entity {
  render(ctx) {
    ctx.save()
    ctx.fillStyle = '#FAE766'
    const x = this.coord.x - this.width / 2
    const y = this.coord.y - this.height / 2
    ctx.fillRect(x, y, this.width, this.height)
    ctx.strokeStyle = '#8B8C8B'
    ctx.strokeRect(x, y, this.width, this.height)
    ctx.restore()
  }
}