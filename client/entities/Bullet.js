import Entity from './Entity'
import Display from '../components/Display'
import Position from '../components/Position'
import Transform from '../components/Transform'

class BulletDisplay extends Display {

  constructor() {
    super()
    this.radius = 5
  }

  render(ctx, { position }) {
    ctx.save()
    ctx.fillStyle = '#68C9E9'
    ctx.strokeStyle = '#8B8C8B'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(position.x, position.y, this.radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}


export default class Bullet extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()
    this.display = new BulletDisplay()
    this.position = new Position(pos.x, pos.y)
    this.transform = new Transform(velocity)
  }
}
