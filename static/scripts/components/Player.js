import Entity from '../proton/Entity'
import Input from '../proton/Input'

export default class Player extends Entity {
  constructor(...arg) {
    super(...arg)

    this.input = new Input()
    this.input.on('turnWheel', () => {
      this.coord.x += 10
      this.coord.y += 10
    })
  }

  render(ctx) {
    ctx.save()
    ctx.fillStyle = 'red'
    ctx.fillRect(this.coord.x, this.coord.y, 5, 5)
    ctx.restore()
  }
}
