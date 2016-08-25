import HeroCore from '../../server/components/HeroCore'
import Interpolation from '../proton/Interpolation'
import Gun from './Gun'

export default class Hero extends HeroCore {
  constructor(...args) {
    super(...args)
    this.interpolation = new Interpolation(this)
    this.r = Math.min(this.width, this.height) / 2
    this.gun = new Gun({
      coord: { x: this.r, y: this.r - 10 },
      width: 30,
      height: 20
    })
  }

  render(ctx) {
    ctx.save()
    ctx.translate(this.centerCoord.x, this.centerCoord.y)
    ctx.rotate(this.radiansOfAngle)


    ctx.save()
    ctx.translate(-this.r, -this.r)
    this.gun.render(ctx)
    ctx.restore()

    ctx.beginPath()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = '#8B8C8B'
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = '#68C9E9'
    ctx.fill()
    ctx.stroke()

    ctx.restore()

    ctx.save()
    ctx.translate(this.centerCoord.x, this.coord.y)
    ctx.fillStyle = '#8A95E3'
    ctx.textAlign = 'center'
    ctx.fontSize = 12
    ctx.fillText(this.name, 0, -this.r)
    ctx.restore()
  }
}
