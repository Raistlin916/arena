import Entity from './Entity'
import Display from '../components/Display'
import Position from '../components/Position'
import Transform from '../components/Transform'
import Input from '../components/Input'
import Steering from '../components/Steering'
import Gun from '../components/Gun'

import ctxUtils from '../lib/ctxUtils'

class TankDisplay extends Display {

  constructor(width, height) {
    super()
    this.bgColor = '#FAE766'
    this.width = width
    this.height = height
    this.angle = 0
    this.scale = 1
    this.opacity = 1
    this.name = '匿名'

    this.r = Math.min(this.width, this.height) / 2
  }

  render(ctx, { position, steering, gun }) {
    ctx.save()
    ctx.translate(position.x, position.y)
    ctx.rotate(steering.angle)

    ctx.save()
    ctx.translate(-this.r, -this.r)
    gun.display.render(ctx)
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

    const gunWidth = 30
    const gunHeight = 20
    const width = 50
    const height = 50
    this.gun = new Gun(gunWidth, gunHeight, { x: width - 10, y: height / 2 - 10 })

    this.display = new TankDisplay(width, height)
    this.position = new Position(pos.x, pos.y)
    this.transform = new Transform(velocity)
    this.steering = new Steering(0, Math.PI, 100)
    this.input = new Input()
  }
}
