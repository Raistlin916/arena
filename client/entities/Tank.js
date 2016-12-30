import Entity from './Entity'
import Display from '../components/Display'
import Position from '../components/Position'
import Transform from '../components/Transform'
import Input from '../components/Input'
import ctxUtils from '../lib/ctxUtils'

class TankDisplay extends Display {

  constructor() {
    super()
    this.bgColor = '#FAE766'
    this.width = 30
    this.height = 30
    this.angle = 0
    this.scale = 1
    this.opacity = 1
    this.name = '匿名'

    this.r = Math.min(this.width, this.height) / 2
    // this.gun = new Gun({
    //   coord: { x: this.r, y: this.r - 10 },
    //   width: 30,
    //   height: 20
    // })
  }

  render(ctx, position) {
    ctx.save()
    ctx.translate(position.x, position.y)
    ctx.rotate(this.radiansOfAngle)

    ctx.save()
    ctx.translate(-this.r, -this.r)
    // this.gun.render(ctx)
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
    ctx.translate(position.x, position.y)
    ctx.fillStyle = '#8A95E3'
    ctx.textAlign = 'center'
    ctxUtils.setFontSize(ctx, 12)
    ctx.fillText(this.name, 0, -this.r - 15)
    ctx.restore()
  }
}

export default class Box extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()
    this.display = new TankDisplay()
    this.position = new Position(pos.x, pos.y)
    this.transform = new Transform(velocity)
    this.input = new Input()
  }
}
