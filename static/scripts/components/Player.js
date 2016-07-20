import Entity from '../proton/Entity'
import Input from '../proton/Input'

export default class Player extends Entity {
  constructor(config) {
    super(config)

    this.color = config.color

    this.input = new Input()
    this.direction = 0

    const speed = 50
    this.input.on('turnWheel', e => {
      const increment = { x: 0, y: 0 }
      if (e.keyName === 'left') {
        increment.x = -speed
      }
      if (e.keyName === 'right') {
        increment.x = speed
      }
      if (e.keyName === 'top') {
        increment.y = -speed
      }
      if (e.keyName === 'bottom') {
        increment.y = speed
      }

      if (e.type === 'end') {
        increment.x *= -1
        increment.y *= -1
      }
      this.velocity.add(increment)
    })
  }

  render(ctx) {
    ctx.save()
    ctx.translate(this.coord.x + 2.5, this.coord.y + 2.5)
    ctx.rotate(this.drawingRotate)
    ctx.fillStyle = this.color
    ctx.fillRect(-2.5, -2.5, 5, 5)
    ctx.restore()
  }
}
