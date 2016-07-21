import Entity from '../proton/Entity'
import Input from '../proton/Input'
import Bullet from './Bullet'

export default class Player extends Entity {
  constructor(config) {
    super(Object.assign({
      width: 10,
      height: 10
    }, config))

    this.color = config.color
    this.world = config.world

    this.input = new Input()
    this.direction = 0

    this.speed = 100
    this.input.on('turnWheel', e => {
      this.handleTurnWheel(e)
      this.handleBullets(e)
    })
  }

  handleTurnWheel(e) {
    const { speed } = this
    const increment = { x: 0, y: 0 }
    if (e.keyName === 'left') {
      increment.x = -speed
    } else if (e.keyName === 'right') {
      increment.x = speed
    } else if (e.keyName === 'top') {
      increment.y = -speed
    } else if (e.keyName === 'bottom') {
      increment.y = speed
    }

    if (e.type === 'end') {
      increment.x *= -1
      increment.y *= -1
    }
    this.velocity.add(increment)
  }

  handleBullets(e) {
    if (e.keyName === 'space' && e.type === 'end') {
      this.world.add(new Bullet({
        coord: this.centerCoord,
        velocity: { x: 500, y: 0 }
      }))
    }
  }

  render(ctx) {
    ctx.save()
    // ctx.translate(this.centerCoord.x, this.centerCoord.y)
    // ctx.rotate(this.drawingRotate)
    ctx.fillStyle = this.color
    ctx.fillRect(this.coord.x, this.coord.y, this.width, this.height)
    ctx.restore()
  }
}
