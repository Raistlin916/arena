import Entity from './Entity'
import Display from '../components/Display'
import Position from '../components/Position'
import Transform from '../components/Transform'

class BoxDisplay extends Display {

  constructor() {
    super()
    this.bgColor = '#FAE766'
    this.width = 10
    this.height = 10
    this.angle = 0
    this.scale = 1
    this.opacity = 1
  }

  render(ctx, { position }) {
    ctx.save()
    ctx.translate(position.x, position.y)
    ctx.globalAlpha = this.opacity
    ctx.rotate(this.angle)
    ctx.fillStyle = this.bgColor
    ctx.lineWidth = 2
    const x = -this.width / 2
    const y = -this.height / 2
    ctx.scale(this.scale, this.scale)
    ctx.fillRect(x, y, this.width, this.height)
    ctx.strokeStyle = '#8B8C8B'
    ctx.strokeRect(x, y, this.width, this.height)
    ctx.restore()
  }
}


export default class Box extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()
    this.display = new BoxDisplay()
    this.position = new Position(pos.x, pos.y)
    this.transform = new Transform(velocity)
  }
}
