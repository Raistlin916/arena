export default class RadioView {
  constructor(coord, getWorldSize, getUserCoord) {
    this.coord = coord
    this.getWorldSize = getWorldSize
    this.getUserCoord = getUserCoord
    this.size = {
      w: 100,
      h: 100
    }
  }

  render(ctx) {
    const userCoord = this.getUserCoord()
    const worldSize = this.getWorldSize()
    ctx.save()
    ctx.translate(this.coord.x, this.coord.y)
    ctx.beginPath()
    ctx.fillStyle = '#e5e5e5'
    ctx.fillRect(0, 0, this.size.w, this.size.h)
    ctx.fillStyle = 'red'
    ctx.fillRect(userCoord.x / worldSize.w * this.size.w,
      userCoord.y / worldSize.h * this.size.h, 1, 1)
    ctx.restore()
  }
}
