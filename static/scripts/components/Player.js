import Entity from '../proton/Entity'
import Input from '../proton/Input'

export default class Player extends Entity {
  constructor(world, config) {
    super(world, config)

    this.color = config.color

    this.input = new Input()
    this.input.on('turnWheel', () => {
      this.coord.x += 10
      this.coord.y += 10
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
