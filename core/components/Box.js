import Entity from '../proton/Entity'

export default class Box extends Entity {
  render(ctx) {
    ctx.save()
    ctx.fillStyle = '#FAE766'
    ctx.fillRect(this.coord.x, this.coord.y, this.width, this.height)
    ctx.strokeStyle = '#8B8C8B'
    ctx.strokeRect(this.coord.x, this.coord.y, this.width, this.height)
    ctx.restore()
  }
}
