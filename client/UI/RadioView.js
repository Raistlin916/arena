export default class RadioView {
  constructor(coord, size, getWorldSize, getUserCoord) {
    this.coord = coord
    this.getWorldSize = getWorldSize
    this.getUserCoord = getUserCoord
    this.size = size
  }

  render(ctx) {
    const userCoord = this.getUserCoord()
    const worldSize = this.getWorldSize()
    ctx.save()
    ctx.translate(this.coord.x, this.coord.y)
    ctx.beginPath()
    ctx.fillStyle = 'rgba(0, 0, 0, .1)'
    ctx.fillRect(0, 0, this.size.w, this.size.h)
    ctx.fillStyle = 'red'
    ctx.fillRect(userCoord.x / worldSize.w * this.size.w,
      userCoord.y / worldSize.h * this.size.h, 1, 1)
    ctx.restore()
  }
}
