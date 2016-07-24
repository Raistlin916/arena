import Entity from '../proton/Entity'

export default class Box extends Entity {
  render(ctx) {
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.coord.x, this.coord.y, 10, 10)
  }
}
