import HeroCore from '../../server/components/HeroCore'
import Interpolation from '../proton/Interpolation'
import Gun from './Gun'

export default class Hero extends HeroCore {
  constructor(...args) {
    super(...args)
    this.interpolation = new Interpolation(this)
    this.gun = new Gun()
  }

  render(ctx) {
    ctx.save()

    ctx.translate(this.centerCoord.x, this.centerCoord.y)
    ctx.rotate(this.radiansOfAngle)

    this.gun.render(ctx)

    ctx.beginPath()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = '#8B8C8B'
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
