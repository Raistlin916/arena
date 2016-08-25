import HeroCore from '../../server/components/HeroCore'
import Interpolation from '../proton/Interpolation'

export default class Hero extends HeroCore {
  constructor(...args) {
    super(...args)
    this.interpolation = new Interpolation(this)
  }

  render(ctx) {
    ctx.save()

    ctx.translate(this.centerCoord.x, this.centerCoord.y)
    ctx.rotate(this.radiansOfAngle)

    ctx.lineWidth = 1.8
    ctx.strokeStyle = '#8B8C8B'
    ctx.beginPath()
    ctx.moveTo(0, -5)
    ctx.lineTo(25, -5)
    ctx.lineTo(25, 5)
    ctx.lineTo(0, 5)
    ctx.lineTo(0, -5)
    ctx.fillStyle = '#B9B5B5'
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(0, 0, 15, 0, 2 * Math.PI)
    ctx.fillStyle = '#68C9E9'
    ctx.fill()
    ctx.stroke()

    ctx.restore()

    ctx.save()
    ctx.translate(this.centerCoord.x, this.coord.y)
    ctx.fillStyle = '#8A95E3'
    ctx.textAlign = 'center'
    ctx.fontSize = 12
    ctx.fillText(this.name, 0, -15)
    ctx.restore()
  }
}
