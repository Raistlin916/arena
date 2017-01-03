import Display from './Display'
import Position from './Position'

class GunDisplay extends Display {

  constructor(w, h, pos) {
    super()
    this.width = w
    this.height = h
    this.position = pos
  }

  render(ctx) {
    const { x, y } = this.position
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

export default class Gun {
  constructor(w, h, pos, options) {
    this.display = new GunDisplay(w, h, pos)
    this.position = new Position(pos.x, pos.y)
    this.cooldown = 0.5
    this.lastFiredElapse = this.cooldown

    Object.assign(this, {
      bulletSpeed: 500
    }, options)
  }
}
