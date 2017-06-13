import Display from './Display'
import GunDisplay from './GunDisplay'
import ctxUtils from '../../../lib/ctxUtils'

export default class TankDisplay extends Display {
  constructor() {
    super()
    this.bgColor = '#FAE766'
    this.angle = 0
    this.scale = 1
    this.opacity = 1
    this.name = '匿名'

    this.gunDisplay = new GunDisplay()
  }

  render(ctx, { position, steering, gun, size }) {
    const radius = Math.min(size.w, size.h) / 2
    ctx.save()
    ctx.translate(position.x, position.y)
    ctx.rotate(steering.angle)

    ctx.save()
    ctx.translate(-size.w / 2, -size.h / 2)
    this.gunDisplay.render(ctx, gun)
    ctx.restore()

    ctx.beginPath()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = '#8B8C8B'
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = '#68C9E9'
    ctx.fill()
    ctx.stroke()


    ctx.restore()

    ctx.save()
    ctx.translate(position.x, position.y)
    ctx.fillStyle = '#8A95E3'
    ctx.textAlign = 'center'
    ctxUtils.setFontSize(ctx, 12)
    ctx.fillText(this.name, 0, -radius - 15)
    ctx.restore()
  }
}