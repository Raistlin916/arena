import Entity from '../proton/Entity'

export default class Gun extends Entity {

  render(ctx) {
    const { x, y } = this.coord
    const { width, height } = this
    ctx.save()
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.strokeStyle = '#8B8C8B'
    ctx.fillStyle = '#B9B5B5'
    ctx.fillRect(x, y, width, height)
    ctx.strokeRect(x, y, width, height)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}
